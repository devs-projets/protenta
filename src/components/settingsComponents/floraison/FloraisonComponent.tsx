import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { ISensorStoredData } from "@/types/storedData";
import { sendCommand } from "@/lib/postData/sendCommands";

const FloraisonComponent = ({
  floraisonFetched,
}: {
  floraisonFetched: Partial<ISensorStoredData> | undefined;
}) => {
  const [disableEditMode, setDisableEditMode] = useState<boolean>(true);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [pollinisation, setPollinisation] = useState<number | null>(null);
  const [floraison, setFloraison] = useState<boolean | undefined>(false);

  useEffect(() => {
    setStart(floraisonFetched?.PolStartTime ?? null);
    setEnd(floraisonFetched?.PolEndTime ?? null);
    setPollinisation(
      floraisonFetched?.PolStartTime
        ? parseInt(floraisonFetched.PolStartTime)
        : null
    );
    setFloraison(floraisonFetched?.MomentFloraison);
  }, [floraisonFetched]);

  const handleChangeFloraison = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      PolStartTime: start,
      PolEndTime: end,
      Periode: pollinisation,
      MomentFloraison: floraison ? 1 : 0,
    };
    const message = "La floraison a été mis à jour avec succès !";
    sendCommand(data, message);
    
    setDisableEditMode(true);
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
              {start ?? "Date non définie"}
            </p>
          ) : (
            <input
              type="date"
              value={start as string}
              onChange={(e) => setStart(e.target.value)}
              className="border p-2 rounded-lg border-primary text-center"
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Fin :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              {end ?? "Date non définie"}
            </p>
          ) : (
            <input
              type="date"
              value={end as string}
              onChange={(e) => setEnd(e.target.value)}
              className="border p-2 rounded-lg border-primary text-center"
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Pollinisation :</label>
          {disableEditMode ? (
            <p className="border min-w-16 p-2 rounded-lg border-primary text-center">
              {pollinisation ?? "Date non définie"}
            </p>
          ) : (
            <input
              type="number"
              className="border p-2 rounded-lg border-primary max-w-24"
              value={pollinisation as number}
              onChange={(e) => setPollinisation(parseInt(e.target.value))}
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
