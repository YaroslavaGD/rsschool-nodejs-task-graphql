import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberTypeEnum, MemberTypeId, MemberType } from "../types/member-type.js";
import { PrismaClient } from "@prisma/client";

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async(source, { id }: { id: MemberTypeEnum }, { prisma }: { prisma: PrismaClient }) => {
        const memberType = await prisma.memberType.findUnique({ where: {id} });

        return memberType;
      }
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (source, args, { prisma }: { prisma: PrismaClient }) => {
        const memberTypes = await prisma.memberType.findMany();

        return memberTypes;
      },
    },

  }
});

