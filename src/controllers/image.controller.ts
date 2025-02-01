import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function addNewImage(source:string, userId:number, ){
    const image = await prisma.image.create({
        data:{
            "source":source,
            "userId": userId
        }
    })
}