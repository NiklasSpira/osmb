import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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
    
        console.log('Image liked successfully within a transaction.');
      } catch (error) {
        console.error('Transaction failed:', error);
      }
}

async function removeLike(userId: number, imageId: number) {
    try {
      // Use a transaction to ensure both operations succeed together
      await prisma.$transaction(async (tx) => {
        // Delete the ImageLike relation using the composite primary key.
        await tx.imageLike.delete({
          where: {
            // Prisma generates a compound field name based on the fields defined in @@id.
            // Here, it's assumed to be `userId_imageId`.
            userId_imageId: {
              userId,
              imageId,
            },
          },
        });
  
        // Decrement the likeCount on the Image model.
        await tx.image.update({
          where: { id: imageId },
          data: {
            likeCount: { decrement: 1 },
          },
        });
      });
  
      console.log('Successfully removed like');
    } catch (error) {
      console.error('Failed to remove like:', error);
      // Optionally re-throw the error if you want it handled further up.
      throw error;
    }
  }

  
export async function toggleLike(userId: number, imageId: number) {
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
        // If a like exists, remove it
        await removeLike(userId, imageId);
        console.log("Like removed.");
      } else {
        // Otherwise, add a like
        await likeImage(userId, imageId);
        console.log("Like added.");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
}