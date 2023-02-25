import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import TemplatePage from "../../components/template/TemplatePage";
const prisma = new PrismaClient();

export default TemplatePage;

export async function getStaticPaths() {
  const users = await prisma.user.findMany();
  const paths = users.map((user) => ({ params: { userId: user.dbid } }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = String(context?.params?.userId);
  const user = await prisma.user.findFirst({
    where: { dbid: userId },
    select: { id: true, dbid: true, name: true },
  });

  let templates = await prisma.template.findMany({
    where: { OR: [{ userId: user?.id }, { sample: true }] },
    select: {
      backs: true,
      fronts: true,
      _count: true,
      name: true,
      id: true,
      sample: true,
      userId: true,
    },
  });

  const myServerTemplates = templates.filter((c) => c.userId === user?.id);
  const sampleServerTemplates = templates.filter((c) => c.sample === true);

  const props = {
    user,
    myServerTemplates,
    sampleServerTemplates,
  };

  console.log(`template page templates: `, templates);
  console.log(`template page serverProps: `, props);

  return { props };
};

// export const getStaticProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     const defTempId = process.env.DEF_TEMP;
//     const session = getSession(ctx.req, ctx.res);
//     await initUser(session?.user);
//     return {
//       props: { defTempId },
//     };
//   },
// });
