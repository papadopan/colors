import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { ColorResolver } from "./Resolvers/Color";
import { Context } from "./types";

const prisma = new PrismaClient();

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ColorResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res, db: prisma }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
