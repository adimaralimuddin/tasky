import React from "react";
import LayoutMainHeader from "../../components/layouts/LayoutMainHeader";
import useWork from "../../features/work/useWork";

export default function index() {
  const { work } = useWork();
  console.log(work);
  return (
    <div>
      <LayoutMainHeader />
      <div>let's play time</div>
    </div>
  );
}
