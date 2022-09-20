import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const userId = "cl6uancai0022mcjo96jb051y";

const query = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      name
      email
      id
      class {
        name
      }
    }
  }
`;

const getUsers = async (userId: string) => {
  const res = await request("/api/graphql", query, { userId });
  return res?.user;
};

export default function useUser() {
  const query = useQuery(["users"], () => getUsers(userId));

  return query;
}
