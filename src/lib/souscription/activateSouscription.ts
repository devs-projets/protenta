export async function activateSouscription(
  access_token: string,
  subscription: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/systeme-config/subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ subscription }),
      }
    );

    if (response.status === 201) {
        return true;
    } else {
        throw new Error("Une erreur s'est produite, veuillez réessayer !")
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
  }
}


// Mock validation 
export async function validateLicense(licenseKey: string) {
  if (licenseKey === "ABCDEFGHIJKLMNOPQRST") {
    return { success: true };
  } else {
    return { success: false, message: "Clé de licence invalide" };
  }
}