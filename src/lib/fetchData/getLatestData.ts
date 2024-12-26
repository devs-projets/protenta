import { ILatestData } from "@/types/latestDataState";

export async function getLatestData(
  access_token: string,
  dataType: string,
  capteurName?: string,
): Promise<ILatestData> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/monitor/latest-data?dataType=${dataType}${
        capteurName ? `&capteurName=${capteurName}` :""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token.replace(/"/g, '')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Error while fetching latest data");
  }
}
