// import { getSession } from "@auth0/nextjs-auth0";
// import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { GetStaticPaths } from "next";
import WorkPage from "../../components/work/WorkPage";
// import { initUser } from "../../lib/initUser";
const prisma = new PrismaClient();
export default WorkPage;
export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticPaths() {
  const classes = await prisma.class.findMany({ select: { id: true } });

  const paths = classes?.map((class_) => ({
    params: { classId: class_?.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx: any) {
  const { params } = ctx;
  const classId = params?.classId;
  const dashboard = await test();
  const folders = await getFolders();
  console.log(`props here = `, params);

  async function test() {
    const res = await prisma.card.groupBy({
      by: ["level", "category"],
      where: {
        Topic: {
          folder: {
            classId,
          },
        },
      },
      _count: {
        id: true,
      },
    });
    // console.log("res======= ", res);
    return res;
  }
  async function getFolders() {
    const res = await prisma.folder.findMany({
      where: { classId },
      include: {
        Topic: true,
      },
    });
    // console.log(`'folders = '`, res);

    return res;
  }

  const post = { dashboard, folders };

  return {
    props: { post },
  };
}
