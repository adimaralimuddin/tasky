import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import WorkPage from "../../components/work/WorkPage";
const prisma = new PrismaClient();

export default WorkPage;

export async function getStaticPaths() {
  const classes = await prisma.class.findMany({ select: { id: true } });

  const paths = classes?.map((class_) => ({
    params: { classId: class_?.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;

  const classId = String(params?.classId);
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
    const folders = await prisma.folder.findMany({
      where: { classId },
      select: {
        id: true,
        userId: true,
        classId: true,
        name: true,
        sample: true,

        Topic: {
          select: {
            id: true,
            description: true,
            folderId: true,
            name: true,
            sample: true,
            templateId: true,
            userId: true,
            Template: {
              select: {
                id: true,
                userId: true,
                name: true,
                sample: true,

                backs: true,
                fronts: true,
              },
            },
            cards: {
              select: {
                id: true,
                classId: true,
                userId: true,
                topicId: true,
                ind: true,
                name: true,
                description: true,
                level: true,
                category: true,
                sample: true,
                fronts: true,
                backs: true,
              },
            },
          },
        },
      },
    });
    return folders;
  }

  const pageInitialData = { dashboard, folders, class_ };

  return {
    props: { pageInitialData },
    revalidate: 10,
  };
};
