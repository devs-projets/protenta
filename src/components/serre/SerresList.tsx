"use client";

import Link from "next/link";
import React from "react";
import serreIcon from "@/assets/icons/serre.svg";
import { ISerre } from "@/types/serre";

const SerresList = ({ serres }: { serres: ISerre[] }) => {
  console.log(serres);

  return (
    <div className="p-5 flex flex-wrap gap-8">
      {serres &&
        serres.map((_, index) => (
          <div
            key={index}
            className="flex flex-col max-w-xs rounded-lg items-center border shadow-xl bg-secondary hover:shadow-2xl"
          >
            <div className="flex justify-center bg-white p-5 rounded-tl-lg rounded-tr-lg">
              <img src={serreIcon.src} className="w-1/2" />
            </div>
            <div className="w-full p-3">
              <h2 className="text-2xl font-bold">Serre 1</h2>
              {/* <p className="text-lg">Serre descritption</p> */}
              <p className="text-lg">Culture active : Culture 1</p>
              <Link
                href={"#"}
                className="bg-primary block px-4 py-2 text-center text-white rounded-lg mt-3"
              >
                Ouvrire la serre
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SerresList;
