import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import PageMainClass from "../../components/class/ClassPage";
import { initUser } from "../../lib/initUser";

export default PageMainClass;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const defClass = process.env.DEF_CLASS;
    await initUser(session?.user);
    return {
      props: {
        defClass,
      },
    };
  },
});
