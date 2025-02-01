import { User } from '@prisma/client';
import express from 'express';
import { Request, Response } from 'express';
import { getUserById } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.get('/api/user/auth', async (req: Request, res: Response) => {
    if(req.session.userId){
        const user : User|null = await getUserById(req.session.userId)
        if(user){
            res.send({
                session_exists: true,
                username: user?.username
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

export default userRouter;