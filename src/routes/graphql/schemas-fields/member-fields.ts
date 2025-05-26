import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeEnum, MemberTypeId } from "../types/member-type.js";
import { PrismaClient } from "@prisma/client";
import { getMember, getMembers } from "../resolvers/member-resolvers.js";

export const memberQuery = {
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async(_, { id } : { id: MemberTypeEnum }, { prisma } : { prisma: PrismaClient }) => getMember(id, prisma),
  },

  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_, args, { prisma } : { prisma: PrismaClient }) => getMembers(prisma),
  },
}