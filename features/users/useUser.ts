import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const userId = "cl6uancai0022mcjo96jb051y";

export default function useUser() {
  const query = useQuery(["users"], () => getUsers(userId));
  return query;
}

const getUsers = async (userId: string) => {
  const res = await request("/api/graphql", query, { userId });
  return res?.user;
};

const query = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      name
      email
      id
      dbid
      class {
        name
      }
    }
  }
`;
