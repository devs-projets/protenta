import { User } from "@/types/user";

export interface IDeletedUser {
    message: string;
    deletedUser: User
}

export async function deleteUser(access_token: string, id: string): Promise<IDeletedUser> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token.replace(/"/g, '')}`,
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
    throw Error("Error while trying delete user data");
  }
}
