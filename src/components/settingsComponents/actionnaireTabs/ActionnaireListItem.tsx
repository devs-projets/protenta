import { Switch } from "../../ui/switch";
import { useEffect, useState } from "react";
import { ConfirmActionnaireModal } from "../../view/ConfirmActionnaireModal";
import { ActionnaireDefautlDesctiption } from "@/types/actionnaireState";

const ActionnaireListItem = ({
  title,
  status,
}: {
  title: string;
  status: boolean;
}) => {
  const [modeAuto, setModeAuto] = useState<boolean>(true);
  const [switchStatus, setSwitchStatus] = useState<boolean | null>(status);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setSwitchStatus(status);
    const itemIndex = parseInt(title.slice(1));
    const desc = ActionnaireDefautlDesctiption[itemIndex];
    setDescription(desc)
  }, []);

  return (
    <li className="grid grid-cols-5 gap-4 p-2 my-2 items-center">
      <h3>{title}</h3>
      <p className="col-span-2">{description}</p>
      <Switch
        checked={switchStatus!}
        disabled={modeAuto}
        onClick={() => {
          setSwitchStatus(!switchStatus);
          setModeAuto(true);
        }}
      />
      <ConfirmActionnaireModal
        title={title}
        modeAuto={modeAuto}
        setModeAuto={setModeAuto}
      />
    </li>
  );
};

export default ActionnaireListItem;
