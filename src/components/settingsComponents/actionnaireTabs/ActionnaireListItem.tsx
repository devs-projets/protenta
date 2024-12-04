import { Switch } from "../../ui/switch";
import { useEffect, useState } from "react";
import { ConfirmActionnaireModal } from "../../actionnaires/ConfirmActionnaireModal";
import { ActionnaireDefautlDesctiption } from "@/types/actionnaireState";
import { sendCommand } from "@/lib/postData/sendCommands";
import { useSocket } from "@/context/SocketContext";

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
}: {
  title: string;
  status: boolean;
}) => {
  const [modeAuto, setModeAuto] = useState<boolean>(true);
  const [switchStatus, setSwitchStatus] = useState<boolean>(status);
  const [description, setDescription] = useState<string>("");

  const { sensorData } = useSocket();

  useEffect(() => {
  const mState = sensorData && Object.keys(sensorData)
    .filter((key) => key.endsWith(title as string))
    .reduce<{ [key: string]: number }>((obj, key) => {
      const k = key.replace('ManuelAuto', "");
      if (k === title) {
        if(sensorData[key] === 0) {
          setModeAuto(true);
        }
        if(sensorData[key] === 1) {
          setModeAuto(false);
        }
      }
      // obj[k] = sensorData[key];
      // setModeAuto(sensorData[key])
      return obj;
    }, {});
    // setModeState(mState[title as string])
  }, [sensorData])

  useEffect(() => {
    setSwitchStatus(status);
    const itemIndex = parseInt(title.slice(1));
    const desc = ActionnaireDefautlDesctiption[itemIndex];
    setDescription(desc);
  }, []);

  const submitAction = async () => {
    // const thisActionCodes = codes[title as keyof typeof codes];
    let thisActionCodes = "";
    if (title != "S12") {
      if (switchStatus) thisActionCodes = "inactive";
      else thisActionCodes = "active";
      const message = `L'actionnaire "${description}" été ${
        thisActionCodes === "active" ? "Activé" : "Désactivé"
      } avec succès !`;
      sendCommand({ [title]: thisActionCodes }, message)
    } else {
      alert("Action sur l'ombrière");
    }
  };

  return (
    <li className="grid grid-cols-5 gap-4 p-2 my-2 items-center">
      <h3>{title}</h3>
      <p className="col-span-2">{description}</p>
      <Switch
        checked={switchStatus}
        disabled={modeAuto}
        onClick={() => {
          setSwitchStatus(!switchStatus);
          submitAction();
        }}
      />
      <ConfirmActionnaireModal
        title={title}
        modeAuto={modeAuto}
        description={description}
        // setModeAuto={setModeAuto}
      />
    </li>
  );
};

export default ActionnaireListItem;
