import request, { gql } from "graphql-request";

const url = "/api/graphql";

export async function folderApiGetFoldersByClassId(classId: string) {
  const q = gql`
    query FoldersByClass($classId: String!) {
      foldersByClass(classId: $classId) {
        name
        id
        sample
      }
    }
  `;
  const ret = await request(url, q, { classId });
  return ret.foldersByClass;
}

export async function folderApiAddFolder({
  classId,
  name,
}: {
  classId?: string;
  name: string;
}) {
  const q = gql`
    mutation CreateFolder($name: String!, $classId: String!) {
      createFolder(name: $name, classId: $classId) {
        id
        name
        sample
      }
    }
  `;

  const ret = await request(url, q, { classId, name });
  return ret.createFolder;
}

export async function folderApideleteFolder(deleteFolderId: string) {
  const q = gql`
    mutation DeleteFolder($deleteFolderId: String!) {
      deleteFolder(id: $deleteFolderId) {
        id
        name
        sample
      }
    }
  `;

  const ret = await request(url, q, { deleteFolderId });
  return ret.deleteFolder;
}

export async function folderApiRenameFolder(args: {
  folderId: string;
  name: string;
}) {
  const q = gql`
    mutation RenameFolder($folderId: String!, $name: String!) {
      renameFolder(folderId: $folderId, name: $name) {
        id
        name
        sample
      }
    }
  `;
  const ret = await request(url, q, args);
  return ret.renameFolder;
}
