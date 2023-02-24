// import { getSession } from "@auth0/nextjs-auth0";
// import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import { GetServerSideProps } from "next";
import WorkPage from "../../components/work/WorkPage";
// import prisma from "../../lib/prisma";

export default WorkPage;
export const config = {
  unstable_runtimeJS: false,
};

export async function getStaticPaths<getStaticPaths>() {
  const prisma = await new PrismaClient();
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
  const prisma = await new PrismaClient();
  const { params } = ctx;
  const classId = params?.classId;
  const dashboard = await getDashboard();
  const folders = await getFolders();
  const class_ = await prisma.class.findFirst({
    where: { id: classId },
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      sample: true,
    },
  });
  console.log(`class_`, class_);

  async function getDashboard() {
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
        Topic: {
          include: {
            Template: true,
            cards: true,
          },
        },
      },
    });
    // console.log(`'folders = '`, res);

    return res;
  }

  const post = { dashboard, folders, class_ };

  return {
    props: { post },
    revalidate: 10,
  };
}
