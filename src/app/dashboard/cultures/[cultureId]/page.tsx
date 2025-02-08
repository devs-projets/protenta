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
import { useAuth } from "@/context/AuthProvider";
import { updateCulture } from "@/lib/culture/updateCulture";
import { currentSerre } from "@/store/reducers/serre/serreSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ICulture } from "@/types/culture";
import { FilePenLine, TriangleAlert, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const [culture, setCulture] = useState<ICulture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [cultureName, setCultureName] = useState<string>("");
  const [cultureType, setCultureType] = useState<string>("");
  const [cultureVariety, setCultureVariety] = useState<string>("");
  const [cultureDescription, setCultureDescription] = useState<string>("");

  const { cultureId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { access_token } = useAuth();
  const { currentSerre: thisSerre, activeCulture } = useSelector(
    (state: RootState) => state.serre
  );

  const initUpdateForm = (cultureData: ICulture) => {
    setCultureName(cultureData.name);
    setCultureType(cultureData.type);
    setCultureVariety(cultureData.variety);
    setCultureDescription(cultureData.description);
  };

  useEffect(() => {
    if (thisSerre) {
      const thisCulture = thisSerre.allCulture.filter(
        (x: ICulture) => x.id === cultureId
      )[0];

      setCulture(thisCulture);
      initUpdateForm(thisCulture);
      const start = new Date(thisCulture.startProduction).toLocaleDateString();
      setStartDate(start);
      const end =
        thisCulture.endProduction &&
        new Date(thisCulture.endProduction).toLocaleDateString();
      setEndDate(end);
      setLoading(false);
    }
  }, [access_token, thisSerre]);

  const clearStates = () => {
    setCultureName("");
    setCultureType("");
    setCultureVariety("");
    setCultureDescription("");
  };

  const handleUpdateCulture = async () => {
    if (!culture?.serreId || !access_token) {
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
      };

      // TODO: Passer le bon id de la serre
      toast.promise(
        updateCulture(access_token, culture.id, culture.serreId, data),
        {
          loading: "Modification de la culture en cours...",
          success: () => {
            dispatch(currentSerre());
            clearStates();
            setIsDialogOpen(false);
            return "Culture mis à jour avec succès !";
          },
          error:
            "Erreur lors de la mise à jour de la culture.\nVeuillez réessayer !",
        }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la culture :", error);
      toast.error("Erreur lors de l'ajout de la culture.");
    }
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

      toast.promise(
        updateCulture(access_token, culture.id, culture.serreId, data),
        {
          loading: "Cloture de la culture en cours...",
          success: () => {
            dispatch(currentSerre());
            clearStates();
            setIsDialogOpen(false);
            return "Culture cloturée avec succès !";
          },
          error: "Erreur lors de l'ajout de la culture.",
        }
      );
    } catch (error) {
      console.error("Erreur lors de la cloture de la culture :", error);
      toast.error("Erreur lors de l'ajout de la culture.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="h-screen flex flex-col justify-center items-center">
  //       <TriangleAlert size={40} />
  //       <p className="text-lg font-semibold my-4 text-center">{error}</p>
  //       <button
  //         className="bg-primary text-white px-4 py-2 rounded"
  //         onClick={fetchSerre}
  //       >
  //         Réessayer
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="relative">
        <button
          className="absolute top-6 left-5 flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Retour
        </button>
        <h1 className="font-bold text-center text-4xl my-3 shadow-md py-4">
          Culture details
        </h1>
      </div>
      <div className="max-w-[700px] border-[1px] mx-auto rounded-lg p-4 shadow-md">
        {!culture?.productionIsEnded && (
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
                    Veuillez remplir les informations nécessaires pour modifier
                    la culture.
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
                      value={cultureName}
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
                      value={cultureType}
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
                      value={cultureVariety}
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
                      value={cultureDescription}
                      className="resize-none text-2xl"
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
        )}
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Nom : <span className="font-bold">{culture?.name}</span>
            </p>
          </div>
          <div className="border-2 rounded-lg p-2">
            <p>
              Statut :{" "}
              <span
                className={`${
                  culture?.productionIsEnded
                    ? "bg-gray-300"
                    : "bg-primary text-white"
                } px-2 py-1 rounded-full`}
              >
                {culture?.productionIsEnded ? "Cloturé" : "Encours"}
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

        {!culture?.productionIsEnded && (
          <div>
            <button
              onClick={handleClotureCulture}
              className="bg-primary p-2 rounded-lg w-full text-white bg-red-400"
            >
              Cloturé la culture
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
