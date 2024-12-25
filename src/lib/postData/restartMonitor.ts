export async function restartMonitor(access_token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor-restart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token.replace(/"/g, '')}`,
        },
        body: JSON.stringify({
          status: true,
        }),
      }
    );

    if (response.ok) {
      alert("Monitor restarted !");
    } else {
      const errorMessage = await response.json();
      alert(
        `Une erreur s'est produite : \nStatus Code = ${
          errorMessage && errorMessage.statusCode
        }\nVeuillez réessayer...`
      );
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
    alert(
      "Une erreur s'est produite lors de la communication avec le serveur. Vérifiez votre connexion."
    );
  }
}
