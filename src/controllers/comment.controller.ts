import { PrismaClient, Comment } from "@prisma/client";
import { CommentDeep } from "../types";

const prisma = new PrismaClient();


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
