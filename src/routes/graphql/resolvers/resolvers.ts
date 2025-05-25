import { PrismaClient } from "@prisma/client";
import { MemberTypeEnum } from "../types/member-type.js";
import { ICreatePostInput } from "../types/post.js";

export async function getMember(id: MemberTypeEnum, prisma: PrismaClient) {
  const memberType = await prisma.memberType.findUnique({ where: {id} });

  return memberType;
}

export async function getMembers(prisma: PrismaClient) {
  const memberTypes = await prisma.memberType.findMany();

  return memberTypes;
}

export async function getPost(id: string, prisma: PrismaClient) {
  const post = await prisma.post.findUnique({ where: { id } });

  return post;
}

export async function getPosts(prisma: PrismaClient) {
  const posts = await prisma.post.findMany();

  return posts;
}

export async function createPost(createPostInfo: ICreatePostInput, prisma: PrismaClient) {
  const post = await prisma.post.create({ data: createPostInfo });

  return post;
}

export async function getPostsByAuthorId(id: string, prisma: PrismaClient) {
  const posts = await prisma.post.findMany({ where: { authorId: id } });

  return posts;
}

export async function getProfile(id: string, prisma: PrismaClient) {
  const profile = await prisma.profile.findUnique({ where: { id },});

  return profile;
}

export async function getProfileByUserId(id: string, prisma: PrismaClient) {
  const profile = await prisma.profile.findUnique({ where: { userId: id } });

  return profile;
}

export async function getProfiles(prisma: PrismaClient) {
  const profiles = await prisma.profile.findMany();

  return profiles;
}

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