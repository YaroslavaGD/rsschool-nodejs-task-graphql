import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { Profile } from "./profile.js";
import { PrismaClient } from "@prisma/client";
import { Post } from "./post.js";
import { getSubscribedToUser, getUserSubscribedTo } from "../resolvers/user-resolvers.js";
import { getPostsByAuthorId } from "../resolvers/post-resolvers.js";
import { getProfileByUserId } from "../resolvers/profile-resolvers.js";

export interface IUserInput {
  name: string;
  balance: number;
}

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
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: async({ id }: { id: string }, args, { prisma }: { prisma: PrismaClient }) => getSubscribedToUser(id, prisma), 
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }
});