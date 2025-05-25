import { PrismaClient } from "@prisma/client";

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