"use client";

import ActionnaireTemoin from "@/components/actionnaires/ActionnaireTemoin";
import MoyennesCardList from "@/components/MoyennesCardList";
import { MoyenneTabs } from "@/components/moyennes/MoyenneTab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Experts = () => {
  const { data: hourData } = useSelector((state: RootState) => state.minuteData);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <h1 className="text-center text-2xl font-bold">Moyennes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {/* <MoyennesCardList sensorData={hourData} /> */}
        <MoyennesCardList />
      </div>

      <ActionnaireTemoin />

      <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
        <div className="h-full overflow-y-auto">
          <MoyenneTabs sensorData={hourData} />
        </div>
      </div>
    </div>
  );
};

export default Experts;
