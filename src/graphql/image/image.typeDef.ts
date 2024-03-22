import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { toGlobalId, connectionDefinitions } from "graphql-relay";
import { GLOBAL_ID_TYPES } from "../globalIdTypes";

const GraphqlImage = new GraphQLObjectType({
  name: "Image",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: ({ id }) => {
        return toGlobalId(GLOBAL_ID_TYPES.Image, id);
      },
    },
    title: { type: GraphQLString },
    isFavourite: { type: GraphQLBoolean },
    url: {
      type: GraphQLString,
      resolve: ({ fileName }) => {
        return `http://localhost:8181/${fileName}`;
      },
    },
  }),
});

const { connectionType: GraphqlImageConnection, edgeType: GraphqlImageEdge } =
  connectionDefinitions({
    nodeType: GraphqlImage,
  });

export { GraphqlImageConnection, GraphqlImageEdge };
