"use client";

import InitialConfig from "@/components/cultures/InitialConfig";
import Spinner from "@/components/Spinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleDatePiker } from "@/components/view/SimpleDatePicker";
import { addCulture } from "@/lib/culture/newCulture";
import { currentSerre } from "@/store/reducers/serre/serreSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ICulture } from "@/types/culture";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [cultureName, setCultureName] = useState<string>("");
  const [cultureType, setCultureType] = useState<string>("");
  const [cultureVariety, setCultureVariety] = useState<string>("");
  const [cultureDescription, setCultureDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [serres, setSerres] = useState<any>();
  const [allCulture, setAllCulture] = useState<ICulture[]>([]);
  const [hasInitConfig, setHasInitConfig] = useState<boolean | null>(null);

  const { access_token } = useSelector((state: RootState) => state.auth);
  const { serre: thisSerre, allCulture: thisSerreAllCulture, activeCulture } = useSelector(
    (state: RootState) => state.serre
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSerres(thisSerre);
    if (thisSerreAllCulture && thisSerreAllCulture.length > 0) {
      setAllCulture(thisSerreAllCulture);
      const active = thisSerreAllCulture.find((c) => !c.productionIsEnded);
      if (active) {
        setHasInitConfig(activeCulture?.initialConfigId === null);
      } else {
        setHasInitConfig(false);
      }
    } else {
      setHasInitConfig(false);
    }
  }, [thisSerre, thisSerreAllCulture, activeCulture]);

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

    if (!activeCulture) {
      throw Error("Une culture active");
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
        dispatch(currentSerre());
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
            <AlertDialogTrigger
              disabled={!allCulture[allCulture.length - 1]?.productionIsEnded}
              className={`${
                !allCulture[allCulture.length - 1]?.productionIsEnded
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary"
              } text-white px-3 py-2 rounded-lg`}
            >
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
      {!hasInitConfig ? (
        <div className="flex flex-wrap gap-5 p-5">
          {allCulture.map((culture: ICulture) => {
            // const cultureStartDate = new Date(culture);
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
                  Débutée le :{" "}
                  {new Date(culture.startProduction).toLocaleDateString()}
                </p>
                {culture.productionIsEnded && (
                  <p>
                    Cloturée le :{" "}
                    {new Date(culture.endProduction).toLocaleDateString()}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <InitialConfig
          serreId={serres.id}
          cultureId={activeCulture?.id as string}
        />
      )}
    </div>
  );
};

export default Page;
