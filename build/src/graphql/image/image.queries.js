"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLImageQueries = void 0;
const graphql_1 = require("graphql");
const image_typeDef_1 = require("./image.typeDef");
const graphql_relay_1 = require("graphql-relay");
const GraphQLImageQueries = {
    images: {
        type: image_typeDef_1.GraphqlImageConnection,
        args: { ...graphql_relay_1.connectionArgs, isFavourite: { type: graphql_1.GraphQLBoolean } },
        resolve: async (_, args, ctx) => {
            return ctx._imageRepository.getImages(args);
        },
    },
};
exports.GraphQLImageQueries = GraphQLImageQueries;
//# sourceMappingURL=image.queries.js.map