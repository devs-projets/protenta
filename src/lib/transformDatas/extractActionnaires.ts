import { Actionnaire } from "@/components/settingsComponents/actionnaireTabs/ActionnaireList";
import { ILatestData } from "@/types/latestDataState";

export const extractActionnaires = (lastData: ILatestData): Actionnaire[] => {
  const listActionnaire: Partial<ILatestData> = Object.keys(lastData)
    .filter(
      (key) =>
        key.startsWith("S") &&
        !key.startsWith("ManuelAuto") &&
        !key.startsWith("Seuil")
    )
    .reduce<any>((obj, key) => {
      obj[key as keyof ILatestData] = lastData[key as keyof ILatestData];
      return obj;
    }, {});

  const modesActionnaire: Partial<ILatestData> = Object.keys(lastData)
    .filter((key) => !key.startsWith("S") && key.startsWith("ManuelAuto"))
    .reduce<any>((obj, key) => {
      obj[key as keyof ILatestData] = lastData[key as keyof ILatestData];
      return obj;
    }, {});

  const data: Actionnaire[] = Object.keys(listActionnaire).map((key) => ({
    name: key,
    status: Boolean(listActionnaire[key as keyof ILatestData]),
    mode: Boolean(!modesActionnaire[`ManuelAuto${key}` as keyof ILatestData]),
  }));

  return data || [];
};

export const extractSingleActionnaire = (
  lastData: ILatestData,
  suffix: string | number
): Partial<ILatestData> => {
  const sKey = `S${suffix}` as keyof ILatestData;
  const manuelKey = `ManuelAutoS${suffix}` as keyof ILatestData;

  if (!(sKey in lastData) || !(manuelKey in lastData)) {
    throw new Error(
      `Les clés ${sKey} ou ${manuelKey} sont absentes des données.`
    );
  }

  const sValue = Number(lastData[sKey]) || 0;
  const manuelValue = Number(lastData[manuelKey]) || 0;

  return {
    [sKey]: sValue,
    [manuelKey]: manuelValue,
  };
};
