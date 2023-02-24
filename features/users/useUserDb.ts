import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";

function useUserDb() {
  const { user } = useUser();

  const userQuery = useQuery(["userdb", user?.sub], () =>
    getUserApi({ userId: user?.sub })
  );

  return {
    userData: userQuery.data,
    ...userQuery,
  };
}

export default useUserDb;

const getUserApi = async ({
  userId,
}: {
  userId: string | undefined | null;
}) => {
  const q = gql`
    query UserByDbid($userId: String!) {
      user(id: $userId) {
        dbid
        email
        id
        name
      }
    }
  `;

  const ret = await request(DBURL, q, { userId });

  return ret?.user;
};
