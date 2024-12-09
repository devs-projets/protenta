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
  setReload
}: {
  actionnairesFetched: Partial<ISensorStoredData> | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [actionnaires, setActionnaires] = useState<Actionnaire[]>([]);

  useEffect(() => {
    if (actionnairesFetched) {
      const data: Actionnaire[] = Object.keys(actionnairesFetched).map(
        (key) => ({
          name: key,
          status: actionnairesFetched[key as keyof ISensorStoredData] === 0,
          mode:
            actionnairesFetched[
              `ManuelAuto${key}` as keyof ISensorStoredData
            ] === 0,
        })
      );
      setActionnaires(data);
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
            />
          )
      )}
    </ul>
  );
};

export default ActionnaireList;
