// import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function test() {
  return <div>hello doog</div>;
}
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // Getting user data from Auth0
    const user = getSession(ctx?.req, ctx?.res)?.user;

    console.log("user ", user);
    //returns an object like this one: {name: 'Bob', email: 'bob@email.com', email_verified: true}

    //Querying data from DB
    // const { db } = await connectToDatabase();
    // const data = await db
    //   .collection("users")
    //   .find({ email: user.email })
    //   .project({ first_name: 1 })
    //   .toArray();

    return {
      props: { properties: "hello" },
    };
  },
});
