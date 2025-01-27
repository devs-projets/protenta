export const updateCulture = async (
  access_token: string,
  cultureId: string,
  serreId: string,
  data: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor/serre/${serreId}/cultures/${cultureId}`,
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
      throw Error("Erreur lors de la mise à jour de la culture.")
    }

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw Error("Error while updating ");
  }
};
