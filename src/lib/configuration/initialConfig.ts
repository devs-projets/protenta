import { InitialConfigType } from "@/components/cultures/InitialConfig";

export async function initialConfiguration(
  access_token: string,
  serreId: string,
  cultureId: string,
  data: InitialConfigType
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor/serre/${serreId}/cultures/${cultureId}/initial-config`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.replace(/"/g, "")}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response) {
      const errorResponse = response;
      throw new Error(errorResponse);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating initial config");
  }
}
