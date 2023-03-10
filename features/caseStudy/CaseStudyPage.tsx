import React from "react";
import LayoutMainHeader from "../../components/layouts/LayoutMainHeader";

function CaseStudyPage() {
  return (
    <div>
      <LayoutMainHeader />
      <div className="container max-w-6xl mx-auto w-full col_ items-center justify-center h-[90vh] ring-1d flex-1 leading-none">
        <h1 className="font-bold text-[2rem] text-indigo-500d text-prime">
          Case Study
        </h1>
        <h2 className="font-semibold text-[1.5rem] text-green-400d text-accent">
          under development
        </h2>
        <div className="leading-normal py-4 text-center">
          <h3 className="text-sec">
            i'm deciding to add a case study page for this project.
          </h3>
          <h3 className="text-sec">
            so I'm Currently developing and writing documents for the case
            study.
          </h3>
          <h3 className="text-phar py-4">
            
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyPage;
