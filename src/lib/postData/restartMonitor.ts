import { toast } from "sonner";

export async function restartMonitor(access_token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor-restart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          status: true,
        }),
      }
    );

    if (response.ok) {
      return response.ok;
    } else {
      throw new Error("Une erreur s'est produite, veuillez réessayer !")
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
    toast.error(
      "Une erreur s'est produite lors de la communication avec le serveur. Vérifiez votre connexion."
    );
  }
}
