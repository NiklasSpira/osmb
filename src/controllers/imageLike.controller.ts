import { PrismaClient } from "@prisma/client";
import { LikeData } from "../types";


const prisma = new PrismaClient()

/**
 * Function likeImage gives an image a like by a user
 * @param userId - The id of the user who liked the image
 * @param imageId - The id of the image the user liked
 */
async function likeImage(userId: number, imageId: number){
    try {
        await prisma.$transaction(async (prisma) => {
          await prisma.imageLike.create({
            data: {
              user: { connect: { id: userId } },
              image: { connect: { id: imageId } },
            },
          });
    
          await prisma.image.update({
            where: { id: imageId },
            data: {
              likeCount: {
                increment: 1,
              },
            },
          });
        });
      } catch (error) {
        console.error('Transaction failed:', error);
        throw new Error("Error adding like!");
      }
}

/**
 * Function removeLike removes a like from an image by a user
 * @param userId - The id of the user who removed the like from the image
 * @param imageId - The id of the image the user removed the like from
 */
async function removeLike(userId: number, imageId: number) {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.imageLike.delete({
          where: {
            userId_imageId: {
              userId,
              imageId,
            },
          },
        });
  
        await tx.image.update({
          where: { id: imageId },
          data: {
            likeCount: { decrement: 1 },
          },
        });
      });
    } catch (error) {
      console.error('Failed to remove like:', error);
      throw new Error("Error removing like!")
    }
  }


  /**
   * Function toggleLike toggles the like of a user on an image
   * @param userId - The id of the user who toggled the like on the image
   * @param imageId - The id of the image the user toggled the like on
   * @returns The updated image
   */
export async function toggleLike(userId: number, imageId: number){
    try {
      // Check if the like relation already exists
      const existingLike = await prisma.imageLike.findUnique({
        where: {
          userId_imageId: {
            userId,
            imageId,
          },
        },
      });
  
      if (existingLike) {
        //If a like exists, remove it
        await removeLike(userId, imageId);
        return {
          likeRemoved: true,
          likeAdded: false
        };
      } else {
        //Otherwise, add a like
        await likeImage(userId, imageId);
        return {
          likeRemoved: false,
          likeAdded: true
        };
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      throw new Error("Error toggling like!");
    }
}