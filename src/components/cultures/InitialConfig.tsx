"use client";

import {
  initialLimites,
  Limite,
} from "@/components/settingsComponents/LimiteTabs/LimiteList";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { initialConfiguration } from "@/lib/configuration/initialConfig";
import { defaulActionnairesData } from "@/mockData/defaultActionnairesData";
import { RootState, useAppDispatch } from "@/store/store";
import { IActionnaire } from "@/types/actionnaire";
import { InitialConfigData } from "@/types/initialConfigData";
import { cp } from "fs";
import React, { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { currentSerre } from "@/store/reducers/serre/serreSlice";
import { toast } from "sonner";

interface StepProps {
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
}

const StepZero = ({ step, setStep }: StepProps) => {
  return (
    <div className="flex flex-col h-full justify-center items-center px-5">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Configurez votre serre
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Commencez par configurer les paramètres initiaux pour un démarrage
        optimal de votre application. Cette étape est rapide et simple !
      </p>
      <button
        onClick={() => setStep(step + 1)}
        className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg"
      >
        Configurer maintenant
      </button>
    </div>
  );
};

const StepOne = ({
  step,
  setStep,
  setCapteursNumber,
}: StepProps & {
  setCapteursNumber: React.Dispatch<SetStateAction<number | null>>;
}) => {
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-between p-2">
      <div>
        <h1 className="text-xl mt-2 ml-2 font-bold">Nombre de capteurs</h1>
      </div>
      <div className="text-center">
        <p>
          Veuillez sélectionner le nombre de capteurs à installer dans la serre.
        </p>
        <p>Le nombre doit être compris entre 1 et 16 inclus.</p>
        <input
          type="number"
          min={1}
          max={16}
          required
          placeholder="0"
          className="p-2 rounded-lg my-5 text-center border-2 border-gray-400"
          onChange={(e) => {
            setValue(parseInt(e.target.value));
            setCapteursNumber(parseInt(e.target.value));
            setError(false);
          }}
        />
        {error && <p className="text-red-400">Champs obligatoire</p>}
      </div>
      <div className="flex justify-end gap-5 mt-3">
        <button
          onClick={() => {
            if (!value) {
              setError(true);
              return;
            }
            setStep(step + 1);
          }}
          className="px-4 py-2 bg-primary rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StepTwo = ({
  step,
  setStep,
  actionnairesList,
  setActionnairesList,
}: StepProps & {
  actionnairesList: Partial<IActionnaire>[];
  setActionnairesList: React.Dispatch<
    React.SetStateAction<Partial<IActionnaire>[]>
  >;
}) => {
  const selectActionnaire = (index: number, value: boolean): void => {
    const copy = [...actionnairesList];
    copy[index].state = value;
    setActionnairesList(copy);
  };

  return (
    <div className="flex flex-col justify-between p-2">
      <div>
        <h1 className="text-xl mt-2 ml-2 font-bold">Actionnaires</h1>
        <p className="text-center px-5 my-2">
          Choisissez les actionnaires que vous souhaiterais embarquer dans la
          serre
        </p>
      </div>
      <div className="max-h-[300px] overflow-hidden overflow-y-auto">
        <div className="w-80 mx-auto flex flex-col gap-5">
          {actionnairesList.map((actionnaire, index) => (
            <>
              {actionnaire.description !== "Non définie" && (
                <div
                  key={actionnaire.name}
                  className="w-full flex justify-between border-[1px] p-3 rounded-lg shadow-md"
                >
                  <div className="flex gap-3">
                    <h3>{actionnaire.name} :</h3>
                    <p className="col-span-2">{actionnaire.description}</p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-center">
                      <Switch
                        checked={actionnaire.state}
                        onClick={() =>
                          selectActionnaire(index, !actionnaire.state)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-3">
        <button
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(step + 1)}
          className="px-4 py-2 bg-primary rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StepTree = ({
  step,
  setStep,
  limites,
  setLimites,
}: StepProps & {
  limites: Limite[];
  setLimites: React.Dispatch<React.SetStateAction<Limite[]>>;
}) => {
  const handleMinChange = (index: number, value: number) => {
    setLimites((prev) => {
      const newLimites = [...prev];
      newLimites[index].minValue = value;
      return newLimites;
    });
  };

  const handleMaxChange = (index: number, value: number) => {
    setLimites((prev) => {
      const newLimites = [...prev];
      newLimites[index].maxValue = value;
      return newLimites;
    });
  };
  return (
    <div className="flex flex-col justify-between p-2">
      <div>
        <h1 className="text-xl mt-2 ml-2 font-bold">Limites</h1>
        <p className="text-center px-5 my-2">
          Définissez les limites initiales des capteurs. Vous pouvez spécifier
          les valeurs minimales et maximales pour chacun.
        </p>
      </div>
      <div className="px-5">
        {limites.map((limite, index) => (
          <div className="grid grid-cols-4 gap-4 p-2 my-3 items-center rounded-lg border-[1px] shadow-sm">
            <h3>{limite.name}</h3>
            <p>{limite.unit}</p>
            <input
              type="number"
              value={limite.minValue}
              min={0}
              onChange={(e) => handleMinChange(index, +e.target.value)}
              placeholder="Min"
              className="border rounded px-2 py-1"
            />
            <input
              type="number"
              value={limite.maxValue}
              min={0}
              onChange={(e) => handleMaxChange(index, +e.target.value)}
              placeholder="Max"
              className="border rounded px-2 py-1"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-5 mt-3">
        <button
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(step + 1)}
          className="px-4 py-2 bg-primary rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const StepFour = ({
  step,
  setStep,
  floraison,
  serreId,
  cultureId,
  initialConfig,
  setFloraison,
  handleDialogClose,
}: StepProps & {
  initialConfig: any;
  floraison: IFloraison;
  serreId: string;
  cultureId: string;
  setFloraison: React.Dispatch<React.SetStateAction<IFloraison>>;
  handleDialogClose: () => void;
}) => {
  const { access_token } = useSelector((state: RootState) => state.auth);

  const submitInitialConfig = async () => {
    if (!access_token) {
      throw Error("Token not found !");
    }

    try {
      const response = toast.promise(
        initialConfiguration(
          access_token,
          serreId,
          cultureId,
          initialConfig
        ),
        {
          loading: "Configuration en cours...",
          success: "Configuration enregistrée avec succès !",
          error: "Erreur lors de de la configuration"
        }
      ).unwrap();

      const result = await response;
      
      // TODO : A corriger !!!!!!!
      if (result.status === 200) handleDialogClose();
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la configuration :",
        error
      );
    }
  };

  return (
    <div className="flex flex-col justify-between p-2">
      <div>
        <h1 className="text-xl mt-2 ml-2 font-bold">Floraison</h1>
        <p className="text-center px-5 my-2">
          Si vous disposez de suffisamment d'informations, vous pouvez définir
          les données relatives à la floraison.
        </p>
      </div>
      <div className="px-20">
        <form className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-[1px] rounded-lg shadow-lg p-3">
            <label>Début :</label>
            <Select
              value={floraison.start ?? ""}
              onValueChange={(value) => {
                const copy = { ...floraison };
                copy.start = value;
                setFloraison(copy);
              }}
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
          </div>
          <div className="flex justify-between items-center border-[1px] rounded-lg shadow-lg p-3">
            <label>Fin :</label>
            <Select
              value={floraison.end ?? ""}
              onValueChange={(value) => {
                const copy = { ...floraison };
                copy.end = value;
                setFloraison(copy);
              }}
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
          </div>
          <div className="flex justify-between items-center border-[1px] rounded-lg shadow-lg p-3">
            <label>Durée de pollinisation :</label>
            <input
              type="number"
              className="border p-2 rounded-lg border-primary max-w-24 text-center"
              value={floraison.pollinisation ?? ""}
              min={0}
              max={59}
              placeholder="0"
              onChange={(e) => {
                const value = e.target.value;
                const copy = { ...floraison };
                copy.pollinisation = value;
                setFloraison(copy);
              }}
            />
          </div>
          <div className="flex justify-between items-center border-[1px] rounded-lg shadow-lg p-3">
            <label>Floraison :</label>
            <Switch
              checked={floraison.floraison!}
              onClick={() => {
                const copy = { ...floraison };
                copy.floraison = !floraison.floraison;
                setFloraison(copy);
              }}
            />
          </div>
        </form>
      </div>
      <div className="flex justify-end gap-5 mt-3">
        <button
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={submitInitialConfig}
          className="px-4 py-2 bg-primary rounded-lg text-white"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

interface IFloraison {
  start: string | null;
  end: string | null;
  pollinisation: string | null;
  floraison: boolean | null;
}

const InitialConfig = ({
  serreId,
  cultureId,
}: {
  serreId: string;
  cultureId: string;
}) => {
  const [step, setStep] = useState<number>(0);

  const [capteursNumber, setCapteursNumber] = useState<any>(null);
  const [actionnairesList, setActionnairesList] = useState<any>([]);
  const [limites, setLimites] = useState<any>(initialLimites);
  const [floraison, setFloraison] = useState<any>({
    start: null,
    end: null,
    pollinisation: null,
    floraison: null,
  });
  const [initialConfig, setInitialConfig] = useState<any>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const actionsList = defaulActionnairesData.map((action) => ({
      name: action.name,
      state: action.state,
      description: action.description,
    }));

    setActionnairesList(actionsList);
  }, []);

  useEffect(() => {
    const extractedValues = initialLimites.reduce((result, limite) => {
      const prefix = limite.name.split(" ")[0].slice(0, 3);
      if (prefix === "CO₂") {
        return {
          ...result,
          [`Co2Min`]: limite.minValue,
          [`Co2Max`]: limite.maxValue,
        };
      }
      if (prefix === "Pre") {
        return {
          ...result,
          [`PressMin`]: limite.minValue,
          [`PressMax`]: limite.maxValue,
        };
      }
      return {
        ...result,
        [`${prefix === "CO₂" ? "Co2" : prefix}Min`]: limite.minValue,
        [`${prefix === "CO₂" ? "Co2" : prefix}Max`]: limite.maxValue,
      };
    }, {});
    const pol = {
      PolStartTime: parseInt(floraison.start) || 0,
      PolEndTime: parseInt(floraison.end) || 0,
      Periode: parseInt(floraison.pollinisation) || 0,
      MomentFloraison: floraison.floraison || false,
    };
    const actionnaireStates = actionnairesList.reduce(
      (acc: any, actionnaire: any) => {
        if (actionnaire.name && actionnaire.state !== undefined) {
          acc[actionnaire.name] = actionnaire.state;
        }
        return acc;
      },
      {} as Record<string, boolean>
    );

    const data = {
      ...extractedValues,
      ...pol,
      initialActionaire: { ...actionnaireStates },
      capteurNombres: capteursNumber,
    };
    setInitialConfig(data);
  }, [capteursNumber, actionnairesList, limites, floraison]);

  const handleDialogClose = () => {
    // setIsDialogOpen(false);
    dispatch(currentSerre());
  };

  return (
    <>
      {/* <AlertDialog> */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="min-h-[600px]">
          {step === 0 && <StepZero step={step} setStep={setStep} />}
          {step === 1 && (
            <StepOne
              step={step}
              setStep={setStep}
              setCapteursNumber={setCapteursNumber}
            />
          )}
          {step === 2 && (
            <StepTwo
              step={step}
              setStep={setStep}
              actionnairesList={actionnairesList}
              setActionnairesList={setActionnairesList}
            />
          )}
          {step === 3 && (
            <StepTree
              step={step}
              setStep={setStep}
              limites={limites}
              setLimites={setLimites}
            />
          )}
          {step === 4 && (
            <StepFour
              step={step}
              setStep={setStep}
              floraison={floraison}
              serreId={serreId}
              cultureId={cultureId}
              initialConfig={initialConfig}
              setFloraison={setFloraison}
              handleDialogClose={handleDialogClose}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InitialConfig;
