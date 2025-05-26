import {  GraphQLObjectType } from "graphql";
import { userMutations } from "./schemas-fields/user-fields.js";
import { postMutations } from "./schemas-fields/post-fields.js";
import { profileMutations } from "./schemas-fields/profile-fields.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    ...postMutations,
    ...profileMutations,
    ...userMutations
  }
});