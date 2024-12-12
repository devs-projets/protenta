import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ActionnaireListItem from "./ActionnaireListItem";
import { ISensorStoredData } from "@/types/storedData";
import { ILatestData } from "@/types/latestDataState";

export interface Actionnaire {
  name: string;
  status: boolean;
  mode: boolean;
}

const ActionnaireList = ({
  actionnairesFetched,
  setReload,
}: {
  actionnairesFetched: Partial<ILatestData> | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [actionnaires, setActionnaires] = useState<Actionnaire[]>([]);
  const [s11andS12, setS11andS12] = useState<string>("");

  useEffect(() => {
    if (actionnairesFetched) {

      const listActionnaire: Partial<ILatestData> = Object.keys(
        actionnairesFetched
      )
        .filter((key) => key.startsWith("S") && !key.startsWith("ManuelAuto"))
        .reduce<any>((obj, key) => {
          obj[key as keyof ILatestData] =
            actionnairesFetched[key as keyof ILatestData];
          return obj;
        }, {});

      const modesActionnaire: Partial<ILatestData> = Object.keys(
        actionnairesFetched
      )
        .filter((key) => !key.startsWith("S") && key.startsWith("ManuelAuto"))
        .reduce<any>((obj, key) => {
          obj[key as keyof ILatestData] =
            actionnairesFetched[key as keyof ILatestData];
          return obj;
        }, {});
        
      const data: Actionnaire[] = Object.keys(listActionnaire).map((key) => ({
        name: key,
        status: Boolean(listActionnaire[key as keyof ILatestData]),
        mode: Boolean(
          !modesActionnaire[`ManuelAuto${key}` as keyof ILatestData]
        ),
      }));

      console.log(data);

      setActionnaires(data);

      const filteredStatuses = data
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
