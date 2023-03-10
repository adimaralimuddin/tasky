import { PrismaClient } from "@prisma/client";
import TemplatePage from "./[userId]";
const prisma = new PrismaClient();

export default TemplatePage;

export const getStaticProps = async () => {
  let sampleServerTemplates = await prisma.template.findMany({
    where: { sample: true },
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

  const props = {
    sampleServerTemplates,
  };

  console.log(`template page templates: `, sampleServerTemplates?.length);
  console.log(`template page serverProps: `, props);

  return { props };
};
