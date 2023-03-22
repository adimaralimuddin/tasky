import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import AppLogo from "../elements/AppLogo";
import DarkMode_ from "../elements/DarkMode";
import UserHeaderPop from "../elements/UserHeaderPop";

import HomeHeroSection from "./HomeHeroSection";

function PageMainHome({ defClass: _ }: { defClass: string }) {
  const defClass = "y5Q03_vLtDd_ZEhSQS8oA";
  return (
    <div className="flex flex-col  min-h-screen bg-whited bg-[#F9FBFF] dark:bg-slate-800 overflow-x-hidden ">
      <Head>
        <title>Tasky</title>
      </Head>
      <header className="flex_ justify-between  max-w-6xl container w-full mx-auto p-2 z-[800]">
        <AppLogo className="text-[1.5rem] " />
        <nav className="flex_ dark:text-slate-300 px-6">
          <Link href="/case-study">
            <h3 className="text-[1.1rem] font-semibold cursor-pointer hover:text-indigo-400 dark:hover:text-pink-300">
              Case Study
            </h3>
          </Link>
          {/* <h3 className="text-[1rem] font-semibold">EXPLORE</h3> */}
          <UserHeaderPop />
          <DarkMode_ />
        </nav>
      </header>
      <div className="container max-w-6xl mx-auto w-full">
        <HomeHeroSection defClass={defClass} />
      </div>
    </div>
  );
}

export default PageMainHome;
