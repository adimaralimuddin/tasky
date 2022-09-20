import { getSession } from "@auth0/nextjs-auth0";
import WorkPage from "../../components/work/WorkPage";
import { initUser } from "../../lib/initUser";

export default WorkPage;

// export const getServerSideProps = initUserData;

export async function getServerSideProps(ctx) {
  const session = getSession(ctx.req, ctx.res);
  initUser(session?.user);
  return {
    props: {},
  };
}
