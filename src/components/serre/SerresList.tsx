"use client";

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
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import serreIcon from "@/assets/icons/serre.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { EUserRole } from "@/types/userRole";
import { addSerre } from "@/lib/serre/addSerre";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { INewSerre } from "@/types/serre";
a
const SerresList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [serreData, setSerreData] = useState<INewSerre>({
    serreId: null,
    capteurId: null,
    protentaName: null,
  });
  const { serres } = useSelector((state: RootState) => state.serre);
  const { user, access_token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const submitNewSerre = async () => {
    try {
      if (!access_token) {
        throw new Error("");
      }

      if (!serreData.serreId || !serreData.capteurId || !serreData.protentaName) {
        throw new Error("Tout les champs sont obligatoire !")
      }

      toast.promise(
        addSerre(access_token, serreData).then((result) => {
          if (!result) {
            throw new Error(
              "Une erreur s'est produite lors de la création de la serre"
            );
          }
        }),
        {
          loading: "Ajout de la serre en cours ...",
          success: "Serre ajoutée avec succès !",
          error: (err) =>
            err.message || "Une erreur est survenue. Veuillez réessayer.",
        }
      );
    } catch (error) {
      console.error("Une erreur est survenu !");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center px-5 mt-5">
        <h1 className="text-3xl font-bold">Liste des serres</h1>
        {user && user.role === EUserRole.DEV && (
          <div className="flex items-center gap-3">
            <span>Ajouter une serre</span>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger className="bg-primary text-white px-3 py-2 rounded-lg">
                <Plus />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Ajouter une nouvelle serre
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Veuillez remplir les informations nécessaires pour ajouter
                    une nouvelle serre à votre liste.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={submitNewSerre} className="flex flex-col gap-5">
                  <div className="text-xl">
                    <Label htmlFor="nom" className="text-lg">
                      Identifiant de la serre
                    </Label>
                    <Input
                      type="text"
                      placeholder="serreId"
                      required
                      className="text-lg"
                      onChange={(e) =>
                        setSerreData({
                          ...serreData,
                          serreId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="type" className="text-lg">
                      Identifiant des capteurs
                    </Label>
                    <Input
                      type="text"
                      placeholder="capteurId"
                      required
                      className="text-lg"
                      onChange={(e) =>
                        setSerreData({
                          ...serreData,
                          capteurId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="variete" className="text-lg">
                      Nom de la protenta
                    </Label>
                    <Input
                      type="text"
                      placeholder="Nom de la protenta"
                      required
                      className="text-lg"
                      onChange={(e) =>
                        setSerreData({
                          ...serreData,
                          protentaName: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <button
                    onClick={submitNewSerre}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Ajouter
                  </button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      <div className="my-2">
        <hr />
      </div>

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
    </div>
  );
};

export default SerresList;