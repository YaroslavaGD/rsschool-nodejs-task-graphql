import { PrismaClient } from "@prisma/client";
import { MemberTypeEnum } from "../types/member-type.js";

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

  // if (post === null) {
  //   throw httpErrors.notFound();
  // }

  return post;
}

export async function getPosts(prisma: PrismaClient) {
  const posts = await prisma.post.findMany();

  return posts;
}

export async function getPostsByAuthorId(id: string, prisma: PrismaClient) {
  const posts = await prisma.post.findMany({ where: { authorId: id } });

  return posts;
}

export async function getProfile(id: string, prisma: PrismaClient) {
  const profile = await prisma.profile.findUnique({ where: { id },});

  // if (profile === null) {
  //   throw httpErrors.notFound();
  // }

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

  // if (user === null) {
  //   throw httpErrors.notFound();
  // }

  return user;
}

export async function getUsers(prisma: PrismaClient) {
  const users = await prisma.user.findMany();

  return users;
}