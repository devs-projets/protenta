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
import { Textarea } from "@/components/ui/textarea";
import { SimpleDatePiker } from "@/components/view/SimpleDatePicker";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import serreIcon from "@/assets/icons/serre.svg";

const Serres = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center px-5 mt-5">
        <h1 className="text-3xl font-bold">Liste des serres</h1>
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
              <form className="flex flex-col gap-5">
                <div className="text-xl">
                  <Label htmlFor="nom" className="text-lg">
                    Identifiant de la serre
                  </Label>
                  <Input
                    id="nom"
                    type="text"
                    placeholder="serreId"
                    required
                    className="text-lg"
                    // onChange={(e) => setCultureName(e.target.value)}
                  />
                </div>
                <div className="">
                  <Label htmlFor="type" className="text-lg">
                    Identifiant des capteurs
                  </Label>
                  <Input
                    id="type"
                    type="text"
                    placeholder="capteurId"
                    required
                    className="text-lg"
                    // onChange={(e) => setCultureType(e.target.value)}
                  />
                </div>
                <div className="">
                  <Label htmlFor="variete" className="text-lg">
                    Identifiant de la protenta
                  </Label>
                  <Input
                    id="variete"
                    type="text"
                    placeholder="protentaId"
                    required
                    className="text-lg"
                    // onChange={(e) => setCultureVariety(e.target.value)}
                  />
                </div>
                <div className="">
                  <Label htmlFor="variete" className="text-lg">
                    Nom de la serre
                  </Label>
                  <Input
                    id="variete"
                    type="text"
                    placeholder="Nom de la serre"
                    required
                    className="text-lg"
                    // onChange={(e) => setCultureVariety(e.target.value)}
                  />
                </div>
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <button
                  type="button"
                  // onClick={handleNewCulture}
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

      <div className="p-5 flex flex-wrap gap-8">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="flex flex-col max-w-xs rounded-lg items-center border shadow-xl bg-secondary hover:shadow-2xl"
          >
            <div className="flex justify-center bg-white p-5 rounded-tl-lg rounded-tr-lg">
              <img src={serreIcon.src} className="w-1/2" />
            </div>
            <div className="w-full p-3">
              <h2 className="text-2xl font-bold">Serre 1</h2>
              <p className="text-lg">Serre descritption</p>
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

export default Serres;
