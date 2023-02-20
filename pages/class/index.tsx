// import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import PageMainClass from "../../components/class/ClassPage";
// import { initUser } from "../../lib/initUser";
export default PageMainClass;

// export default function ClassMainPage() {
//   return <div>super fast page</div>;
// }
// const prisma = new PrismaClient();

export async function getStaticProps(ctx: any) {
  // req: NextApiRequest,
  // res: NextApiResponse
  const defClass = process.env.DEF_CLASS;
  console.log("class index = ", defClass);
  // console.log(`ctx`, ctx);

  // const user = getSession(req, res);
  // console.log("user ", user);
  // user?.user?.

  // const userClasses = prisma.class.findMany({
  //   where: { userId: user.sub, sample: false },
  // });

  return {
    props: {
      defClass: defClass || null,
    },
  };
}

export const config = {
  unstable_runtimeJS: false,
};

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     // const session = getSession(ctx.req, ctx.res);
//     const defClass = process.env.DEF_CLASS;
//     // await initUser(session?.user);
//     return {
//       props: {
//         defClass,
//       },
//     };
//   },
// });

// export const getStaticProps = withPageAuthRequired({

// })
