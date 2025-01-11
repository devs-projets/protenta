"use client";

import CapteurDataCardList from "@/components/capteurs/CapteurDataCardList";
import CapteurTab from "@/components/capteurs/CapteurTab";
import IndividualCapteurCard from "@/components/capteurs/IndividualCapteurCard";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getLatestData } from "@/lib/fetchData/getLatestData";
import { ILatestData } from "@/types/latestDataState";
import Spinner from "@/components/Spinner";
import { TriangleAlert } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CapteurId = () => {
  const localName = useParams().capteurId as string;
  const { sensorData, disconnect } = useSocket();
  const [data, setData] = useState<ILatestData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useSelector((state: RootState) => state.auth);
  const { currentSerre, activeCulture } = useSelector((state: RootState) => state.serre);

  const getThisCapteurLastData = async () => {
    setLoading(true);
    setError(null);
    if (!access_token) {
      throw Error("Token not found !");
    }

    if (!currentSerre) {
      console.error('Serre not found !');
      return;
    }

    if (!activeCulture) {
      throw Error("Une culture active");
    }

    try {
      const response = await getLatestData(
        access_token,
        currentSerre.id,
        activeCulture.id,
        "capteur",
        localName
      );
      setData(response);
    } catch (err) {
      console.error("An error occurred while fetching capteur data", err);
      setError("Une erreur est survenue lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  // Load la dernier donnée rélative à ce captueur depuis la DB
  useEffect(() => {
    getThisCapteurLastData();
  }, []);

  // Met à jours le rendu si le capteur envoie de nouvelle données via socket
  useEffect(() => {
    if (sensorData && sensorData.localName === localName) {
      setData(sensorData);
    }
  }, [sensorData]);

  // TODO : A supprimer si nous devons avoir l'écoute de la
  // socket en continue. => Actuellement la connexion est perdu si l'on switch de page
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <TriangleAlert size={40} />
        <p className="text-lg text-center font-semibold my-4">{error}</p>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={getThisCapteurLastData}
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600">Aucune donnée disponible.</p>
      </div>
    );
  }

  return (
    <div>
      <IndividualCapteurCard sensorData={data} localName={localName} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 px-3">
        <CapteurDataCardList sensorData={data} localName={localName} />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="bg-muted/50 rounded-xl p-5 mb-5">
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                <CapteurTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapteurId;
