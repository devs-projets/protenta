import { INewSerre } from "@/types/serre";

export async function addSerre(access_token: string, data: INewSerre) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/systeme-config/add-serre`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.replace(/"/g, "")}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 201) {
      return true;
    } else {
      throw new Error(
        "Une erreur s'est produite lors de la création de la serre"
      );
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la communication avec le serveur. Vérifiez votre connexion.",
      error
    );
  }
}
