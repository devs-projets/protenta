export async function sendCommand(data: any, message: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-commande`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          `Une erreur s'est produite : \nStatus Code = ${
            parsedResponse?.statusCode
          }\nVeuillez réessayer...`
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
