import { PrismaClient, Comment } from "@prisma/client";
import { CommentDeep } from "../types";

const prisma = new PrismaClient();

/**
 * Function addComment adds a comment to the database
 * @param content - The content of the comment
 * @param userId - The id of the user who added the comment
 * @param imageId - The id of the image the comment belongs to
 * @returns The added comment
 */
export async function addComment(content: string, userId: number, imageId: number){
    try{
        const newComment:Comment = await prisma.comment.create({
            data: {
                "content": content,
                "userId": userId,
                "imageId": imageId
            }
        });
        return newComment;
    }
    catch(error){
        console.error("Error creating comment:" , error);
        throw new Error("Could not create comment!");
    }
}

/**
 * Function getCommentsByImageId 
 * returns all comments of an image from the database
 * @param imageId - The id of the image the comments belongs to
 * @returns All comments belonging to the image specified by imageId
 */
export async function getCommentsByImageId(imageId: number){
    try{
        const comments:CommentDeep[] = await prisma.comment.findMany({
            where: {
                "imageId": imageId
            },
            include:{
                user: true,
                image: true
            }
        });
        return comments;
    }
    catch(error){
        console.error("Error fetching comments:" , error);
        throw new Error("Could not fetch comments!");
    }
}

/**
 * Function getAllComments returns all comments in the database
 * @returns All comments in the database
 */
export async function getAllComments(){
    try{
        const comments:CommentDeep[] = await prisma.comment.findMany({
            include:{
                user: true,
                image: true
            }
        });
        return comments;
    }
    catch(error){
        console.error("Error fetching comments:" , error);
        throw new Error("Could not fetch comments!");
    }
}