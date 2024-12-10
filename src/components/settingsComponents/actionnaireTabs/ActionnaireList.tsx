import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ActionnaireListItem from "./ActionnaireListItem";
import { ISensorStoredData } from "@/types/storedData";

export interface Actionnaire {
  name: string;
  status: boolean;
  mode: boolean;
}

const ActionnaireList = ({
  actionnairesFetched,
  setReload,
}: {
  actionnairesFetched: Partial<ISensorStoredData> | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [actionnaires, setActionnaires] = useState<Actionnaire[]>([]);
  const [s11andS12, setS11andS12] = useState<string>("");

  useEffect(() => {
    if (actionnairesFetched) {
      console.log(actionnairesFetched)
      const data: Actionnaire[] = Object.keys(actionnairesFetched).map(
        (key) => ({
          name: key,
          status: key.startsWith('S') && actionnairesFetched[key as keyof ISensorStoredData] === 1,
          mode:
            actionnairesFetched[
              `ManuelAuto${key}` as keyof ISensorStoredData
            ] === 0,
        })
      );
      setActionnaires(data);
      const filteredStatuses = data
        .filter((item) => item.name === "S11" || item.name === "S12")
        .map((item) => item.status);

      if (!filteredStatuses[0] && !filteredStatuses[1]) {
        setS11andS12('Arreter')
      }
      if (!filteredStatuses[0] && filteredStatuses[1]) {
        setS11andS12('Reactor')
      }
      if (filteredStatuses[0] && !filteredStatuses[1]) {
        setS11andS12('Deploy')
      }
    }
  }, [actionnairesFetched]);

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
