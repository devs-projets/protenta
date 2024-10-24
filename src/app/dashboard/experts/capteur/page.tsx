import Capteurs from "@/components/view/Capteurs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-4xl text-center my-5">Capteurs</h1>
      <div className="flex-1 overflow-y-auto">
        <Capteurs />
      </div>
    </div>
  );
};

export default page;
