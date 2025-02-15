"use client";

import React from "react";
import SerresList from "@/components/serre/SerresList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Serres = () => {
  const { serres } = useSelector((state: RootState) => state.serre);
  console.log(serres)
  return (
    <div>
      <div className="flex justify-between items-center px-5 mt-5">
        <div>
          <h1 className="text-3xl font-bold">Liste des serres</h1>
        </div>
      </div>

      <div className="my-2">
        <hr />
      </div>

      <SerresList serres={serres ?? []} />
    </div>
  );
};

export default Serres;
