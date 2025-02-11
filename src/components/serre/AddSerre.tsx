import { addSerre } from "@/lib/serre/addSerre";
import { INewSerre } from "@/types/serre";
import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthProvider";

const AddSerre = ({
  setNewSerreAdded,
}: {
  setNewSerreAdded?: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [serreData, setSerreData] = useState<INewSerre>({
    serreId: null,
    capteurId: null,
    protentaName: null,
  });
  const { access_token } = useAuth();

  const submitNewSerre = async () => {
    try {
      if (!access_token) {
        throw new Error("");
      }

      if (
        !serreData.serreId ||
        !serreData.capteurId ||
        !serreData.protentaName
      ) {
        throw new Error("Tout les champs sont obligatoire !");
      }

      toast.promise(
        addSerre(access_token, serreData).then((result) => {
          if (!result) {
            throw new Error(
              "Une erreur s'est produite lors de la création de la serre"
            );
          } else {
            setIsDialogOpen(false);
            if (setNewSerreAdded) setNewSerreAdded(true);
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
    <div className="flex items-center gap-3">
      <span>Ajouter une serre</span>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger className="bg-primary text-white px-3 py-2 rounded-lg">
          <Plus />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ajouter une nouvelle serre</AlertDialogTitle>
            <AlertDialogDescription>
              Veuillez remplir les informations nécessaires pour ajouter une
              nouvelle serre à votre liste.
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
  );
};

export default AddSerre;
