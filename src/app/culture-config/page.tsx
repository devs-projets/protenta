"use client";

import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleDatePiker } from "@/components/view/SimpleDatePicker";
import { addCulture } from "@/lib/culture/newCulture";
import { getAllSerres } from "@/lib/serre/getAllSerres";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [cultureName, setCultureName] = useState<string>("");
  const [cultureType, setCultureType] = useState<string>("");
  const [cultureVariety, setCultureVariety] = useState<string>("");
  const [cultureDescription, setCultureDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [serres, setSerres] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const { access_token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const getSerres = async () => {
    if (!access_token) {
      console.error("Access token is null");
      return;
    }

    try {
      const response = await getAllSerres(access_token);
      setSerres(response[0]);
    } catch (err) {
      console.error("An error occurred while fetching serres data", err);
      setError(
        "Une erreur est survenue lors de la récupération des données de la serre."
      );
    }
  };

  useEffect(() => {
    getSerres();
  }, []);

  useEffect(() => {
    if (serres && serres.allCulture.length > 0) {
      router.push("/dashboard");
    }
  }, [serres]);

  const clearStates = () => {
    setCultureName("");
    setCultureType("");
    setCultureVariety("");
    setCultureDescription("");
    setSelectedDate(undefined);
  };

  const handleNewCulture = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serres || !access_token) {
      throw Error("Information  sur la serre ou l'utilisateur manquant !");
    }

    try {
      const data = {
        name: cultureName,
        variety: cultureVariety,
        type: cultureType,
        description: cultureDescription,
        startProduction: selectedDate?.toString(),
        estimationDate: 90,
      };

      const serreId = serres.id;

      // TODO: Passer le bon id de la serre
      const response = await addCulture(access_token, serreId, data);

      if (response) {
        clearStates();
        alert("Culture ajoutée avec succès !");
        router.push("/dashboard");
      } else {
        alert("Erreur lors de l'ajout de la culture.\nVeuillez réessayer !");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la culture :", error);
      alert("Erreur lors de l'ajout de la culture.");
    }

    clearStates();
  };

  if (!serres || !access_token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div
        className="min-h-96 min-w-96 flex flex-col justify-between rounded-lg bg-white p-3"
        style={{ boxShadow: "0px 0px 15px black" }}
      >
        <form onSubmit={handleNewCulture} className="flex flex-col gap-5">
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
              onChange={(e) => setCultureName(e.target.value)}
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
              onChange={(e) => setCultureType(e.target.value)}
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
              onChange={(e) => setCultureVariety(e.target.value)}
            />
          </div>
          <div className="">
            <Label htmlFor="description" className="text-lg">
              Description
            </Label>
            <Textarea
              placeholder="Description de la culture ..."
              className="resize-none text-lg"
              onChange={(e) => setCultureDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="description" className="text-lg">
              Date de Début
            </Label>
            <SimpleDatePiker onDateChange={setSelectedDate} />
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary w-full p-2 text-white rounded-lg block text-center mb-3 mt-2"
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
