import { Switch } from "../../ui/switch";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConfirmActionnaireModal } from "../../actionnaires/ConfirmActionnaireModal";
import { ActionnaireDefautlDesctiption } from "@/types/actionnaireState";
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
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";

const codes = {
  S1: { active: "101", inactive: "100" },
  S2: { active: "111", inactive: "110" },
  S3: { active: "121", inactive: "120" },
  S4: { active: "131", inactive: "130" },
  S5: { active: "141", inactive: "140" },
  S6: { active: "151", inactive: "150" },
  S7: { active: "161", inactive: "160" },
  S8: { active: "171", inactive: "170" },
  S9: { active: "181", inactive: "180" },
  S10: { active: "191", inactive: "190" },
  S11: { active: "201", inactive: "200" },
  S13: { active: "231", inactive: "230" },
  S14: { active: "241", inactive: "240" },
  S15: { active: "251", inactive: "250" },
};

const ombriere = { deploy: "220", inactive: "222", reactor: "221" };

const ActionnaireListItem = ({
  title,
  status,
  mode,
  s11andS12,
  setReload,
}: {
  title: string;
  status: boolean;
  mode: boolean;
  s11andS12: string;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [modeAuto, setModeAuto] = useState<boolean>(mode);
  const [switchStatus, setSwitchStatus] = useState<boolean>(status);
  const [description, setDescription] = useState<string>("");
  // const { sensorData } = useSocket();
  const [S12Value, setS12Valuee] = useState<string | undefined>(s11andS12);
  const { access_token } = useSelector((state: RootState) => state.auth);
  const { currentSerre, activeCulture } = useSelector(
    (state: RootState) => state.serre
  );

  useEffect(() => {
    const itemIndex = parseInt(title.slice(1));
    const desc = ActionnaireDefautlDesctiption[itemIndex - 1];
    setDescription(desc);
  }, []);

  // useEffect(() => {
  // }, [sensorData])

  const submitAction = async () => {
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

    // const thisActionCodes = codes[title as keyof typeof codes];
    let thisActionCodes = "";
    if (title != "S12") {
      if (switchStatus) thisActionCodes = "inactive";
      else thisActionCodes = "active";
      const message = `L'actionnaire "${description}" été ${
        thisActionCodes === "active" ? "Activé" : "Désactivé"
      } avec succès !`;
      toast.promise(
        sendCommand(
          currentSerre.id,
          activeCulture.id,
          { [title]: thisActionCodes },
          message,
          access_token
        ).then((result) => {
          if (result?.success) {
            setReload(true);
            setSwitchStatus(!switchStatus);
          } else {
            setSwitchStatus(switchStatus);
          }
        }),
        {loading: "Envoi de la commande en cours..."}
      )
      // sendCommand(
      //   currentSerre.id,
      //   activeCulture.id,
      //   { [title]: thisActionCodes },
      //   message,
      //   access_token
      // ).then((result) => {
      //   if (result?.success) {
      //     setReload(true);
      //     setSwitchStatus(!switchStatus);
      //   } else {
      //     setSwitchStatus(switchStatus);
      //   }
      // })
    }
  };

  if (title === "S11") return;

  return (
    <li className="grid grid-cols-6 gap-4 p-2 my-2 items-center">
      <h3>{title === "S12" ? "S11-S12" : title}</h3>
      <p className="col-span-2">{title === "S12" ? "Ombrière" : description}</p>
      <div className="col-span-2">
        {title != "S12" && (
          <div className="flex justify-center">
            <Switch
              checked={switchStatus}
              disabled={modeAuto}
              onClick={submitAction}
            />
          </div>
        )}
        {title === "S12" && (
          <div>
            <Select
              value={S12Value}
              disabled={modeAuto}
              onValueChange={(value) => {
                const message = `L'actionnaire "${description}" été ${value} avec succès !`;
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

                toast.promise(
                  sendCommand(
                    currentSerre.id,
                    activeCulture.id,
                    { [title]: value },
                    message,
                    access_token
                  ).then((result) => {
                    if (result?.success) {
                      setReload(true);
                      setS12Valuee(value);
                    }
                  }),
                  {loading: "Envoi de la commande en cours..."}
                )
                // sendCommand(
                //   currentSerre.id,
                //   activeCulture.id,
                //   { [title]: value },
                //   message,
                //   access_token
                // ).then((result) => {
                //   if (result?.success) {
                //     setReload(true);
                //     setS12Valuee(value);
                //   }
                // });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="Deploy">
                    Déployer
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Reactor">
                    Reacter
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Arreter">
                    Arreter
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <ConfirmActionnaireModal
        title={title}
        modeAuto={modeAuto}
        description={description}
        setModeAuto={setModeAuto}
      />
    </li>
  );
};

export default ActionnaireListItem;
