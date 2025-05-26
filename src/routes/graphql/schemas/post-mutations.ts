import { GraphQLNonNull, GraphQLString } from "graphql";
import { ChangePostInput, CreatePostInput, IPostInput, Post } from "../types/post.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { changePost, createPost, deletePost } from "../resolvers/post-resolvers.js";

export const postMutations = {
  createPost: {
    type: Post,
    args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
    resolve: async (source, { dto } : { dto : IPostInput}, { prisma } : { prisma: PrismaClient }) => createPost(dto, prisma)
  },
  changePost: {
    type: Post,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangePostInput) } },
    resolve: async (source, { id, dto } : {id: string, dto: IPostInput, }, { prisma } : { prisma: PrismaClient }) => changePost(id, dto, prisma)
  },
  deletePost: {
    type: GraphQLString,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (source, { id } : { id: string}, { prisma } : { prisma: PrismaClient }) => deletePost(id, prisma)
  },
};