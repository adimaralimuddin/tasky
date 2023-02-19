import PageMainHome from "../components/pagesMain/PageMainHome";

interface HomeProps {
  defClass: string;
}
export default function Home({ defClass }: HomeProps) {
  return <PageMainHome defClass={defClass} />;
}

export const getStaticProps = () => {
  const defClass = process.env.DEF_CLASS;
  return {
    props: {
      defClass: defClass || null,
    },
  };
};
