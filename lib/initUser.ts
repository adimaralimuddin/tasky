import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import request, { gql } from "graphql-request";

export const initUserData = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    initUser(session?.user);
    return {
      props: {},
    };
  },
});

export async function initUser(user: any) {
  const userQ = gql`
    query Query($userId: String!) {
      user(id: $userId) {
        name
        id
        email
      }
    }
  `;
  const res = await request("http://localhost:3000/api/graphql", userQ, {
    userId: user?.sub,
  });

  if (res.user) {
    console.log("has user ", res.user);
  } else {
    console.log("no user yet creating.....");
    const q = gql`
      mutation Mutation(
        $createUserId: String!
        $name: String!
        $email: String!
      ) {
        createUser(id: $createUserId, name: $name, email: $email) {
          name
          email
          id
        }
      }
    `;

    const res = await request("http://localhost:3000/api/graphql", q, {
      createUserId: user.sub,
      name: user.name,
      email: user.email,
    });

    console.log("successfully created new user ", res.createUser);
  }
}
