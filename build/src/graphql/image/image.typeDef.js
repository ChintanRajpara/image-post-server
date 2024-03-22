"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlImageEdge = exports.GraphqlImageConnection = void 0;
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const globalIdTypes_1 = require("../globalIdTypes");
const GraphqlImage = new graphql_1.GraphQLObjectType({
    name: "Image",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            resolve: ({ id }) => {
                return (0, graphql_relay_1.toGlobalId)(globalIdTypes_1.GLOBAL_ID_TYPES.Image, id);
            },
        },
        title: { type: graphql_1.GraphQLString },
        isFavourite: { type: graphql_1.GraphQLBoolean },
        url: {
            type: graphql_1.GraphQLString,
            resolve: ({ fileName }) => {
                return `http://localhost:8181/${fileName}`;
            },
        },
    }),
});
const { connectionType: GraphqlImageConnection, edgeType: GraphqlImageEdge } = (0, graphql_relay_1.connectionDefinitions)({
    nodeType: GraphqlImage,
});
exports.GraphqlImageConnection = GraphqlImageConnection;
exports.GraphqlImageEdge = GraphqlImageEdge;
//# sourceMappingURL=image.typeDef.js.map