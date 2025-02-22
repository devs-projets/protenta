import { ICreateUser, User } from "@/types/user";

export async function createNewUser(
  access_token: string,
  data: ICreateUser
): Promise<User | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw Error("Error while creating user");
  }
}
