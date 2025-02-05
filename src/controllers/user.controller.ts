import { PrismaClient, User } from "@prisma/client";
import { UserDeep } from "../types";

const prisma = new PrismaClient()

/**
 * Function addNewUser adds a new user to the database
 * @param username - The name of the user to be added
 * @param password - The password of the user to be added
 * @returns The newly added user
 */
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

/**
 * Function getUserByUsername returns a user by its username
 * @param username - The username of the user
 * @returns The user specified by the username
 */
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

/**
 * Function getUserById returns a user by its id
 * @param id - The id of the user
 * @returns The user specified by the id
 */
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

/**
 * Function getUserById returns a deep user by its id
 * @param id - The id of the user
 * @returns The user specified by the id
 */
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

/**
 * Function userExists returns if a user exists
 * @param username - The username of the user
 * @returns A boolean value that specifies if the user exists in the database
 */
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

/**
 * function updateProfilePicture updates the profile picture of a user
 * @param userId - The id of the user
 * @param profilePictureSrc - The source of the profile picture on the server
 * @returns The newly updated user
 */
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
