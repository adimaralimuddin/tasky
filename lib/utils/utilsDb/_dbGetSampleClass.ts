import prisma from "../../prisma";

async function _dbGetSampleClass(classId: string) {
  const sampleClass = await prisma.class.findFirst({
    where: { id: classId, sample: true },
  });
  return sampleClass;
}

export default _dbGetSampleClass;
