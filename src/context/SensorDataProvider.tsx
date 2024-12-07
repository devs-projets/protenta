"use client";

import Spinner from "@/components/Spinner";
import { fetchDayData } from "@/store/reducers/dayData/dayDataSlice";
import { fetchHourData } from "@/store/reducers/hourDate/hourDataSlice";
import { fetchMinuteData } from "@/store/reducers/minutesData/minutesDataSlice";
import { RootState, useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TriangleAlert } from "lucide-react";
import { fetchLatestData } from "@/store/reducers/latestData/latestDataSlice";

const SensorDataProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  // const { loading: minuteLoading, error: minuteError } = useSelector(
  //   (state: RootState) => state.minuteData
  // );

  const { loading: hourLoading, error: hourError } = useSelector(
    (state: RootState) => state.hourData
  );

  const { loading: dayLoading, error: dayError } = useSelector(
    (state: RootState) => state.dayData
  );

  const fetchLatestDataWithBackup = async () => {
    try {
      const data = await dispatch(fetchLatestData()).unwrap();
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
    // dispatch(fetchMinuteData());
    dispatch(fetchHourData());
    dispatch(fetchDayData());
  };

  useEffect(() => {
    fetchLatestDataWithBackup();
    fetchDatas();

    const interval = setInterval(fetchLatestDataWithBackup, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (hourLoading || dayLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Gestion des erreurs
  // const errorMessage =
  //   hourError || dayError
  //     ? "Une erreur est survenue lors du chargement des données."
  //     : null;

  // if (errorMessage) {
  //   return (
  //     <div className="h-screen flex flex-col justify-center items-center">
  //       <TriangleAlert size={40} />
  //       <p className="text-lg font-semibold my-4">{errorMessage}</p>
  //       <button
  //         className="bg-primary text-white px-4 py-2 rounded"
  //         onClick={fetchDatas}
  //       >
  //         Réessayer
  //       </button>
  //     </div>
  //   );
  // }

  return <div>{children}</div>;
};

export default SensorDataProvider;
