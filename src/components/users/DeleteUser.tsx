import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import { deleteUser } from "@/lib/auth/deleteUser";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DeleteUser = ({
  user,
  setDeleteUser,
}: {
  user: User;
  setDeleteUser: (deleteState: boolean) => void;
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { access_token } = useSelector((state: RootState) => state.auth);

  const deleteThisUser = async () => {
    if (!access_token) {
      console.error("Access token is null");
      return;
    }
    
    try {
      const response = await deleteUser(access_token, user.id);
      setDeleteUser(true);
      setIsDeleteDialogOpen(false);
      alert(response.message);
    } catch (err) {
      console.error("An error occurred while fetching user data", err);
      alert(
        "Une erreur est survenue lors de la suppression des données de l'utilisateur."
      );
    }
  };

  return (
    <AlertDialog open={isDeleteDialogOpen}>
      <AlertDialogTrigger className="w-full mt-3">
        <Button onClick={() => setIsDeleteDialogOpen(true)} className="w-full">
          Supprimer le compte
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation requise</AlertDialogTitle>
          <AlertDialogDescription>
            <p>Voulez-vous vraiment supprimer ce compte ?</p>
            <p>Nom : {user.firstName}</p>
            <p>Prénom : {user.lastName}</p>
            <p>Téléphone : {user.phoneNumber}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteThisUser}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
