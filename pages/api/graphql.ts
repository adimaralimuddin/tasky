import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
// import { resolvers } from "../../graphql/resolvers";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "../../graphql/context";
const Cors = require("micro-cors");

const cors = Cors();
const apolloServer = new ApolloServer({
  schema,
  // resolvers,
  context: createContext,
});

const startServer = apolloServer.start();
export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
