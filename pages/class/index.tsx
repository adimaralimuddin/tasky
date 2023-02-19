// import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import PageMainClass from "../../components/class/ClassPage";
// import { initUser } from "../../lib/initUser";

export default PageMainClass;

// export default function ClassMainPage() {
//   return <div>super fast page</div>;
// }

export const getStaticProps = async () => {
  // const defClass = process.env.DEF_CLASS;

  return {
    props: {},
  };
};

export const config = {
  unstable_runtimeJS: false,
};

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     // const session = getSession(ctx.req, ctx.res);
//     const defClass = process.env.DEF_CLASS;
//     // await initUser(session?.user);
//     return {
//       props: {
//         defClass,
//       },
//     };
//   },
// });

// export const getStaticProps = withPageAuthRequired({

// })
