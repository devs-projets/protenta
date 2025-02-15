"use client"

import IndividualMoyenneCard from "@/components/moyennes/IndividualMoyenneCard";
import IndividualMoyenneChart from "@/components/moyennes/IndividualMoyenneChart";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const MoyenneId = () => {
  const {data: hourData} = useSelector((state: RootState) => state.hourData);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <IndividualMoyenneCard data={hourData} />
      <IndividualMoyenneChart />
    </div>
  );
};

export default MoyenneId;
