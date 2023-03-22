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

type Args = {
  userId: string | undefined | null;
};
const getUserByIdApiReq = async (args: Args) => {
  const q = gql`
    query UserByIdQuery($userId: String) {
      user(userId: $userId) {
        dbid
        email
        id
        name
      }
    }
  `;

  const ret = await request(DBURL, q, args);
  return ret?.user;
};
