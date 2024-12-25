import { User } from "@/types/user";

export async function getCurrentUser(access_token: string): Promise<User> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token.replace(/"/g, '')}`
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Error while fetching user data");
  }
}
