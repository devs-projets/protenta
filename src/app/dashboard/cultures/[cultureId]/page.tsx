"use client";

import Spinner from "@/components/Spinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SimpleDatePiker } from "@/components/view/SimpleDatePicker";
import { updateCulture } from "@/lib/culture/updateCulture";
import { getAllSerres } from "@/lib/serre/getAllSerres";
import { RootState } from "@/store/store";
import { ICulture } from "@/types/culture";
import { FilePenLine, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [culture, setCulture] = useState<ICulture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [cultureName, setCultureName] = useState<string>("");
  const [cultureType, setCultureType] = useState<string>("");
  const [cultureVariety, setCultureVariety] = useState<string>("");
  const [cultureDescription, setCultureDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [newCulture, setNewCulture] = useState<boolean>(false);

  const { cultureId } = useParams();
  const { access_token } = useSelector((state: RootState) => state.auth);

  const fetchSerre = async () => {
    if (!access_token) {
      throw Error("No access token found");
    }

    try {
      setLoading(true);
      if (error) {
        setError(null);
      }
      const response = await getAllSerres(access_token);
      if (response) {
        const thisCulture = response[0].allCulture.filter(
          (x: ICulture) => x.id === cultureId
        )[0];

        setCulture(thisCulture);
        const start = new Date(
          thisCulture.startProduction
        ).toLocaleDateString();
        setStartDate(start);
        const end =
          thisCulture.endProduction &&
          new Date(thisCulture.endProduction).toLocaleDateString();
        setEndDate(end);
      }
    } catch (error) {
      console.error("Faild to fetch serres");
      setError(
        "Une erreur s'est produite lors de la récupération de la culture \nVeuillez Réessayer"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSerre();
    setNewCulture(false);
  }, [access_token, newCulture]);

  const clearStates = () => {
    setCultureName("");
    setCultureType("");
    setCultureVariety("");
    setCultureDescription("");
    setSelectedDate(undefined);
  };

  const handleUpdateCulture = async () => {
    if (!culture?.serreId || !access_token) {
      throw Error("Information  sur la serre ou l'utilisateur manquant !");
    }

    try {
      const data = {
        name: cultureName,
        variety: cultureVariety,
        type: cultureType,
        description: cultureDescription,
      };

      // TODO: Passer le bon id de la serre
      const response = await updateCulture(
        access_token,
        culture.id,
        culture.serreId,
        data
      );

      if (response) {
        setNewCulture(true);
        clearStates();
        setIsDialogOpen(false);
        alert("Culture mis à jour avec succès !");
      } else {
        alert(
          "Erreur lors de la mise à jour de la culture.\nVeuillez réessayer !"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la culture :", error);
      alert("Erreur lors de l'ajout de la culture.");
    }

    clearStates();
  };

  const handleClotureCulture = async () => {
    if (!culture?.serreId || !access_token) {
      throw Error("Information  sur la serre ou l'utilisateur manquant !");
    }

    try {
      const endDate = new Date();
      const data = {
        endProductionDate: endDate,
        productionIsEnded: true,
      };

      // TODO: Passer le bon id de la serre
      const response = await updateCulture(
        access_token,
        culture.id,
        culture.serreId,
        data
      );

      if (response) {
        setNewCulture(true);
        clearStates();
        setIsDialogOpen(false);
        alert("Culture cloturée avec succès !");
      } else {
        alert(
          "Erreur lors de la cloture de la culture.\nVeuillez réessayer !"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la cloture de la culture :", error);
      alert("Erreur lors de l'ajout de la culture.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <TriangleAlert size={40} />
        <p className="text-lg font-semibold my-4 text-center">{error}</p>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={fetchSerre}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-center text-4xl my-3 shadow-md py-4">
        Culture details
      </h1>
      <div className="max-w-[700px] border-[1px] mx-auto rounded-lg p-4 shadow-md">
        <div className="flex justify-end items-center gap-x-4">
          <div>Modifier la culture</div>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger className="bg-primary text-white px-3 py-2 rounded-lg">
              <FilePenLine />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Modifier la culture</AlertDialogTitle>
                <AlertDialogDescription>
                  Veuillez remplir les informations nécessaires pour modifier la
                  culture.
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
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <button
                  type="button"
                  onClick={handleUpdateCulture}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Enregistrer
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Nom : <span className="font-bold">{culture?.name}</span>
            </p>
          </div>
          <div className="border-2 rounded-lg p-2">
            <p>
              Statut :{" "}
              <span className="font-bold">
                {culture?.productionIsEnded ? "Inactive" : "Active"}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Variété : <span className="font-bold">{culture?.variety}</span>
            </p>
          </div>
          <div className="border-2 rounded-lg p-2">
            <p>
              Type : <span className="font-bold">{culture?.type}</span>
            </p>
          </div>
        </div>

        <div className="my-2 border-2 rounded-lg p-2">
          <p>
            Description : <br />{" "}
            <span className="font-bold">{culture?.description}</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Date de début : <span className="font-bold">{startDate}</span>
            </p>
          </div>
          {culture?.productionIsEnded && (
            <div className="border-2 rounded-lg p-2">
              <p>
                Date de Fin : <span className="font-bold">{endDate}</span>
              </p>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={handleClotureCulture}
            className="bg-primary p-2 rounded-lg w-full text-white"
          >
            Cloturé la culture
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
