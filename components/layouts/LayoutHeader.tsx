import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
// import DarkMode from "../elements/DarkMode";

const DynamicUserMenu = dynamic(() => import("../elements/UserHeaderPop"), {
  ssr: false,
});
const DynamicDarkMode = dynamic(() => import("../elements/DarkMode"), {
  ssr: false,
});

function LayoutHeader() {
  return (
    <div className="">
      <section className="container_ flex_ justify-between ">
        <header>
          <h1>
            <Link prefetch={true} href="/">
              tasky
            </Link>
          </h1>
        </header>
        <nav className="">
          <ol className="flex_ ">
            <li>
              <Link href="/class">classes</Link>
            </li>
            <li>
              <Link href="/template">templates</Link>
            </li>
          </ol>
        </nav>
        <footer className="flex_">
          {/* <DarkMode /> */}
          <DynamicDarkMode />
          <DynamicUserMenu />
        </footer>
      </section>
    </div>
  );
}

export default LayoutHeader;
