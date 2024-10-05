import CustomHead from "@/UI/customHead";
import React from "react";

export default function ClinicallyTested({ howToUse , highLight }: { howToUse: string[], highLight: string[] | undefined }) {
  return (
    <div className="my-6 grid md:gap-0 gap-2">
      <div className="">
        <CustomHead name="HighLights" className="w-10/12" />
        <ul className="text-[#4A3F3F] grid md:gap-2 gap-2 list-disc pl-4 md:text-lg text-sm w-full font-normal">
          {highLight?.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div className="">
        <CustomHead name="How To Use" className="w-10/12" />
        <ul className="text-[#4A3F3F] grid md:gap-2 gap-2 list-disc pl-4 md:text-lg text-sm w-full font-normal">
          {howToUse.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div>
        
      </div>
    </div>
  );
}
