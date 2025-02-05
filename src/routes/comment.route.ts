import express, { Router, Response, Request } from "express";
import { CommentData, CommentDeep } from "../types";
import { addComment, getAllComments, getCommentsByImageId } from "../controllers/comment.controller";
import { Comment } from "@prisma/client"

const commentRouter:Router = express.Router();
type CommentQuery = {
    imageId?: string
}

/**
 * Get route /comment
 * Retrieves all comments of an image (/comment?imageId=[imageId])
 * or every comment (/comment)
 */
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
            res.send(commentDataList);
            return;
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
            res.send(commentDataList);
            return;
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: "Error retrieving comments"
        });
    }
});

/**
 * Post route /comment 
 * Posts a comment related to an user and an image
 */
commentRouter.post('/', async (req:Request, res:Response) => {
    try{
        const content:string = req.body.content;
        const userId:number|undefined = req.session.userId;
        const { imageId }:CommentQuery = req.query
        if(!imageId){
            res.status(400).json({error: "ImageId missing in queryparameters!"});
            return;
        }
        const parsedImageId = parseInt(imageId);
        if(isNaN(parsedImageId)){
            res.status(401).json({error: "Invalid imageId!"});
        }

        if(userId){
            const comment:Comment = await addComment(content, userId, parsedImageId);
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
});

export default commentRouter;