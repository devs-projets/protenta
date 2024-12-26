const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetchLogs = async (params = {}, access_token: string) => {
  const queryString = new URLSearchParams(params).toString();
  if (access_token) {
    throw Error("Token indisponible !");
  }
  console.log("From Journal", access_token);
  const response = await fetch(`${BASE_URL}/logs?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }
  return response.json();
};
export const fetchUsers = async (access_token: string) => {
  if (access_token) {
    throw Error("Token indisponible !");
  }
  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }
  return response.json();
};
export const fetchCapteurs = async (access_token: string) => {
  if (access_token) {
    throw Error("Token indisponible !");
  }
  const response = await fetch(`${BASE_URL}/monitor/capteurs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }
  return response.json();
};
