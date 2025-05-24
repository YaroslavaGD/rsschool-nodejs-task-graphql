import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberTypeEnum, MemberTypeId, MemberType } from "../types/member-type.js";
import { PrismaClient } from "@prisma/client";
import { getMember, getMembers, getPost, getPosts } from "../resolvers/resolvers.js";
import { Post } from "../types/post.js";
import { UUIDType } from "../types/uuid.js";

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async(source, { id }: { id: MemberTypeEnum }, { prisma }: { prisma: PrismaClient }) => getMember(id, prisma),
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (source, args, { prisma }: { prisma: PrismaClient }) => getMembers(prisma),
    },

    post: {
      type: Post,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(source, { id }: { id: MemberTypeEnum }, { prisma }: { prisma: PrismaClient }) => getPost(id, prisma),
    },

    posts: {
      type: new GraphQLList(Post),
      resolve: async (source, args, { prisma }: { prisma: PrismaClient }) => getPosts(prisma),
    }

  }
});

