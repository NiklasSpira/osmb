import { User, Image, ImageLike } from '@prisma/client';
import express from 'express';
import { Request, Response } from 'express';
import { addNewUser, getUserById, getUserByIdDeep, getUserByUsername, updateProfilePicture, userExists } from '../controllers/user.controller';
import { hashPassword, verifyPassword } from '../service/password.service';
import { ImageData, ImageLikeDeep, UserData, UserDeep } from '../types';
import { uploadProfilePicture } from '../service/file_upload.service';
const userRouter = express.Router();

userRouter.get('/auth', async (req: Request, res: Response) => {
    if(req.session.userId){
        const user : User|null|undefined = await getUserById(req.session.userId)
        if(user){
            res.send({
                session_exists: true,
                username: user.username
            })
        }
        else{
            res.send({
                session_exists: false
            })
        }
    }
    else{
        res.send({
            session_exists: false
        })
    }
});


userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const user : User|null|undefined = await getUserByUsername(req.body.username);
        
        if (!user) {
            res.status(404).json({
                status: "Failure",
                error: "User could not be found!"
            });
            return;
        }

        const isPasswordValid = await verifyPassword(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                status: "Failure",
                error: "Passwords do not match!"
            });
            return;
        }

        // ✅ Set session BEFORE sending response
        req.session.userId = user.id;

        res.json({
            status: "Success",
            username: user.username
        });
        return;

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            status: "Failure",
            error: "Internal Server Error"
        });
    }
});

userRouter.post("/register", async(req:Request, res:Response) => {
    try{
        const username:string = req.body.username;
        const usernameExists = await userExists(username);
        if(usernameExists){
            res.status(401).json({
                status: "Failure",
                error: "Username already exists!",
            });
            return;
        }
        const password_plain:string = req.body.password
        const password_hashed:string = await hashPassword(password_plain)
        const user: User = await addNewUser(username, password_hashed)
        if(!user){
            res.status(500).json({error: "Error adding new user!"});
            return;
        }
        req.session.userId = user.id
        res.json({
            status: "Success",
            username: user.username 
        })
        return;
    }
    catch(error){
        console.error("Register error:", error);
        res.status(500).json({
            status: "Failure",
            error: "Internal Server Error"
        });
    }
});

userRouter.get("/:userId", async(req:Request, res:Response) => {
    const userId:number = parseInt(req.params.userId);
    if(Number.isNaN(userId)){
        res.status(401).json({
            status: "Failure",
            error: "Invalid userId",
        });
        return;
    }
    const user:UserDeep|null = await getUserByIdDeep(userId);
    if(!user){
        res.status(500).json({
            status: "Failure",
            error: "Error retrieving User!",
        });
        return;
    }
    const userData:UserData = {
        id: user.id,
        username: user.username,
        profilePictureSrc: user.profilePictureSrc
    }
    if(user.imagesPosted){
        const imageDataList:ImageData[] = [];
        user.imagesPosted.forEach((image: Image) => {
            imageDataList.push({
                id: image.id,
                likeCount: image.likeCount,
                created: image.created.toISOString(),
                src: image.source,
                title: image.title,
                description: image.description
            })
        });
        userData.imagesPosted = imageDataList;
    }
    if(user.imagesLiked){
        const imageDataList:ImageData[] = [];
        user.imagesLiked.forEach((imageLike:ImageLikeDeep) => {
            if(imageLike.image){
                imageDataList.push({
                    id: imageLike.image.id,
                    likeCount: imageLike.image.likeCount,
                    created: imageLike.image.created.toISOString(),
                    src: imageLike.image.source,
                    title: imageLike.image.title,
                    description: imageLike.image.description
                });
            }
            else{
                res.status(400).json({
                    status:"Failure",
                    error:"Error retrieving liked images!"
                })
            }
        });
        userData.imagesLiked = imageDataList;
    }
    res.send(userData);
    return;
    
    

});

userRouter.post('/upload/profile_picture', uploadProfilePicture.single('profile_picture'), async (req:Request, res:Response) => {
    try{
        if(!req.file){
            res.status(400).json({ error: 'Kein Bild hochgeladen!' });
            return;
        }
        const userId = req.session.userId;
        if(!userId){
            res.status(401).json({error: 'Unauthorized!'});
            return;
        }
        const source = `/profile_pictures/${req.file.filename}`;
        const user:User|undefined = await updateProfilePicture(userId, source);
        if(!user){
            res.status(500).json({error: "Fehler beim hochladen des Profilbildes!"});
            return;
        }
        const userData:UserData = {
            id: user.id,
            username: user.username,
            profilePictureSrc: user.profilePictureSrc
        }
        res.send(userData);  
    }
    catch(error){
        res.status(500).json({error: "Fehler beim hochladen des Profilbildes!"});
    }

})
export default userRouter;