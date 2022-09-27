import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClassType } from "../../components/class/classTypes";
import {
  classApiDeleteclass,
  classApiGetClass,
  classApiRenameClass,
  classApiUpdateClass,
} from "./classApi";

type props = {
  id: String;
};

export default function useClass(classId: any) {
  const client = useQueryClient();
  const { user } = useUser();
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

  const classUpdater = useMutation(classApiUpdateClass, {
    onSuccess: (updatedClass) => {
      client.setQueryData(["classes", user], (classes: any) =>
        classes.map((c: ClassType) =>
          c?.id == updatedClass?.id ? { ...c, ...updatedClass } : c
        )
      );
    },
  });

  const classDeleter = useMutation(classApiDeleteclass, {
    onSuccess: (deletedClass) => {
      client.setQueryData(["classes", user], (classes: any) =>
        classes.filter((c: ClassType) => c.id !== deletedClass?.id)
      );
    },
  });

  return {
    userClass,
    classRenamer,
    classUpdater,
    classDeleter,
    renameClass: classRenamer.mutate,
    updateClass: classUpdater.mutate,
    deleteClass: classDeleter.mutate,
  };
}
