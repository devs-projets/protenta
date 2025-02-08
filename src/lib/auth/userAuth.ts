export interface IUserCredentials {
    userName: string;
    passWord: string;
  }
  
  export const authUserService = async (data: IUserCredentials): Promise<string | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error("Auth error")
      }
  
      const responseData = await res.json();
      
      return responseData.access_token;
  
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
      return null;
    }
  };
  