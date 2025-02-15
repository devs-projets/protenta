import { Actionnaire } from "@/components/settingsComponents/actionnaireTabs/ActionnaireList";
import { ManuelAutoKeys, SKeys } from "@/types/actionnaireState";
import { ILatestData } from "@/types/latestDataState";

// TODO: Check ça
export const extractActionnaires = (lastData: ILatestData): Actionnaire[] => {
  const listActionnaire = Object.keys(lastData)
    .filter(
      (key): key is keyof SKeys =>
        key.startsWith("S") &&
        !key.startsWith("ManuelAuto") &&
        !key.startsWith("Seuil")
    )
    .reduce<SKeys>((obj, key) => {
      obj[key] = lastData[key];
      return obj;
    }, {} as SKeys);

  const modesActionnaire = Object.keys(lastData)
    .filter((key): key is keyof ManuelAutoKeys => key.startsWith("ManuelAuto"))
    .reduce<ManuelAutoKeys>((obj, key) => {
      obj[key] = lastData[key];
      return obj;
    }, {} as ManuelAutoKeys);

  const data: Actionnaire[] = (
    Object.keys(listActionnaire) as Array<keyof SKeys>
  ).map((key) => ({
    name: key,
    status: Boolean(listActionnaire[key]),
    mode: Boolean(
      !modesActionnaire[
        `ManuelAuto${key.replace("S", "")}` as keyof ManuelAutoKeys
      ]
    ),
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
