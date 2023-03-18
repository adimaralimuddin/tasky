import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";

function useUserById() {
  const { user } = useUser();

  const userQuery = useQuery(
    ["userdb", user?.sub],
    () => getUserByIdApiReq({ userId: user?.sub }),
    {
      onError(err) {
        console.log(
          `Error:
        @useUserById
        msg: `,
          err
        );
      },
    }
  );

  return {
    userData: userQuery.data,
    ...userQuery,
  };
}

export default useUserById;

const getUserByIdApiReq = async ({
  userId,
}: {
  userId: string | undefined | null;
}) => {
  const q = gql`
    query UserByIdQuery($userId: String!) {
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
