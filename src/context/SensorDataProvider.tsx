"use client";

import Spinner from "@/components/Spinner";
import { fetchDayData } from "@/store/reducers/dayData/dayDataSlice";
import { fetchHourData } from "@/store/reducers/hourDate/hourDataSlice";
import { currentUser } from "@/store/reducers/auth/authSlice";
import { fetchMinuteData } from "@/store/reducers/minutesData/minutesDataSlice";
import { RootState, useAppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TriangleAlert } from "lucide-react";
import { fetchLatestData } from "@/store/reducers/latestData/latestDataSlice";
import { currentSerre } from "@/store/reducers/serre/serreSlice";

const SensorDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [serreLoaded, setSerreLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.auth);

  const {
    serre,
    activeCulture,
    loading: serreLoading,
    error: serreError,
  } = useSelector((state: RootState) => state.serre);

  const { loading: hourLoading, error: hourError } = useSelector(
    (state: RootState) => state.hourData
  );

  const { loading: dayLoading, error: dayError } = useSelector(
    (state: RootState) => state.dayData
  );

  const fetchLatestDataWithBackup = async () => {
    if (!serre) {
      console.error("No serre found !");
      return;
    }

    if (!activeCulture) {
      console.error("No serre found !");
      return;
    }

    try {
      const data = await dispatch(fetchLatestData({serreId: serre.id, cultureId: activeCulture?.id})).unwrap();
      localStorage.setItem("latestData", JSON.stringify(data));
    } catch {
      const localData = localStorage.getItem("latestData");
      if (localData) {
        const parsedData = JSON.parse(localData);
        dispatch({ type: "latestData/loadLocalData", payload: parsedData });
      }
    }
  };

  const fetchDatas = () => {
    dispatch(currentUser());
    dispatch(currentSerre());
  };

  // Fetch serre and user information
  useEffect(() => {
    fetchDatas();
  }, [dispatch]);

  // Fetch hour and day data when serre is ready
  useEffect(() => {
    if (serre && serre.id && activeCulture && activeCulture.id) {
      dispatch(
        fetchHourData({ serreId: serre.id, cultureId: activeCulture.id })
      );
      dispatch(
        fetchDayData({ serreId: serre.id, cultureId: activeCulture.id })
      );
    }
  }, [serre, dispatch]);

  // Fetch latest data periodically
  useEffect(() => {
    fetchLatestDataWithBackup();

    const interval = setInterval(fetchLatestDataWithBackup, 1000);
    return () => clearInterval(interval);
  }, [dispatch, serre]);

  if (hourLoading || dayLoading || userLoading || serreLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Gestion des erreurs
  const errorMessage =
    hourError || dayError || userError || serreError
      ? "Une erreur est survenue lors du chargement des données."
      : null;

  if (errorMessage) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <TriangleAlert size={40} />
        <p className="text-lg font-semibold my-4">{errorMessage}</p>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={fetchDatas}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default SensorDataProvider;
