import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import TemplatePage from "../../components/template/TemplatePage";
import { initUser } from "../../lib/initUser";

export default TemplatePage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const defTempId = process.env.DEF_TEMP;
    const session = getSession(ctx.req, ctx.res);
    await initUser(session?.user);
    return {
      props: { defTempId },
    };
  },
});
