"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleDatePiker } from "@/components/view/SimpleDatePicker";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setHasInteracted(true);
  };

  console.log(selectedDate)
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div
        className="min-h-96 min-w-96 flex flex-col justify-between rounded-lg bg-white p-3"
        style={{ boxShadow: "0px 0px 15px black" }}
      >
        <form className="flex flex-col gap-5">
          <h1 className="text-center font-bold text-2xl mb-5">
            Configurer votre culture
          </h1>
          <div className="text-xl">
            <Label htmlFor="nom" className="text-lg">
              Nom
            </Label>
            <Input
              id="nom"
              type="text"
              placeholder="Nom de la culture"
              required
              className="text-lg"
            />
          </div>
          <div className="">
            <Label htmlFor="type" className="text-lg">
              Type
            </Label>
            <Input
              id="type"
              type="text"
              placeholder="Type de la culture"
              required
              className="text-lg"
            />
          </div>
          <div className="">
            <Label htmlFor="variete" className="text-lg">
              Variété
            </Label>
            <Input
              id="variete"
              type="text"
              placeholder="Variété de la culture"
              required
              className="text-lg"
            />
          </div>
          <div className="">
            <Label htmlFor="description" className="text-lg">
              Description
            </Label>
            <Textarea
              placeholder="Description de la culture ..."
              className="resize-none text-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 items-center justify-center">
            <div className="">
              <Label htmlFor="description" className="text-lg">
                Date de Début
              </Label>
              <SimpleDatePiker onDateChange={setSelectedDate}/>
            </div>
            <div className="text-primary flex justify-center items-center">
              {selectedDate ? (
                <div>
                  <Label htmlFor="description">Date estimée de fin</Label>
                  <p>Le 31/12/2024</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <Link
              href={"/dashboard"}
              className="bg-primary w-full p-2 text-white rounded-lg block text-center mb-3 mt-2"
            >
              Suivant
            </Link>
            {/* <button className="bg-primary w-full p-2 text-white rounded-lg">
              Suivant
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
