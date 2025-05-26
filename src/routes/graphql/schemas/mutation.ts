import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ChangePostInput, CreatePostInput, IPostInput, Post } from "../types/post.js";
import { PrismaClient } from "@prisma/client";
import { changePost, createPost, deletePost } from "../resolvers/post-resolvers.js";
import { UUIDType } from "../types/uuid.js";
import { ChangeProfileInput, CreateProfileInput, IProfileInput, Profile } from "../types/profile.js";
import { changeProfile, createProfile, deleteProfile } from "../resolvers/profile-resolvers.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createPost: {
      type: Post,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (source, { dto } : { dto: IPostInput}, { prisma } : { prisma: PrismaClient }) => createPost(dto, prisma)
    },
    changePost: {
      type: Post,
      args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangePostInput) } },
      resolve: async (source, { id, dto } : { id: string, dto: IPostInput}, { prisma } : { prisma: PrismaClient }) => changePost(id, dto, prisma)
    },
    deletePost: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (source, { id } : { id: string}, { prisma } : { prisma: PrismaClient }) => deletePost(id, prisma)
    },
    createProfile: {
      type: Profile,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: async (source, { dto } : { dto: IProfileInput}, { prisma } : { prisma: PrismaClient }) => createProfile(dto, prisma)
    },
    changeProfile: {
      type: Profile,
      args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangeProfileInput) } },
      resolve: async (source, { id, dto } : { id: string, dto: IProfileInput}, { prisma } : { prisma: PrismaClient }) => changeProfile(id, dto, prisma)
    },
    deleteProfile: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (source, { id } : { id: string}, { prisma } : { prisma: PrismaClient }) => deleteProfile(id, prisma)
    },
  }
});