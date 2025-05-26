import {  GraphQLObjectType } from "graphql";
import { userMutations } from "./user-mutations.js";
import { postMutations } from "./post-mutations.js";
import { profileMutations } from "./profile-mutations.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    ...postMutations,
    ...profileMutations,
    ...userMutations
  }
});