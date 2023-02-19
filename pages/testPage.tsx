import React from "react";

function testPage(p) {
  console.log(p);
  return <div>testPage</div>;
}

testPage.Layout = MyLayout;

function MyLayout({ children }: any) {
  return (
    <div>
      layout
      <div>{children}</div>
    </div>
  );
}

testPage.getLayout = function getLayout(page) {
  return (
    <div>
      <h1>par layout</h1>
      <MyLayout>{page}</MyLayout>
    </div>
  );
};

export default testPage;
