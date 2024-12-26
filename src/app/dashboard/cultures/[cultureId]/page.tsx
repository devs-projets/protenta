"use client";

import Spinner from "@/components/Spinner";
import { getAllSerres } from "@/lib/serre/getAllSerres";
import { RootState } from "@/store/store";
import { ICulture } from "@/types/culture";
import { TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [culture, setCulture] = useState<ICulture | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const { cultureId } = useParams();
  const { access_token } = useSelector((state: RootState) => state.auth);

  const fetchSerre = async () => {
    if (!access_token) {
      throw Error("No access token found");
    }

    try {
      setLoading(true);
      if (error) {
        setError(null);
      }
      const response = await getAllSerres("access_token");
      if (response) {
        const thisCulture = response[0].allCulture.filter(
          (x: ICulture) => x.id === cultureId
        )[0];

        setCulture(thisCulture);
        const start = new Date(
          thisCulture.startProduction
        ).toLocaleDateString();
        setStartDate(start);
        const end =
          thisCulture.endProduction &&
          new Date(thisCulture.endProduction).toLocaleDateString();
        setEndDate(end);
      }
    } catch (error) {
      console.error("Faild to fetch serres");
      setError(
        "Une erreur s'est produite lors de la récupération de la culture \nVeuillez Réessayer"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSerre();
  }, [access_token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <TriangleAlert size={40} />
        <p className="text-lg font-semibold my-4 text-center">{error}</p>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={fetchSerre}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-center text-4xl my-3 shadow-md py-4">
        Culture details
      </h1>
      <div className="max-w-[700px] border-[1px] mx-auto rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Nom : <span className="font-bold">{culture?.name}</span>
            </p>
          </div>
          <div className="border-2 rounded-lg p-2">
            <p>
              Statut :{" "}
              <span className="font-bold">{culture?.productionIsEnded ? "Inactive" : "Active"}</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Variété : <span className="font-bold">{culture?.variety}</span>
            </p>
          </div>
          <div className="border-2 rounded-lg p-2">
            <p>
              Type : <span className="font-bold">{culture?.type}</span>
            </p>
          </div>
        </div>

        <div className="my-2 border-2 rounded-lg p-2">
          <p>
            Description : <br />{" "}
            <span className="font-bold">{culture?.description}</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <div className="border-2 rounded-lg p-2">
            <p>
              Date de début : <span className="font-bold">{startDate}</span>
            </p>
          </div>
          {endDate && (
            <div className="border-2 rounded-lg p-2">
              <p>
                Date de Fin : <span className="font-bold">{endDate}</span>
              </p>
            </div>
          )}
        </div>

        <div>
          <button className="bg-primary p-2 rounded-lg w-full text-white">End</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
