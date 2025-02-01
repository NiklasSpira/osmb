import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

export async function addNewUser(username:string, password:string){
    const user = await prisma.user.create({
        data:{
            "username": username,
            "password": password
        }
    });

    return user;
}

export async function getUserByUsername(username: string):Promise<User|null>{
    return await prisma.user.findFirst({
        where:{
            "username": username
        }
    })
}

export async function getUserById(id: number):Promise<User|null>{
    return await prisma.user.findFirst({
        where:{
            "id": id
        }
    })
}

export async function userExists(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user !== null;
  }