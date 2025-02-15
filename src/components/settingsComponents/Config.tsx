import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Settings } from "lucide-react";
import ConfigTabs from "./ConfigTabs";

export function Config() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex gap-2 items-center bg-primary w-full rounded-lg p-2 text-white">
        <Settings />
        Configurations
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold">
            Configuration
          </AlertDialogTitle>
        </AlertDialogHeader>
        <ConfigTabs />
        <AlertDialogCancel>Fermer</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
