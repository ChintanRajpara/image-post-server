import { createYoga } from "graphql-yoga";
import { Request, Response } from "express";
import { schema } from "./graphql/schema";
import { ContextRepository } from "./serverConfig/context";
import { createServer } from "http";

const context = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => new ContextRepository({ request, response });

const yoga = createYoga({ schema, context });

const server = createServer(yoga);

server.listen(8080, () => {
  console.info("Server is running on http://localhost:8080/graphql");
});
