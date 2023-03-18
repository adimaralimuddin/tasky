import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import { FolderType } from "./folderTypes";

export default function useFolders(classId: string | any) {
  const folder = useQuery(
    ["folder", classId],
    async () => await folderApiGetFoldersByClassId(classId),
    {
      onSuccess(data) {
        // console.log(`folders got `, data);
      },
      onError(err) {
        console.log(
          `Error:
        @useFolder
        msg: `,
          err
        );
      },
    }
  );

  return {
    ...folder,
  };
}

export async function folderApiGetFoldersByClassId(
  classId: string
): Promise<FolderType[]> {
  const q = gql`
    query FoldersByClass($classId: String!) {
      foldersByClass(classId: $classId) {
        name
        id
        sample
        userId
        classId
      }
    }
  `;
  const ret = await request(DBURL, q, { classId });
  return ret.foldersByClass;
}
