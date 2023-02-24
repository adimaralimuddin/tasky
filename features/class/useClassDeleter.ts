import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ClassUrl } from "./classApi";
import { ClassType } from "./classTypes";

export default function useClassDeleter() {
  const { user } = useUser();
  const client = useQueryClient();

  const classDeleter = useMutation(classApiDeleteclass, {
    onMutate(deletedId) {
      try {
        client.setQueryData(["classes", user?.sub], (prevClasses: any) => {
          if (prevClasses?.length) {
            return prevClasses.filter((c: ClassType) => c.id !== deletedId);
          }
        });
      } catch (error) {
        console.log(`Error: class deleterf on mutate`, error);
      }
    },
    onSuccess(deletedClass) {
      client.setQueryData(["classes", user], (classes: any) =>
        classes.filter((c: ClassType) => c.id !== deletedClass?.id)
      );
    },
  });
  return {
    ...classDeleter,
    deleteClass: classDeleter.mutate,
  };
}

export async function classApiDeleteclass(classId: string) {
  const q = gql`
    mutation DeleteClass($classId: String!) {
      deleteClass(classId: $classId) {
        id
        name
        userId
        description
      }
    }
  `;
  const ret = await request(ClassUrl, q, { classId });
  console.log(`class deleted`, ret?.deleteClass);

  return ret?.deleteClass;
}
