import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { CreatePostInput, ICreatePostInput, Post } from "../types/post.js";
import { PrismaClient } from "@prisma/client";
import { createPost } from "../resolvers/post-resolvers.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createPost: {
      type: Post,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (source, { dto } : { dto: ICreatePostInput}, { prisma } : { prisma: PrismaClient }) => createPost(dto, prisma)
    }
  }
});