import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeEnum, MemberTypeId } from "./member-type.js";
import { PrismaClient } from "@prisma/client";
import { getMember } from "../resolvers/resolvers.js";

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async({ memberTypeId }: { memberTypeId: MemberTypeEnum }, args, { prisma }: { prisma: PrismaClient }) => getMember(memberTypeId, prisma),
    }
  }
});