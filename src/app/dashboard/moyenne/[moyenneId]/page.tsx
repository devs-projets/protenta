import IndividualMoyenneCard from "@/components/view/IndividualMoyenneCard";
import IndividualMoyenneChart from "@/components/view/IndividualMoyenneChart";
import React from "react";

const MoyenneId = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <IndividualMoyenneCard />
      <IndividualMoyenneChart />
    </div>
  );
};

export default MoyenneId;
