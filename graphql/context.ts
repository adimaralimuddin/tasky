import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

interface ContextArgs {
  req: NextApiRequest;
  res: NextApiResponse;
}
export async function createContext({ req, res }: ContextArgs) {
  return {
    prisma,
    req,
    res,
  };
}

export type ContextType = ContextArgs & { prisma: PrismaClient };
