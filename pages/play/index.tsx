import React from "react";
import LayoutMainHeader from "../../components/layouts/LayoutMainHeader";
import useWork from "../../features/work/useWork";

export default function Index() {
  const { work } = useWork();
  return (
    <div>
      <LayoutMainHeader />
      <div>let's play time</div>
    </div>
  );
}
