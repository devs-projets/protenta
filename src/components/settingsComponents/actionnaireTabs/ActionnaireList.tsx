import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ActionnaireListItem from "./ActionnaireListItem";

export interface Actionnaire {
  name: string;
  status: boolean;
  mode: boolean;
}

const ActionnaireList = ({
  actionnairesFetched,
  setReload,
}: {
  actionnairesFetched: Actionnaire[] | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [actionnaires, setActionnaires] = useState<Actionnaire[]>([]);
  const [s11andS12, setS11andS12] = useState<string>("");
  console.log(actionnairesFetched);

  useEffect(() => {
    if (actionnairesFetched) {
      setActionnaires(actionnairesFetched);

      // Customised status for S11 & S12
      const filteredStatuses = actionnairesFetched
        .filter((item) => item.name === "S11" || item.name === "S12")
        .map((item) => item.status);

      if (!filteredStatuses[0] && !filteredStatuses[1]) {
        setS11andS12("Arreter");
      }
      if (!filteredStatuses[0] && filteredStatuses[1]) {
        setS11andS12("Reactor");
      }
      if (filteredStatuses[0] && !filteredStatuses[1]) {
        setS11andS12("Deploy");
      }
    }
  }, [actionnairesFetched]);

  console.log(actionnaires);

  return (
    <ul className="max-h-[300px] overflow-y-auto">
      {actionnaires.map(
        (actionnaire) =>
          actionnaires &&
          !actionnaire.name.includes("ManuelAuto") && (
            <ActionnaireListItem
              key={actionnaire.name}
              title={actionnaire.name}
              status={actionnaire.status}
              mode={actionnaire.mode}
              setReload={setReload}
              s11andS12={s11andS12}
            />
          )
      )}
    </ul>
  );
};

export default ActionnaireList;
