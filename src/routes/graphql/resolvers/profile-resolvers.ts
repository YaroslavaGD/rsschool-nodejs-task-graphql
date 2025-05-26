import { PrismaClient } from "@prisma/client";
import { IProfileInput } from "../types/profile.js";

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

export async function createProfile(profileInfo: IProfileInput, prisma: PrismaClient) {
  const profile = await prisma.profile.create({ data: profileInfo });

  return profile
}

export async function changeProfile(id: string, changeProfileInfo: IProfileInput, prisma: PrismaClient) {
  const updatedProfile = await prisma.profile.update({
    where: { id },
    data: changeProfileInfo,
  });

  return updatedProfile;
}

export async function deleteProfile(id: string, prisma: PrismaClient) {
  const deletedProfile = await prisma.profile.delete({ where: { id } });

  return deletedProfile.id;
}