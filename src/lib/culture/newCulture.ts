import { ICulture } from "@/types/culture";

export async function addCulture(access_token: string, serreId: string, data: Partial<ICulture>) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor/add-cultures/${serreId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse)
    }

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw new Error("Error while creating culture");
  }
}
