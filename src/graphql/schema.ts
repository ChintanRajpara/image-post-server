import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { GraphQLImageMutations } from "./image/image.mutations";
import { GraphQLImageQueries } from "./image/image.queries";
import { GLOBAL_ID_TYPES } from "./globalIdTypes";
import { toGlobalId } from "graphql-relay";

const GraphQLViewer = new GraphQLObjectType({
  name: "Viewer",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: ({ id }) => {
        return toGlobalId(GLOBAL_ID_TYPES.Viewer, id);
      },
    },
    name: { type: GraphQLString },
    images: GraphQLImageQueries.images,
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    viewer: {
      type: GraphQLViewer,
      resolve: () => ({
        name: "Chintan Rajpara",
        id: "2c00182d-64c1-49f5-9938-93378ffedc16",
      }),
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: { ...GraphQLImageMutations },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export { schema };
