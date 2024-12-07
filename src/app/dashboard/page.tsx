"use client";

import ActionnaireTemoin from "@/components/actionnaires/ActionnaireTemoin";
import MoyennesCardList from "@/components/MoyennesCardList";
import { MoyenneTabs } from "@/components/moyennes/MoyenneTab";
import React, { useState } from "react";

const Experts = () => {
  const [visualisationPeriode, setVisualisationPeride] =
    useState<string>("Heures");

  const getButtonClass = (option: string) =>
    `px-4 py-2 rounded-lg block min-w-20 text-center cursor-pointer ${
      visualisationPeriode === option
        ? "bg-primary text-white"
        : "border border-primary"
    }`;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <h1 className="text-center text-2xl font-bold">Moyennes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <MoyennesCardList />
      </div>

      <ActionnaireTemoin />

      <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
        <div className="h-full overflow-y-auto">
          <div className="flex justify-end gap-2 mb-3 items-center">
            <div>
              <p>Visuliser les données en :</p>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <span
                onClick={() => setVisualisationPeride("Heures")}
                className={getButtonClass("Heures")}
              >
                Heures
              </span>
              <span
                onClick={() => setVisualisationPeride("Jours")}
                className={getButtonClass("Jours")}
              >
                Jours
              </span>
            </div>
          </div>
          <MoyenneTabs visualisationPeriode={visualisationPeriode} />
        </div>
      </div>
    </div>
  );
};

export default Experts;
