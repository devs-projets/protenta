export async function sendCommand(
  serreId: string,
  cultureId: string,
  data: any,
  message: string,
  access_token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-commande?serre=${serreId}&culture=${cultureId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.replace(/"/g, "")}`,
        },
        body: JSON.stringify(data),
      }
    );

    const responseText = await response.text(); // Lecture brute
    try {
      const parsedResponse = responseText ? JSON.parse(responseText) : null;

      if (response.ok) {
        alert(message);
        return { success: true, data: parsedResponse };
      } else {
        alert(
          `Une erreur s'est produite : \nStatus Code = ${parsedResponse?.statusCode}\nVeuillez réessayer...`
        );
        return { success: false, error: parsedResponse };
      }
    } catch (jsonError) {
      console.error("Erreur lors du parsing JSON :", jsonError, responseText);
      throw new Error("Erreur lors du parsing JSON.");
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
    alert(
      "Une erreur s'est produite lors de la communication avec le serveur. Vérifiez votre connexion."
    );
    return { success: false, error };
  }
}
