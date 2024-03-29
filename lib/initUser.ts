import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import request, { gql } from "graphql-request";
const url = process.env.AUTH0_BASE_URL + "/api/graphql";
export const initUserData = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    await initUser(session?.user);
    return {
      props: {},
    };
  },
});

export async function initUser(user: any) {
  const gotUser = await fetchUser(user);

  if (gotUser.user) {
    console.log("has user ", gotUser?.user);
  } else {
    console.log("no user yet, creating new user data .....");
    createNewUser(user);
  }
}

async function fetchUser(user: any) {
  const userQ = gql`
    query Query($userId: String!) {
      user(id: $userId) {
        name
        id
        email
      }
    }
  `;
  const res = await request(url, userQ, {
    userId: user?.sub,
  });
  return res;
}

async function createNewUser(user: any) {
  const q = gql`
    mutation Mutation($createUserId: String!, $name: String!, $email: String!) {
      createUser(id: $createUserId, name: $name, email: $email) {
        name
        email
        id
      }
    }
  `;
  const res = await request(url, q, {
    createUserId: user.sub,
    name: user.name,
    email: user.email,
  });

  console.log("successfully created new user data ", res.createUser);
}
