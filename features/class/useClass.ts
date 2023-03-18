import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { classApiRenameClass, ClassUrl } from "./classApi";

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

  const isSampleClass = ()=>{
    
  }

  return {
    userClass,
    classRenamer,
    renameClass: classRenamer.mutate,
  };
}

export async function classApiGetClass(id: string) {
  const q = gql`
    query Class($id: String!) {
      class(id: $id) {
        id
        name
        description
        sample
        folders {
          id
          name
        }
      }
    }
  `;
  const res = await request(ClassUrl, q, { id });
  return res?.class;
}
