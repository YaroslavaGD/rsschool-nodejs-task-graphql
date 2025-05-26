import { GraphQLObjectType } from "graphql";
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

