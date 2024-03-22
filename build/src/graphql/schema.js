"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const image_mutations_1 = require("./image/image.mutations");
const image_queries_1 = require("./image/image.queries");
const globalIdTypes_1 = require("./globalIdTypes");
const graphql_relay_1 = require("graphql-relay");
const GraphQLViewer = new graphql_1.GraphQLObjectType({
    name: "Viewer",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            resolve: ({ id }) => {
                return (0, graphql_relay_1.toGlobalId)(globalIdTypes_1.GLOBAL_ID_TYPES.Viewer, id);
            },
        },
        name: { type: graphql_1.GraphQLString },
        images: image_queries_1.GraphQLImageQueries.images,
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
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
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "RootMutation",
    fields: { ...image_mutations_1.GraphQLImageMutations },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
exports.schema = schema;
//# sourceMappingURL=schema.js.map