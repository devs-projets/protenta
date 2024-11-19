import { Switch } from "../../ui/switch";
import { useEffect, useState } from "react";
import { ConfirmActionnaireModal } from "../../view/ConfirmActionnaireModal";
import { ActionnaireDefautlDesctiption } from "@/types/actionnaireState";

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
      try {
        const response = await fetch("http://localhost:4000/send-commande", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [title]: thisActionCodes }),
        });

        if (response.ok) {
          alert(
            `L'actionnaire "${description}" été ${
              thisActionCodes === "active" ? "Activé" : "Désactivé"
            } avec succès !`
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
        setModeAuto={setModeAuto}
      />
    </li>
  );
};

export default ActionnaireListItem;
