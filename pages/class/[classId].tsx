import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import WorkPage from "../../components/work/WorkPage";
import { initUser } from "../../lib/initUser";

export default WorkPage;

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  initUser(session?.user);
  return {
    props: {},
  };
}
