import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { PrismaClient } from "@prisma/client";
import { getMember, getMembers } from "./resolvers/member-resolvers.js";
import { getPost, getPosts } from "./resolvers/post-resolvers.js";
import { getProfile, getProfiles } from "./resolvers/profile-resolvers.js";
import { getUser, getUsers } from "./resolvers/user-resolvers.js";
import { UUIDType } from "./types/uuid.js";
import { MemberTypeEnum, MemberTypeId, MemberType } from "./types/member-type.js";
import { Post } from "./types/post.js";
import { Profile } from "./types/profile.js";
import { User } from "./types/user.js";
import { postQuery } from "./schemas-fields/post-fields.js";
import { profileQuery } from "./schemas-fields/profile-fields.js";
import { userQuery } from "./schemas-fields/user-fields.js";
import { memberQuery } from "./schemas-fields/member-fields.js";

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...memberQuery,
    ...postQuery,
    ...profileQuery,
    ...userQuery,
  }
});

