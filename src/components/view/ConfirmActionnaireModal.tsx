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
  
  export function ConfirmActionnaireModal({
    title,
    mode,
    onConfirmMode,
  }: any) {
    const handleConfirm = () => {
      const newMode = mode === "on" ? "off" : "on"; // Inverser le mode actuel
      onConfirmMode(title, newMode); // Envoyer le nouveau mode après confirmation
    };
  
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={mode === "on" ? "outline" : "default"}>
            {mode === "on" ? "Désactiver" : "Activer"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation requise</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment {mode === "on" ? "désactiver" : "activer"}{" "}
              {title} ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  