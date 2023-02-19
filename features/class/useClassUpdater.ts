import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ClassUrl } from "./classApi";
import { ClassType } from "./classTypes";

export default function useClassUpdater() {
  const client = useQueryClient();

  const { user } = useUser();

  const classUpdater = useMutation(classApiUpdateClass, {
    onMutate({ classId, ...classPayload }) {
      console.log(`here`, classPayload);

      client.setQueryData(["classes", user], (classes: any) =>
        classes.map((c: ClassType) =>
          c?.id == classId ? { ...c, ...classPayload } : c
        )
      );
    },
    onSuccess(updatedClass) {
      client.setQueryData(["classes", user], (classes: any) =>
        classes.map((c: ClassType) =>
          c?.id == updatedClass?.id ? { ...c, ...updatedClass } : c
        )
      );
    },
  });
  return {
    ...classUpdater,
    updateClass: classUpdater.mutate,
  };
}

export async function classApiUpdateClass(data: {
  classId: string;
  name: string;
  description: string;
}) {
  const q = gql`
    mutation UpdateClass(
      $classId: String!
      $name: String
      $description: String
    ) {
      updateClass(classId: $classId, name: $name, description: $description) {
        description
        name
        id
      }
    }
  `;
  const ret = await request(ClassUrl, q, data);
  return ret.updateClass;
}
