import { IUpdateUser, User } from "@/types/user";

export async function updateUser(
  access_token: string,
  data: Partial<IUpdateUser>,
  id: string
): Promise<User | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(
        `Erreur lors de la mise à jours :\n ${
          errorResponse.message || "Erreur inconnue"
        }`
      );
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw Error("Error while updating user");
  }
}
