import { Switch } from "../../ui/switch";
import { useEffect, useState } from "react";
import { ConfirmActionnaireModal } from "../../view/ConfirmActionnaireModal";

const ActionnaireListItem = ({
  title,
  status,
}: {
  title: string;
  status: boolean;
}) => {
  const [modeAuto, setModeAuto] = useState<boolean>(true);
  const [switchStatus, setSwitchStatus] = useState<boolean | null>(status);

  useEffect(() => {
    setSwitchStatus(status);
  }, []);

  return (
    <li className="grid grid-cols-4 gap-4 p-2 my-2 items-center">
      <h3>{title}</h3>
      <p>Description</p>
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
