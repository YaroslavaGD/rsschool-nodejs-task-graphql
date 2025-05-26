import { PrismaClient } from "@prisma/client";
import { IUserInput } from "../types/user.js";

export async function getUser(id: string, prisma: PrismaClient) {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
}

export async function getUsers(prisma: PrismaClient) {
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserSubscribedTo(id: string, prisma: PrismaClient) {
  const subs = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: id,
        },
      },
    },
  });

  return subs;
}

export async function getSubscribedToUser(id: string, prisma: PrismaClient) {
  const subs = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: id,
        },
      },
    },
  });

  return subs;
}

export async function createUser(createUserInfo: IUserInput, prisma: PrismaClient) {
  const user = await prisma.user.create({ data: createUserInfo });

  return user;
}

export async function changeUser(id: string, changeUserInfo: IUserInput, prisma: PrismaClient) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: changeUserInfo,
  });

  return updatedUser;
}

export async function deleteUser(id: string, prisma: PrismaClient) {
  const deletedUser = await prisma.user.delete({ where: { id } });

  return deletedUser.id;
}

export async function subscribeTo(userId: string, authorId: string, prisma: PrismaClient) {
  const newSubscriber = await prisma.subscribersOnAuthors.create({
    data: {
      subscriberId: userId,
      authorId,
    },
  });

  return newSubscriber.subscriberId;
}

export const unsubscribeFrom = async (userId: string, authorId: string, prisma: PrismaClient) => {
  const oldSubscriber = await prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId,
      },
    },
  });

  return oldSubscriber.subscriberId;
};