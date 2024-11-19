import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ActionnaireListItem from "./ActionnaireListItem";
import { ISensorStoredData } from "@/types/storedData";

export interface Actionnaire {
  name: string;
  status: boolean;
}

const ActionnaireList = ({
  actionnairesFetched,
}: {
  actionnairesFetched: Partial<ISensorStoredData> | undefined;
}) => {

  const [actionnaires, setActionnaires] = useState<Actionnaire[]>([])

  useEffect(() => {
    if (actionnairesFetched) {
      const data: Actionnaire[] = Object.keys(actionnairesFetched).map((key) => ({
        name: key,
        status: actionnairesFetched[key as keyof ISensorStoredData] === 1,
      }));
      setActionnaires(data);
    }
  }, [actionnairesFetched]);

  return (
    <ul className="max-h-[300px] overflow-y-auto">
      {actionnaires.map((actionnaire) => (
        <ActionnaireListItem
          key={actionnaire.name}
          title={actionnaire.name}
          status={actionnaire.status}
        />
      ))}
    </ul>
  );
};

export default ActionnaireList;
