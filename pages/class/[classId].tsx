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
  return {
    paths: [
      {
        params: { classId: "clbw1w4ce0047ogjolvoflbxb" },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(ctx: any) {
  const { params } = ctx;
  const classId = params?.classId;
  const dashboard = await test();
  const folders = await getFolders();
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

    console.log("res======= ", res);
    return res;
  }

  async function getFolders() {
    const res = await prisma.folder.findMany({
      where: { classId },
      include: {
        Topic: true,
      },
    });
    console.log(`'folders = '`, res);

    return res;
  }

  // const defTempId = process.env.DEF_TEMP;
  const post = { title: "oyahh kamu" + params?.classId, dashboard, folders };
  
  return {
    props: { post },
  };
}

// export async function getServerSideProps(ctx: {
//   req: NextApiRequest;
//   res: NextApiResponse;
// }) {
//   const defTempId = process.env.DEF_TEMP;
//   const session = getSession(ctx?.req, ctx?.res);
//   initUser(session?.user);
//   return {
//     props: { defTempId },
//   };
// }
