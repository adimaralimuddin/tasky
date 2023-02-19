// import React from 'react'
import DashboardMainContent from "../../../components/dashboard/DashboardMainContent";
import WorkLayout from "./workLayout";

function index() {
  // return DashboardMainContent;
  return (
    <div>
      dashboard here
      <DashboardMainContent />
    </div>
  );
}



index.getLayout = WorkLayout;

export default index;
