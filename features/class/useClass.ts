import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classApiGetClass, classApiRenameClass } from "./classApi";

type props = {
  id: String;
};

export default function useClass(classId: any) {
  const client = useQueryClient();
  const userClass = useQuery(
    ["class", classId],
    async () => await classApiGetClass(classId)
  );

  const classRenamer = useMutation(classApiRenameClass, {
    onSuccess: (renamedClass) => {
      client.setQueryData(["class", classId], (prevClass: any) => {
        return { ...prevClass, name: renamedClass?.name };
      });
    },
  });

  return {
    userClass,
    classRenamer,
    renameClass: classRenamer.mutate,
  };
}
