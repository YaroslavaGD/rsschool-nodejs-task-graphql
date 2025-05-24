import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberTypeEnum, MemberTypeId, MemberType } from "../types/member-type.js";
import { PrismaClient } from "@prisma/client";
import { getMember, getMembers, getPost, getPosts, getProfile, getProfiles, getUser, getUsers } from "../resolvers/resolvers.js";
import { Post } from "../types/post.js";
import { UUIDType } from "../types/uuid.js";
import { Profile } from "../types/profile.js";
import { User } from "../types/user.js";

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
      resolve: async(source, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => getPost(id, prisma),
    },

    posts: {
      type: new GraphQLList(Post),
      resolve: async (source, args, { prisma }: { prisma: PrismaClient }) => getPosts(prisma),
    },

    profile: {
      type: Profile,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(source, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => getProfile(id, prisma),
    },

    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (source, args, { prisma }: { prisma: PrismaClient }) => getProfiles(prisma),
    },

    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(source, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => getUser(id, prisma),
    },

    users: {
      type: new GraphQLList(User),
      resolve: async (source, args, { prisma }: { prisma: PrismaClient }) => getUsers(prisma),
    },
  }
});

