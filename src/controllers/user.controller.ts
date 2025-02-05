import { PrismaClient, User } from "@prisma/client";
import { UserDeep } from "../types";

const prisma = new PrismaClient()

export async function addNewUser(username:string, password:string){
    try{
        const user = await prisma.user.create({
            data:{
                "username": username,
                "password": password
            }
        });
        return user;
    }
    catch(error){
        console.error("Error adding new User: ", error);
        throw new Error("Error adding new User!");
    }
}

export async function getUserByUsername(username: string){
    try{
        const user:User|null = await prisma.user.findFirst({
            where:{
                "username": username
            }
        });
        return user;
    }
    catch(error){
        console.error("Error retrieving User by username: ", error);
        throw new Error("Error retrieving User by username!");
    }
}

export async function getUserById(id: number){
    try{
        const user:User|null = await prisma.user.findFirst({
            where:{
                "id": id
            }
        });
        return user;
    }
    catch(error){
        console.error("Error retrieving User by id: ", error)
        throw new Error("Error retrieving User by ID");
    }
}

export async function getUserByIdDeep(id: number){
    try{
        const userDeep:UserDeep|null = await prisma.user.findFirst({
            where:{
                "id": id
            },
            include:{
                "imagesPosted":true,
                "imagesLiked": {
                    include:{
                        image: true
                    }
                }
            }
        });

        return userDeep
    }
    catch(error){
        console.error("Error retrieving User (deep) by ID: ", error);
        throw new Error("Error retrieving User (deep) by ID");
    }
}

export async function userExists(username: string){
    try{
        const user = await prisma.user.findUnique({
        where: { username },
        });
        return user !== null;
    }
    catch(error){
        console.error("Error checking if user exists: ", error)
        throw new Error("Error checking if user exists!");
    }
}

export async function updateProfilePicture(userId:number, profilePictureSrc: string){
    try{
        const user:User = await prisma.user.update({
            where:{
                "id": userId
            },
            data: {
                "profilePictureSrc": profilePictureSrc
            }

        });
        return user;
    }
    catch(error){
        console.error("Error beim uploaden des Profilfotos!");
        throw new Error("Error beim uploaden des Profilfotos!");
    }
}
