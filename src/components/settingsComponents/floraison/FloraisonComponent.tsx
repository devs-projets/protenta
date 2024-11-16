import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Pencil, Save, X } from "lucide-react";

const FloraisonComponent = () => {
  const [disableEditMode, setDisableEditMode] = useState<boolean>(true);
  const [start, setStart] = useState<string>("2024-05-15");
  const [end, setEnd] = useState<string>("2024-05-15");
  const [pollinisation, setPollinisation] = useState<string>('35');
  const [floraison, setFloraison] = useState<boolean>(false);

  const handleChangeFloraison = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Floraison changed ...");
    const data = {
      start,
      end,
      pollinisation,
      floraison
    }
    console.log(data)
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
              15/05/2024
            </p>
          ) : (
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border p-1 rounded-lg border-primary text-center"
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Fin :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              15/05/2024
            </p>
          ) : (
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border p-1 rounded-lg border-primary text-center"
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Pollinisation :</label>
          {disableEditMode ? (
            <p className="border min-w-16 p-2 rounded-lg border-primary text-center">
              35
            </p>
          ) : (
            <input
              type="number"
              className="border p-1 rounded-lg border-primary max-w-24"
              value={pollinisation}
              onChange={(e) => setPollinisation(e.target.value)}
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Floraison :</label>
          <Switch checked={floraison} onClick={() => setFloraison(!floraison)} disabled={disableEditMode} />
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
