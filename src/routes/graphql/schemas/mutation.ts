import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { CreatePostInput, ICreatePostInput, Post } from "../types/post.js";
import { PrismaClient } from "@prisma/client";
import { createPost, deletePost } from "../resolvers/post-resolvers.js";
import { UUIDType } from "../types/uuid.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createPost: {
      type: Post,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (source, { dto } : { dto: ICreatePostInput}, { prisma } : { prisma: PrismaClient }) => createPost(dto, prisma)
    },
    deletePost: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (source, { id } : { id: string}, { prisma } : { prisma: PrismaClient }) => deletePost(id, prisma)
    }
  }
});