const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetchLogs = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/logs?${queryString}`, {
     
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjYzZmVkMy1lZGE1LTRiNDMtYTIwMy0xN2VkZjRjY2YwODUiLCJlbWFpbCI6ImFkbWluLXNlcnJlIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1MTQxNjMwLCJleHAiOjE3MzU4MzI4MzB9.FPmlaOff7JhKYsBByDLpq2ybWhYY-7dU1yD01yakuww`, 
            },   
        
    });
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    return response.json();
  };
export const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`, {
     
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjYzZmVkMy1lZGE1LTRiNDMtYTIwMy0xN2VkZjRjY2YwODUiLCJlbWFpbCI6ImFkbWluLXNlcnJlIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1MTQxNjMwLCJleHAiOjE3MzU4MzI4MzB9.FPmlaOff7JhKYsBByDLpq2ybWhYY-7dU1yD01yakuww`,
            },   
        
    });
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    return response.json();
  };
export const fetchCapteurs = async () => {
    const response = await fetch(`${BASE_URL}/monitor/capteurs`, {
     
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjYzZmVkMy1lZGE1LTRiNDMtYTIwMy0xN2VkZjRjY2YwODUiLCJlbWFpbCI6ImFkbWluLXNlcnJlIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1MTQxNjMwLCJleHAiOjE3MzU4MzI4MzB9.FPmlaOff7JhKYsBByDLpq2ybWhYY-7dU1yD01yakuww`, 
            },   
        
    });
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    return response.json();
  };