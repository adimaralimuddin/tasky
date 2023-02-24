import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import PageMainClass from "../../components/class/ClassPage";
const prisma = new PrismaClient();

export default PageMainClass;

export const getStaticProps: GetStaticProps = async () => {
  let sampleClasses = await prisma.class.findMany({
    where: { sample: true },
    select: {
      name: true,
      description: true,
      id: true,
      sample: true,
      userId: true,
    },
  });

  return {
    props: {
      myClasses: [],
      sampleClasses,
    },
  };
};
