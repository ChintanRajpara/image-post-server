import { GraphQLBoolean } from "graphql";
import { GraphqlImageConnection } from "./image.typeDef";
import { connectionArgs } from "graphql-relay";
import { iContext } from "../../serverConfig/context";

const GraphQLImageQueries = {
  images: {
    type: GraphqlImageConnection,
    args: { ...connectionArgs, isFavourite: { type: GraphQLBoolean } },
    resolve: async (_: any, args: any, ctx: iContext) => {
      return ctx._imageRepository.getImages(args);
    },
  },
};

export { GraphQLImageQueries };
