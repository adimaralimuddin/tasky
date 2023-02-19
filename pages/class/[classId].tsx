// import { getSession } from "@auth0/nextjs-auth0";
// import { NextApiRequest, NextApiResponse } from "next";
import WorkPage from "../../components/work/WorkPage";
// import { initUser } from "../../lib/initUser";

export default WorkPage;
export const config = {
  unstable_runtimeJS: false,
};
// export const getStaticProps = async () => {
//   const defTempId = process.env.DEF_TEMP;

//   return {
//     props: { defTempId },
//   };
// };

// export async function getServerSideProps(ctx: {
//   req: NextApiRequest;
//   res: NextApiResponse;
// }) {
//   const defTempId = process.env.DEF_TEMP;
//   const session = getSession(ctx?.req, ctx?.res);
//   initUser(session?.user);
//   return {
//     props: { defTempId },
//   };
// }
