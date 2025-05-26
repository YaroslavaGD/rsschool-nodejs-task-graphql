import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ChangeProfileInput, CreateProfileInput, IProfileInput, Profile } from "../types/profile.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { changeProfile, createProfile, deleteProfile, getProfile, getProfiles } from "../resolvers/profile-resolvers.js";

export const profileQuery = {
  profile: {
    type: Profile,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async(_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => getProfile(id, prisma),
  },

  profiles: {
    type: new GraphQLList(Profile),
    resolve: async (_, args, { prisma }: { prisma: PrismaClient }) => getProfiles(prisma),
  },
};

export const profileMutations = {
  createProfile: {
    type: Profile,
    args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
    resolve: async (_, { dto } : { dto: IProfileInput}, { prisma } : { prisma: PrismaClient }) => createProfile(dto, prisma)
  },
  changeProfile: {
    type: Profile,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: new GraphQLNonNull(ChangeProfileInput) } },
    resolve: async (_, { id, dto } : { id: string, dto: IProfileInput}, { prisma } : { prisma: PrismaClient }) => changeProfile(id, dto, prisma)
  },
  deleteProfile: {
    type: GraphQLString,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_, { id } : { id: string}, { prisma } : { prisma: PrismaClient }) => deleteProfile(id, prisma)
  },
}