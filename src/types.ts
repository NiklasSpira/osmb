import { Image, ImageLike, User, Comment } from '@prisma/client';
export type ImageWithUser = Image & { user: User };
export type CommentDeep = Comment & 
{
  user?: User,
  image?: Image
}
export type ImageLikeDeep = ImageLike & 
{
  image?: Image,
  user?: User
}
export type UserDeep = User & 
{imagesPosted?: Image[],
  imagesLiked?: ImageLike[]
};
export type UserData = {
  id: number,
  username: string,
  profilePictureSrc: string|null,
  imagesPosted?: ImageData[],
  imagesLiked?: ImageData[]
}

export type CommentData = {
  id: number,
  content: string,
  likeCount: number,
  image?: ImageData,
  user?: UserData
}
export type ImageData = {
      id: number;
      likeCount: number;
      created: string;
      src: string;
      title: string;
      description: string;
      user?: UserData
};

export type LikeData = {
  likeRemoved: boolean,
  likeAdded: boolean
}