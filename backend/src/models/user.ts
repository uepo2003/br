import {User} from "@prisma/client";
import {type PostWithUser} from "@/models/post";
import {databaseManager} from "@/db/index";

type UserProfileData = Partial<Pick<User, "name" | "email" | "imageName">>;
type UserData = Pick<User, "name" | "email" | "password">;

export type UserWithoutPassword = Omit<User, "password">;

export const selectUserColumnsWithoutPassword = {
  id: true,
  name: true,
  email: true,
  imageName: true,
  createdAt: true,
  updatedAt: true,
};

export const createUser = async (userData: UserData): Promise<User> => {
  const prisma = databaseManager.getInstance();
  const user = await prisma.user.create({
    data: {...userData, imageName: "/image/users/default_user.jpg"},
  });
  return user;
};

export const updateUserProfile = async (
  userId: number,
  userProfileData: UserProfileData
): Promise<User> => {
  const prisma = databaseManager.getInstance();
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: userProfileData,
  });
  return user;
};

export const getUserPosts = async (userId: number): Promise<PostWithUser[]> => {
  const prisma = databaseManager.getInstance();
  const userPosts = await prisma.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      content: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          ...selectUserColumnsWithoutPassword,
        },
      },
    },
  });
  return userPosts;
};

export const getUserLikes = async (userId: number): Promise<PostWithUser[]> => {
  const prisma = databaseManager.getInstance();
  const likes = await prisma.like.findMany({
    where: {
      userId,
    },
    orderBy: {
      post: {
        createdAt: "desc",
      },
    },
    select: {
      post: {
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              ...selectUserColumnsWithoutPassword,
            },
          },
        },
      },
    },
  });
  return likes.map(like => like.post);
};

export const getAllUsers = async (): Promise<UserWithoutPassword[]> => {
  const prisma = databaseManager.getInstance();
  const users = await prisma.user.findMany({
    select: {
      ...selectUserColumnsWithoutPassword,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};

export const getUser = async (
  userId: number
): Promise<UserWithoutPassword | null> => {
  const prisma = databaseManager.getInstance();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      ...selectUserColumnsWithoutPassword,
    },
  });
  return user;
};

export const getUserByEmail = async (
  email: string
): Promise<UserWithoutPassword | null> => {
  const prisma = databaseManager.getInstance();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      ...selectUserColumnsWithoutPassword,
    },
  });
  return user;
};

export const getUserByEmailWithPassword = async (
  email: string
): Promise<User | null> => {
  const prisma = databaseManager.getInstance();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
