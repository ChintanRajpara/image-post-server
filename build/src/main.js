"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./graphql/schema");
const context_1 = require("./serverConfig/context");
const http_1 = require("http");
const context = async ({ request, response, }) => new context_1.ContextRepository({ request, response });
const yoga = (0, graphql_yoga_1.createYoga)({ schema: schema_1.schema, context });
const server = (0, http_1.createServer)(yoga);
server.listen(8080, () => {
    console.info("Server is running on http://localhost:8080/graphql");
});
//# sourceMappingURL=main.js.map