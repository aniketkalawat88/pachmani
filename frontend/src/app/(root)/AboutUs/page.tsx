import React from "react";
import AboutComp from "@/components/AboutComp/page";
import AllProductComp from "@/components/AllProductComp/page";
import AboutBenefits from "@/components/AboutBenefits/page";
import AboutExperts from "@/components/AboutExperts/page";

export default function AboutUs() {
  return (
    <div>
      <AboutComp name="About Us"/>
      <div className="w-full h-full max-w-7xl mx-auto md:my-20  md:p-0 p-6">
        <AllProductComp />
      </div>
      <AboutBenefits />
      <AboutExperts />
    </div>
  );
}
