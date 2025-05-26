import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeEnum, MemberTypeId } from "./member-type.js";
import { PrismaClient } from "@prisma/client";
import { getMember } from "../resolvers/member-resolvers.js";

export interface IProfileInput {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

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

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    userId: {
      type:  new GraphQLNonNull(UUIDType),
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
  }
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  }
});