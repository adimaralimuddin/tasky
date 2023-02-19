import prisma from "../lib/prisma";
export async function createContext({ req, res }) {
  return {
    prisma,
    req,
    res,
  };
}
