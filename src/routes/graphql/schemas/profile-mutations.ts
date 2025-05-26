import { GraphQLNonNull, GraphQLString } from "graphql";
import { ChangeProfileInput, CreateProfileInput, IProfileInput, Profile } from "../types/profile.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { changeProfile, createProfile, deleteProfile } from "../resolvers/profile-resolvers.js";

export const profileMutations = {
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