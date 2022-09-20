import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  classApiDeleteclass,
  classApiGetClass,
  classApiRenameClass,
  classApiUpdateClass,
} from "./classApi";

type props = {
  id: String;
};

export default function useClass(classId: string) {
  const client = useQueryClient();
  const { user } = useUser();
  const userClass = useQuery(
    ["class", classId],
    async () => await classApiGetClass(classId)
  );

  const renameClass = useMutation(classApiRenameClass, {
    onSuccess: (renamedClass) => {
      client.setQueryData(["class", classId], (prevClass) => {
        return { ...prevClass, name: renamedClass?.name };
      });
    },
  });

  const updateClass = useMutation(classApiUpdateClass, {
    onSuccess: (updatedClass) => {
      client.setQueryData(["classes", user], (classes) =>
        classes.map((c) =>
          c?.id == updatedClass?.id ? { ...c, ...updatedClass } : c
        )
      );
    },
  });

  const deleteClass = useMutation(classApiDeleteclass, {
    onSuccess: (deletedClass) => {
      client.setQueryData(["classes", user], (classes) =>
        classes.filter((c) => c.id !== deletedClass?.id)
      );
    },
  });

  return {
    userClass,
    renameClass: renameClass.mutate,
    updateClass: updateClass.mutate,
    deleteClass: deleteClass.mutate,
  };
}
