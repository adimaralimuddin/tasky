import React from "react";
import LayoutMainHeader from "../components/layouts/LayoutMainHeader";
import { initUserData } from "../lib/initUser";

function home() {
  return (
    <div>
      <LayoutMainHeader />
    </div>
  );
}

export default home;

export const getServerSideProps = initUserData;
