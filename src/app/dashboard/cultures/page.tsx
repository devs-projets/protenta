"use client";

import Spinner from "@/components/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleDatePiker } from "@/components/view/SimpleDatePicker";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { addCulture } from "@/lib/culture/newCulture";
import { getAllSerres } from "@/lib/serre/getAllSerres";
import { RootState } from "@/store/store";
import { User } from "@/types/user";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cultures = [
  {
    id: 1,
    name: "Culture A",
    start: "01-01-2024",
    end: "01-06-2024",
    status: "Cloturé",
  },
  {
    id: 2,
    name: "Culture B",
    start: "05-01-2023",
    end: "05-06-2023",
    status: "Cloturé",
  },
  {
    id: 3,
    name: "Culture C",
    start: "02-02-2024",
    end: "02-07-2024",
    status: "Cloturé",
  },
  {
    id: 4,
    name: "Culture D",
    start: "03-01-2023",
    end: "03-06-2023",
    status: "Cloturé",
  },
  {
    id: 5,
    name: "Culture E",
    start: "04-01-2024",
    end: "04-06-2024",
    status: "Cloturé",
  },
  {
    id: 6,
    name: "Culture F",
    start: "06-01-2023",
    end: "06-06-2023",
    status: "Encours",
  },
];

const Page = () => {
  const [cultureName, setCultureName] = useState<string>("");
  const [cultureType, setCultureType] = useState<string>("");
  const [cultureVariety, setCultureVariety] = useState<string>("");
  const [cultureDescription, setCultureDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [newCulture, setNewCulture] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [serres, setSerres] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const { access_token } = useSelector((state: RootState) => state.auth);

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
  }, [newCulture]);

  console.log(serres);

  const clearStates = () => {
    setCultureName("");
    setCultureType("");
    setCultureVariety("");
    setCultureDescription("");
    setSelectedDate(undefined);
  };

  const handleNewCulture = async () => {
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
        setNewCulture(true);
        clearStates();
        setIsDialogOpen(false);
        alert("Culture ajoutée avec succès !");
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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center px-5 mt-5">
        <h1 className="text-3xl font-bold">Liste des cultures</h1>
        <div className="flex items-center gap-3">
          <span>Ajouter une culture</span>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger className="bg-primary text-white px-3 py-2 rounded-lg">
              <Plus />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Ajouter une nouvelle culture
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Veuillez remplir les informations nécessaires pour ajouter une
                  nouvelle culture à votre liste.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form className="flex flex-col gap-5">
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
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <button
                  type="button"
                  onClick={handleNewCulture}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Ajouter
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="my-2">
        <hr />
      </div>

      {/* Cards Container */}
      <div className="flex flex-wrap gap-5 p-5">
        {serres.allCulture.map((culture: any) => {
          const cultureStartDate = new Date(culture);
          return (
            <Link
              href={`/dashboard/cultures/${culture.id}`}
              key={culture.id}
              className="w-[280px] bg-secondary relative p-5 rounded-lg shadow-lg border cursor-pointer hover:shadow-xl"
            >
              {/* Badge */}
              <span
                className={`absolute top-0 right-0 rounded-lg px-3 py-1 ${
                  !culture.productionIsEnded
                    ? "bg-primary text-white"
                    : "bg-gray-300"
                }`}
              >
                {!culture.productionIsEnded ? "Encours" : "Cloturé"}
              </span>

              {/* Card Content */}
              <h2 className="text-2xl font-bold mt-4">{culture.name}</h2>
              <p>
                Début : {new Date(culture.startProduction).toLocaleDateString()}
              </p>
              <p>{culture.productionIsEnded && `Fin : ${culture.end}`}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
