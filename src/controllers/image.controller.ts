import { Image, Prisma, PrismaClient, User } from "@prisma/client";
import { ImageDeep } from "../types";

const prisma = new PrismaClient()

/**
 * Function addNewImage adds a new image to the database
 * @param title - The title of the image
 * @param source - The source of the image
 * @param userId - The id of the user who added the image
 * @param description - The image description
 * @returns The newly added image
 */
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

/**
 * Function getImageById returns an image by its id
 * @param imageId - The id of the image to be retrieved
 * @returns The image specified by the imageId
 */
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


/**
 * Function getImageDeepById returns a deep image by its id
 * @param imageId - The id of the image to be retrieved
 * @returns The image specified by the imageId
 */
export async function getImageDeepById(imageId: number) {
    try {
        const image:ImageDeep|null = await prisma.image.findUnique({
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

/**
 * Function getImagesByWithPagination returns images with pagination
 * @param page - The page of the images to be retrieved
 * @returns The page of images
 */
export async function getImagesWithPagination(page:number){
    const pageSize = 20
    const skip = (page - 1) * pageSize;
    console.log("In images with pagination! skip: " + skip)
    try {
        const images:ImageDeep[] = await prisma.image.findMany({
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