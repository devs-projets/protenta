"use client"

import IndividualMoyenneCard from "@/components/view/IndividualMoyenneCard";
import IndividualMoyenneChart from "@/components/view/IndividualMoyenneChart";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const MoyenneId = () => {
  const {data: hourData} = useSelector((state: RootState) => state.hourData);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <IndividualMoyenneCard data={hourData} />
      <IndividualMoyenneChart data={hourData} />
    </div>
  );
};

export default MoyenneId;
