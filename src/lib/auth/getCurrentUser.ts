import { User } from "@/types/user";
import { defineCurrentSerre } from "../serre/currentSerre";
import { EUserRole } from "@/types/userRole";

export async function getCurrentUser(access_token: string): Promise<User> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.replace(/"/g, "")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const user = await response.json();
    if (user && user.role !== EUserRole.DEV) {
      const serreId = user.allSerre[0].id;
      await defineCurrentSerre(access_token, serreId);
    }
    return user;
  } catch (error) {
    console.error(error);
    throw Error("Error while fetching user data");
  }
}
