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

const modeSwitchCodes = {
  300: "Désactiver manuelAuto S1",
  301: "Désactiver manuelAuto S2",
  302: "Désactiver manuelAuto S3",
  303: "Désactiver manuelAuto S4",
  304: "Désactiver manuelAuto S5",
  305: "Désactiver manuelAuto S6",
  306: "Désactiver manuelAuto S7",
  307: "Désactiver manuelAuto S8",
  308: "Désactiver manuelAuto S9",
  309: "Désactiver manuelAuto S10",
  310: "Désactiver manuelAuto S11",
  311: "Désactiver manuelAuto S12",
  313: "Désactiver manuelAuto S13",
  314: "Désactiver manuelAuto S14",
  315: "Désactiver manuelAuto S15",
  316: "Désactiver manuelAuto S16",
};

export function ConfirmActionnaireModal({
  title,
  modeAuto,
  description,
  setModeAuto,
}: {
  title: string;
  modeAuto: boolean;
  description: string;
  setModeAuto: Dispatch<SetStateAction<boolean>>;
}) {
  const setAutoHandling = async () => {
    let code = "";
    Object.entries(modeSwitchCodes).forEach(([key, value]) => {
      const splitedValue = value.split(" ");
      const actionnaire = splitedValue[splitedValue.length - 1];
      if (actionnaire == title) code = key;
    });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-commande`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [`param${code}`]: true }),
        }
      );

      if (response.ok) {
        alert(
          `L'actionnaire "${description}" est passé en mode Automatique avec succès !`
        );
      } else {
        const errorMessage = await response.json();
        alert(
          `Une erreur s'est produite : \nStatus Code = ${
            errorMessage && errorMessage.statusCode
          }\nVeuillez réessayer...`
        );
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
      alert(
        "Une erreur s'est produite lors de la communication avec le serveur. Vérifiez votre connexion."
      );
    }
    setModeAuto(true);
  };

  const handleActionnaireMode = () => {
    if (!modeAuto) setAutoHandling();
    else setModeAuto(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={modeAuto ? "default" : "outline"}
          className={`shadow w-full ${!modeAuto && "bg-gray-200"}`}
        >
          {modeAuto ? "Manuel" : "Auto"}
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
          <AlertDialogAction onClick={handleActionnaireMode}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
