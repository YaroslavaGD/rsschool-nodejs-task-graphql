import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { Profile } from "./profile.js";
import { PrismaClient } from "@prisma/client";
import { Post } from "./post.js";
import { getPostsByAuthorId, getProfileByUserId, getUserSubscribedTo } from "../resolvers/resolvers.js";

export const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: Profile,
      resolve: async({ id }: { id: string }, args, { prisma }: { prisma: PrismaClient }) => getProfileByUserId(id, prisma), 
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async({ id }: { id: string }, args, { prisma }: { prisma: PrismaClient }) => getPostsByAuthorId(id, prisma), 
    },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: async({ id }: { id: string }, args, { prisma }: { prisma: PrismaClient }) => getUserSubscribedTo(id, prisma), 
    }
  }),
});