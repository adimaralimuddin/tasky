import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { FolderUrl } from "./folderApi";

export default function useFolder(classId: string | any) {
  const folder = useQuery(
    ["folder", classId],
    async () => await folderApiGetFoldersByClassId(classId)
  );

  return {
    ...folder,
  };
}

export async function folderApiGetFoldersByClassId(classId: string) {
  const q = gql`
    query FoldersByClass($classId: String!) {
      foldersByClass(classId: $classId) {
        name
        id
        sample
        userId
      }
    }
  `;
  const ret = await request(FolderUrl, q, { classId });
  console.log("folders ", ret);
  return ret.foldersByClass;
}
