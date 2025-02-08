export const defineCurrentSerre = async (
  access_token: string,
  serreId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/current-serre?serre=${serreId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.replace(/"/g, "")}`,
        },
        body: JSON.stringify({}),
      }
    );
  } catch (err) {
    console.error(err);
    throw Error("Error while define the serre ");
  }
};
