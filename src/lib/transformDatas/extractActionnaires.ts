import { ILatestData } from "@/types/latestDataState";

export const extractActionnaires = (
  lastData: ILatestData
): Partial<ILatestData> => {
  return Object.keys(lastData)
    .filter(
      (key): key is keyof ILatestData =>
        (key.startsWith("S") && !key.startsWith("Seuil")) ||
        key.startsWith("ManuelAutoS")
    )
    .reduce((acc, key) => {
      if (key.startsWith("S")) {
        const manuelKey = `ManuelAuto${key}` as keyof ILatestData;
        const sValue = Number(lastData[key]) || 0;
        const manuelValue = Number(lastData[manuelKey]) || 0;
        (acc as any)[key] = sValue - manuelValue;
      } else {
        (acc as any)[key] = Number(lastData[key]) || 0;
      }
      return acc;
    }, {} as Partial<ILatestData>);
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
