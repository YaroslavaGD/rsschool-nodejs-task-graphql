import { PrismaClient } from "@prisma/client";
import { MemberTypeEnum } from "../types/member-type.js";

export async function getMember(id: MemberTypeEnum, prisma: PrismaClient) {
  const memberType = await prisma.memberType.findUnique({ where: { id } });

  return memberType;
}

export async function getMembers(prisma: PrismaClient) {
  const memberTypes = await prisma.memberType.findMany();

  return memberTypes;
}
