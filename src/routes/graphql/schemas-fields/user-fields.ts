import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ChangeUserInput, CreateUserInput, IUserInput, User } from "../types/user.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { changeUser, createUser, deleteUser, getUser, getUsers, subscribeTo, unsubscribeFrom } from "../resolvers/user-resolvers.js";

export const userQuery = {
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
};

export const userMutations = {
  createUser: {
    type: User,
    args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
    resolve: async (source, { dto } : { dto: IUserInput}, { prisma } : { prisma: PrismaClient }) => createUser(dto, prisma)
  },
  changeUser: {
    type: User,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangeUserInput) } },
    resolve: async (source, { id, dto } : { id: string, dto: IUserInput}, { prisma } : { prisma: PrismaClient }) => changeUser(id, dto, prisma)
  },
  deleteUser: {
    type: GraphQLString,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (source, { id } : { id: string}, { prisma } : { prisma: PrismaClient }) => deleteUser(id, prisma)
  },
  subscribeTo: {
    type: GraphQLString,
    args: { userId: { type:  new GraphQLNonNull(UUIDType) }, authorId:  { type:  new GraphQLNonNull(UUIDType) } },
    resolve: async (source, { userId, authorId } : { userId: string, authorId: string}, { prisma } : { prisma: PrismaClient }) => subscribeTo(userId, authorId, prisma)
  },
  unsubscribeFrom: {
    type: GraphQLString,
    args: { userId: { type:  new GraphQLNonNull(UUIDType) }, authorId:  { type:  new GraphQLNonNull(UUIDType) } },
    resolve: async (source, { userId, authorId } : { userId: string, authorId: string}, { prisma } : { prisma: PrismaClient }) => unsubscribeFrom(userId, authorId, prisma)
  }
};