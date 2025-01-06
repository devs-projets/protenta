"use client";

import { RootState } from "@/store/store";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const NoActiveCultureAlert = () => {
  const { activeCulture } = useSelector((state: RootState) => state.serre);

  if (!activeCulture) {
    return null
  }

  return (
    <div className="p-3 bg-red-200 flex justify-center items-center w-full gap-3">
      <TriangleAlert size={20} /><p>Pas de culture en cours</p>
    </div>
  );
};

export default NoActiveCultureAlert;
