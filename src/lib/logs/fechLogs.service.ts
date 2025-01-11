export const fetchLogs = async (params = {}, access_token: string, serreId: string, cultureId: string) => {
  const queryString = new URLSearchParams(params).toString();
  console.log("From Journal", access_token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL }/logs/${serreId}/cultures/${cultureId}?${queryString}`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL }/users`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL }/monitor/capteurs`, {
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
