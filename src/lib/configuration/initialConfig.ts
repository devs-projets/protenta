export async function initialConfiguration(
  access_token: string,
  serreId: string,
  cultureId: string,
  data: any
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

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(
        `Erreur lors de la configuration de la serre :\n ${
          errorResponse.message || "Erreur inconnue"
        }`
      );
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    throw Error("Error while creating initial config");
  }
}
