import { Switch } from "@/components/ui/switch";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { sendCommand } from "@/lib/postData/sendCommands";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILatestData } from "@/types/latestDataState";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const FloraisonComponent = ({
  floraisonFetched,
  setReload,
}: {
  floraisonFetched: Partial<ILatestData> | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [disableEditMode, setDisableEditMode] = useState<boolean>(true);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [pollinisation, setPollinisation] = useState<string | null>(null);
  const [floraison, setFloraison] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useSelector((state: RootState) => state.auth);
  const { currentSerre, activeCulture } = useSelector(
    (state: RootState) => state.serre
  );

  useEffect(() => {
    setStart(floraisonFetched?.PolStartTime ?? null);
    setEnd(floraisonFetched?.PolEndTime ?? null);
    setPollinisation(floraisonFetched?.Periode ?? null);
    setFloraison(floraisonFetched?.MomentFloraison);
  }, [floraisonFetched]);

  const validateTime = () => {
    if (start && end && parseInt(start) >= parseInt(end)) {
      setError(
        "Erreur : L'heure de fin doit être supérieure à l'heure de début."
      );
      return false;
    }
    setError(null);
    return true;
  };

  const handleChangeFloraison = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateTime()) return;
    if (!access_token) {
      console.error("Access token is null");
      return;
    }

    if (!currentSerre) {
      console.error("Serre is undefined");
      return;
    }

    if (!activeCulture) {
      throw Error("Une culture active");
    }

    const data = {
      PolStartTime: start,
      PolEndTime: end,
      Periode: pollinisation,
      MomentFloraison: floraison ? 1 : 0,
    };
    const message = "La floraison a été mis à jour avec succès !";
    sendCommand(currentSerre.id, activeCulture.id, data, message, access_token).then(
      (result) => {
        if (result?.success) {
          setReload(true);
        }
      }
    );

    setDisableEditMode(true);
  };

  const handleStartChange = (value: string) => {
    setStart(value);
    validateTime();
  };

  const handleEndChange = (value: string) => {
    setEnd(value);
    validateTime();
  };

  return (
    <div className="max-w-64 mx-auto pt-5">
      <form
        onSubmit={(e) => {
          if (!disableEditMode) {
            handleChangeFloraison(e);
          }
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex justify-between items-center">
          <label>Début :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              {start
                ? parseInt(start) < 10
                  ? `0${start}h00`
                  : `${start}h00`
                : "Non définie"}
            </p>
          ) : (
            <Select
              value={start ?? ""}
              onValueChange={(value) => handleStartChange(value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Heure" />
              </SelectTrigger>
              <SelectContent className="w-16">
                <SelectGroup>
                  {Array.from({ length: 24 }, (_, index) => (
                    <SelectItem
                      key={index}
                      className="cursor-pointer"
                      value={index.toString()}
                    >
                      {index.toString().padStart(2, "0")} h
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Fin :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              {end
                ? parseInt(end) < 10
                  ? `0${end}h00`
                  : `${end}h00`
                : "Non définie"}
            </p>
          ) : (
            <Select
              value={end ?? ""}
              onValueChange={(value) => handleEndChange(value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Heure" />
              </SelectTrigger>
              <SelectContent className="w-16">
                <SelectGroup>
                  {Array.from({ length: 24 }, (_, index) => (
                    <SelectItem
                      key={index}
                      className="cursor-pointer"
                      value={index.toString()}
                    >
                      {index.toString().padStart(2, "0")} h
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Durée de pollinisation :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              {pollinisation ? pollinisation + " min" : "N/A"}
            </p>
          ) : (
            <input
              type="number"
              className="border p-2 rounded-lg border-primary max-w-24"
              value={pollinisation ?? ""}
              min={0}
              max={59}
              onChange={(e) => setPollinisation(e.target.value)}
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Floraison :</label>
          <Switch
            checked={floraison}
            onClick={() => setFloraison(!floraison)}
            disabled={disableEditMode}
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          {!disableEditMode && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex gap-1 justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
                onClick={() => setDisableEditMode(true)}
              >
                <X />
                Annuler
              </button>
              <button
                type="submit"
                className="flex gap-1 justify-center items-center bg-primary w-full p-2 text-white rounded-lg"
              >
                <Save />
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </form>
      {disableEditMode && (
        <button
          type="button"
          className="flex justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
          onClick={() => setDisableEditMode(false)}
        >
          <Pencil className="mx-3" />
          Modifier
        </button>
      )}
    </div>
  );
};

export default FloraisonComponent;
