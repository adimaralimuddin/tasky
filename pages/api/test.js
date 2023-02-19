// import prisma from "../../lib/prisma";

import { PrismaClient } from "@prisma/client";
import { CLIENT_RENEG_LIMIT } from "tls";

export default async function test(req, res) {
  const pris = new PrismaClient();
  const r = await pris.card.groupBy({
    by: ["level", "category"],
    where: {
      Topic: {
        folder: {
          classId: "clbw1w4ce0047ogjolvoflbxb",
        },
      },
    },
    _count: {
      id: true,
    },
  });

  console.log("==========================", r);
  res.json(r);
}
