import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ChangePostInput, CreatePostInput, IPostInput, Post } from "../types/post.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { changePost, createPost, deletePost, getPost, getPosts } from "../resolvers/post-resolvers.js";

export const postQuery = {
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
};

export const postMutations = {
  createPost: {
    type: Post,
    args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
    resolve: async (_, { dto } : { dto : IPostInput }, { prisma } : { prisma: PrismaClient }) => createPost(dto, prisma)
  },
  changePost: {
    type: Post,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangePostInput) } },
    resolve: async (_, { id, dto } : { id: string, dto: IPostInput }, { prisma } : { prisma: PrismaClient }) => changePost(id, dto, prisma)
  },
  deletePost: {
    type: GraphQLString,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_, { id } : { id: string }, { prisma } : { prisma: PrismaClient }) => deletePost(id, prisma)
  },
};