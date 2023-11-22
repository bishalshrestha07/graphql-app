import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
        }
    `,
    resolvers: {
      Query: {
        hello: () => "world, I am bishal",
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running and happy" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
}

init();
