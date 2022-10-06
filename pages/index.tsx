import type { NextPage } from "next";
import PageMainHome from "../components/pagesMain/PageMainHome";

const Home: NextPage = ({ defClass }: any) => {
  return <PageMainHome defClass={defClass} />;
};

export default Home;

export const getServerSideProps = () => {
  const defClass = process.env.DEF_CLASS;
  return {
    props: {
      defClass,
    },
  };
};
