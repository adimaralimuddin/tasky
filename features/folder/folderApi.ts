import request, { gql } from "graphql-request";

const url = "/api/graphql";

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
  const ret = await request(url, q, { classId });
  return ret.foldersByClass;
}

export async function folderApiAddFolder({
  classId,
  name,
  userId,
}: {
  classId?: string;
  name: string;
  userId: string;
}) {
  console.log("to add folder", { classId, name, userId });
  const q = gql`
    mutation CreateFolder($classId: String!, $userId: String!, $name: String!) {
      createFolder(classId: $classId, userId: $userId, name: $name) {
        id
        classId
        name
        userId
      }
    }
  `;
  const ret = await request(url, q, { classId, name, userId });
  return ret.createFolder;
}

export async function folderApideleteFolder({
  userId,
  deleteFolderId,
}: {
  userId: string;
  deleteFolderId: string;
}) {
  const q = gql`
    mutation Mutation($userId: String!, $deleteFolderId: String!) {
      deleteFolder(userId: $userId, id: $deleteFolderId) {
        name
        id
        sample
        userId
      }
    }
    # mutation DeleteFolder($deleteFolderId: String!) {
    #   deleteFolder(id: $deleteFolderId) {
    #     id
    #     name
    #     sample
    #   }
    # }
  `;

  const ret = await request(url, q, { deleteFolderId, userId });
  return ret.deleteFolder;
}

export async function folderApiRenameFolder(args: {
  folderId: string;
  name: string;
  userId: string;
}) {
  const q = gql`
    mutation Mutation($userId: String!, $folderId: String!, $name: String!) {
      renameFolder(userId: $userId, folderId: $folderId, name: $name) {
        id
        name
        sample
        userId
      }
    }
  `;
  const ret = await request(url, q, args);
  return ret.renameFolder;
}
