import { PrismaClient } from "@prisma/client";

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