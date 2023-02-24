import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import PageMainClass from "../../components/class/ClassPage";
const prisma = new PrismaClient();

export default PageMainClass;

export async function getStaticPaths() {
  const users = await prisma.user.findMany();
  const paths = users.map((user) => ({ params: { userId: user.dbid } }));

  console.log(`paths`, paths);

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = String(context?.params?.userId);
  const user = await prisma.user.findFirst({ where: { dbid: userId } });

  console.log(`userdbid`, user);

  let classes = await prisma.class.findMany({
    where: { OR: [{ userId: user?.id }, { sample: true }] },
    select: {
      name: true,
      description: true,
      id: true,
      sample: true,
      userId: true,
    },
  });

  const myClasses = classes.filter((c) => c.userId === user?.id);
  const sampleClasses = classes.filter((c) => c.sample === true);

  return {
    props: {
      // classes,
      myClasses,
      sampleClasses,
    },
  };
};
