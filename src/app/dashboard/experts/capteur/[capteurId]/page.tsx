"use client";

import MoyennesCardList from "@/components/MoyennesCardList";
import IndividualCapteurCard from "@/components/view/IndividualCapteurCard";
import IndividualCapteurLogs from "@/components/view/IndividualCapteurLogs";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const param = useParams().capteurId;
  const decodedParam = decodeURIComponent(param as string);
  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-5">{decodedParam}</h1>
      <IndividualCapteurCard />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <MoyennesCardList />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="bg-muted/50 rounded-xl p-5 mb-5">
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                <IndividualCapteurLogs decodedParam={decodedParam} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
