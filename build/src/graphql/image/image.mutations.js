"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLImageMutations = void 0;
const graphql_relay_1 = require("graphql-relay");
const graphql_1 = require("graphql");
const image_typeDef_1 = require("./image.typeDef");
const GraphQLCreateImageMutation = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: "createImage",
    inputFields: { url: { type: graphql_1.GraphQLString }, title: { type: graphql_1.GraphQLString } },
    outputFields: {
        success: { type: graphql_1.GraphQLBoolean },
        message: { type: graphql_1.GraphQLString },
        image: { type: image_typeDef_1.GraphqlImageEdge },
    },
    mutateAndGetPayload: async ({ url, title }, ctx) => {
        return await ctx._imageRepository.createImage({ url, title });
    },
});
const GraphQLUpdateImageMutation = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: "updateImage",
    inputFields: {
        id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        isFavourite: { type: graphql_1.GraphQLBoolean },
    },
    outputFields: {
        success: { type: graphql_1.GraphQLBoolean },
        message: { type: graphql_1.GraphQLString },
        image: { type: image_typeDef_1.GraphqlImageEdge },
    },
    mutateAndGetPayload: async ({ id, title, isFavourite }, ctx) => {
        return await ctx._imageRepository.updateImage({
            imageId: (0, graphql_relay_1.fromGlobalId)(id).id,
            title,
            isFavourite,
        });
    },
});
const GraphQLDeleteImageMutation = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: "deleteImage",
    inputFields: { id: { type: graphql_1.GraphQLID } },
    outputFields: {
        success: { type: graphql_1.GraphQLBoolean },
        message: { type: graphql_1.GraphQLString },
        image: { type: image_typeDef_1.GraphqlImageEdge },
    },
    mutateAndGetPayload: async ({ id }, ctx) => {
        return await ctx._imageRepository.deleteImage({
            imageId: (0, graphql_relay_1.fromGlobalId)(id).id,
        });
    },
});
const GraphQLImageMutations = {
    createImage: GraphQLCreateImageMutation,
    updateImage: GraphQLUpdateImageMutation,
    deleteImage: GraphQLDeleteImageMutation,
};
exports.GraphQLImageMutations = GraphQLImageMutations;
//# sourceMappingURL=image.mutations.js.map