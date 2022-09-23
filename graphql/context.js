

import prisma from "../lib/prisma";
export async function createContext() {
  return {
    prisma,
  };
}
