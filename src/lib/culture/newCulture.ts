export async function addCulture(access_token: string, serreId: string, data: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor/add-cultures/${serreId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token.slice(1, -1)}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(
        `Erreur lors de l'ajout d'une nouvelle culture :\n ${
          errorResponse.message || "Erreur inconnue"
        }`
      );
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw Error("Error while creating user");
  }
}
