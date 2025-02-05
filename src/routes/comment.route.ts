import express, { Router, Response, Request } from "express";
import { CommentData, CommentDeep } from "../types";
import { addComment, getAllComments, getCommentsByImageId } from "../controllers/comment.controller";
import { Comment } from "@prisma/client"

const commentRouter:Router = express.Router();
type CommentQuery = {
    imageId?: string
}
commentRouter.get('/', async (req:Request, res:Response) => {
    try{
        const { imageId }:CommentQuery = req.query
        if(imageId){
            const parsedImageId = parseInt(imageId);
            if(isNaN(parsedImageId)){
                res.status(400).json({
                    status: "Failure",
                    error: "Invalid picture ID" 
                });
                return;
            }
            const comments:CommentDeep[] = await getCommentsByImageId(parsedImageId);
            const commentDataList: CommentData[] = []
            comments.forEach((comment:CommentDeep) => {
                commentDataList.push(
                    {
                        id: comment.id,
                        content: comment.content,
                        likeCount: comment.likeCount,
                        user: comment.user ? {
                            id: comment.userId,
                            username: comment.user.username,
                            profilePictureSrc: comment.user.profilePictureSrc
                        } : undefined
                    }
                )
            });
        }
        else{
            const comments:CommentDeep[] = await getAllComments();
            const commentDataList: CommentData[] = []
            comments.forEach((comment:CommentDeep) => {
                commentDataList.push(
                    {
                        id: comment.id,
                        content: comment.content,
                        likeCount: comment.likeCount,
                        user: comment.user ? {
                            id: comment.userId,
                            username: comment.user.username,
                            profilePictureSrc: comment.user.profilePictureSrc
                        } : undefined
                    }
                )
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error retrieving comments"
        });
    }
});

commentRouter.post('/', async (req:Request, res:Response) => {
    try{
        const content:string = req.body.content;
        const userId:number|undefined = req.session.userId;
        const imageId:number = req.body.imageId;
        if(userId){
            const comment:Comment = await addComment(content, userId, imageId);
            const commentData:CommentData = {
                id: comment.id,
                content: comment.content,
                likeCount: comment.likeCount
            }
            res.send(commentData);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error adding comment!"
        });
    }
})