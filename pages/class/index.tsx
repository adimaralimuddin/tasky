export default function classIndex() {
  return <div>hello</div>;
}

export async function getStaticProps(ctx: any) {
  const defClass = process.env.DEF_CLASS;

  return {
    props: {
      defClass: defClass || null,
    },
  };
}

export const config = {
  unstable_runtimeJS: false,
};
