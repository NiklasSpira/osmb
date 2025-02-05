import { Image, Prisma, PrismaClient, User } from "@prisma/client";
import { ImageWithUser } from "../types";

const prisma = new PrismaClient()

export async function addNewImage(title:string, source:string, userId:number, description:string){
    try{
        const image:Image = await prisma.image.create({
            data:{
                "title": title,
                "source":source,
                "userId": userId,
                "description": description
            }
        });
        return image;
    }
    catch (error) {
        console.error("Error creating image:", error);
        throw new Error("Could not create image");
    }
}


export async function getImageById(imageId: number) {
    try {
        const image:Image|null = await prisma.image.findUnique({
            where: {
                id: imageId,
            }
        });

        return image;
    } catch (error) {
        console.error("Error fetching image by ID:", error);
        throw new Error("Could not fetch image");
    }
}

export async function getImageByIdWithUser(imageId: number) {
    try {
        const image:ImageWithUser|null = await prisma.image.findUnique({
            where: {
                id: imageId,
            },
            include:{
                user:true
            }
        });

        return image;
    } catch (error) {
        console.error("Error fetching image by ID:" , error);
        throw new Error("Could not fetch image!");
    }
}

export async function getImagesWithPagination(page:number){
    const pageSize = 20
    const skip = (page - 1) * pageSize;
    console.log("In images with pagination! skip: " + skip)
    try {
        const images:ImageWithUser[] = await prisma.image.findMany({
            skip,
            take: pageSize,
            orderBy: {
                likeCount: 'desc'
            },
            include: {
                user: true
            }
        })
        console.log("After db! skip: " + skip)
        console.log(images)
        return images;
    }
    catch(error){
        console.error("Error fetching images with pagination:" , error);
        throw new Error("Could not fetch images with pagination!");
    }
}