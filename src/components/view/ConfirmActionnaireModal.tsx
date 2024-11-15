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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export function ConfirmActionnaireModal({
  title,
  modeAuto,
  setModeAuto,
}: {
  title: string;
  modeAuto: boolean;
  setModeAuto: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={modeAuto ? "default" : "outline"}>
          {modeAuto ? "Activer" : "Désactiver"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation requise</AlertDialogTitle>
          <AlertDialogDescription>
            Voulez-vous vraiment {modeAuto ? "activer" : "désactiver"} {title} ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => setModeAuto(false)}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
