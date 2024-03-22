import { mutationWithClientMutationId, fromGlobalId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLBoolean } from "graphql";
import { iContext } from "../../serverConfig/context";
import { GraphqlImageEdge } from "./image.typeDef";

const GraphQLCreateImageMutation = mutationWithClientMutationId({
  name: "createImage",
  inputFields: { url: { type: GraphQLString }, title: { type: GraphQLString } },
  outputFields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    image: { type: GraphqlImageEdge },
  },
  mutateAndGetPayload: async ({ url, title }, ctx: iContext) => {
    return await ctx._imageRepository.createImage({ url, title });
  },
});

const GraphQLUpdateImageMutation = mutationWithClientMutationId({
  name: "updateImage",
  inputFields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    isFavourite: { type: GraphQLBoolean },
  },
  outputFields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    image: { type: GraphqlImageEdge },
  },
  mutateAndGetPayload: async ({ id, title, isFavourite }, ctx: iContext) => {
    return await ctx._imageRepository.updateImage({
      imageId: fromGlobalId(id).id,
      title,
      isFavourite,
    });
  },
});

const GraphQLDeleteImageMutation = mutationWithClientMutationId({
  name: "deleteImage",
  inputFields: { id: { type: GraphQLID } },
  outputFields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    image: { type: GraphqlImageEdge },
  },
  mutateAndGetPayload: async ({ id }, ctx: iContext) => {
    return await ctx._imageRepository.deleteImage({
      imageId: fromGlobalId(id).id,
    });
  },
});

const GraphQLImageMutations = {
  createImage: GraphQLCreateImageMutation,
  updateImage: GraphQLUpdateImageMutation,
  deleteImage: GraphQLDeleteImageMutation,
};

export { GraphQLImageMutations };
