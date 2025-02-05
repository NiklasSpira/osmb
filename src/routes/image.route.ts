import express, { Router } from 'express';
import { Request, Response } from "express";
import { Image, User } from '@prisma/client';
import { addNewImage, getImageById, getImageByIdWithUser, getImagesWithPagination } from '../controllers/image.controller';
import { ImageWithUser, ImageData, LikeData } from '../types';
import { toggleLike } from '../controllers/imageLike.controller';
import { deletePicture, uploadPicture } from '../service/file_upload.service';

const imageRouter:Router = express.Router();

imageRouter.get("/:id", async (req:Request, res:Response) => {
    try{
        const imageId:number = parseInt(req.params.id, 10);
        if(Number.isNaN(imageId)){
            res.status(400).json({
                status: "Failure",
                error: "Invalid picture ID" 
            });
            return;
        }
        const image:ImageWithUser|null = await getImageByIdWithUser(imageId);
        if(!image){
            res.status(404).json({
                status: "Failure",
                error: "Image could not be found!"
            });
            return;
        }
        res.send({
            image: {
                likeCount: image.likeCount,
                created: image.created,
                src: image.source,
                user:{
                    username: image.user.username
                }
            }

        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error retrieving image"
        });
    }
});

imageRouter.get("/images/:page", async (req:Request, res:Response) => {
    const page:number = parseInt(req.params.page, 10);
    console.log("In imageRouter, page is: " + page)
        if(Number.isNaN(page)){
            res.status(400).json({
                status: "Failure",
                error: "Invalid page number"
            });
            return;
        }
    try{
        const images = await getImagesWithPagination(page);
        const imagesReturn:ImageData[] = [];
        images.forEach(image => {
            imagesReturn.push({
                    id: image.id,
                    likeCount: image.likeCount,
                    created: image.created.toISOString(),
                    src: image.source,
                    title: image.title,
                    description: image.description,
                    user: {
                        id: image.userId,
                        username: image.user.username,
                        profilePictureSrc: image.user.profilePictureSrc
                    }
                }
            )
        });
        res.send(imagesReturn)

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error retrieving images"
        });
    }
});

imageRouter.post("/:imageId/like", async (req:Request, res:Response) => {
    const imageId:number = parseInt(req.params.imageId);
    if(Number.isNaN(imageId)){
        res.status(400).json({
            status: "Failure",
            error: "Invalid imageId"
        });
        return;
    }
    try{
        if(req.session.userId){
            const likeData:LikeData|undefined = await toggleLike(req.session.userId, imageId);
            if(likeData){
                res.send(likeData);
                return;
            }
            else {
                res.status(500).json({
                    error: "Something went wrong while liking the image!"
                });
                return;
            }
        }
        else{
            res.status(401).json({
                error: "Unauthorized!"
            })
            return;
        }

    }
    catch(error){
        res.status(500).json({
            error: "Something went wrong while liking the image!"
        })
    }
});

imageRouter.post("/upload", uploadPicture.single('picture'), async (req:Request, res: Response) => {
    try{
        if(!req.file){
            res.status(400).json({ error: 'Kein Bild hochgeladen!' });
            return;
        }
        const { title, description }: {title: string, description: string} = req.body;

        if(!title || !description){
            res.status(400).json({ error: 'Titel und Benutzer-ID erforderlich!' });
            deletePicture(req.file.filename);
            return;
        }

        const userId:number|undefined = req.session.userId
        if(!userId){
            res.status(401).json({error: "Unauthorized!"});
            deletePicture(req.file.filename);
            return;
        }
        const source:string = `/pictures/${req.file.filename}`;
        const image:Image = await addNewImage(title, source, userId, description);
        const imageData: ImageData = {
            id: image.id,
            likeCount: image.likeCount,
            created: image.created.toISOString(),
            src: image.source,
            title: image.title,
            description: image.description
        }
        res.send(imageData);
        return;
    }
    catch(error){
        res.status(500).json({
            error: "Something went wrong while uploading image!"
        });
        if(req.file){
            deletePicture(req.file.filename);
        }
    }
});

export default imageRouter;