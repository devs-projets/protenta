"use client";

import Spinner from "@/components/Spinner";
import { fetchDayData } from "@/store/reducers/dayData/dayDataSlice";
import { fetchHourData } from "@/store/reducers/hourDate/hourDataSlice";
import { fetchMinuteData } from "@/store/reducers/minutesData/minutesDataSlice";
import { RootState, useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {TriangleAlert} from "lucide-react";

const SensorDataProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { loading: minuteLoading, error: minuteError } = useSelector(
    (state: RootState) => state.minuteData
  );

  const { loading: hourLoading, error: hourError } = useSelector(
    (state: RootState) => state.hourData
  );

  const { loading: dayLoading, error: dayError } = useSelector(
    (state: RootState) => state.dayData
  );

  const fetchDatas = () => {
    dispatch(fetchMinuteData());
    dispatch(fetchHourData());
    dispatch(fetchDayData());
  }

  useEffect(() => {
    fetchDatas()
  }, [dispatch]);

  if (minuteLoading || hourLoading || dayLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Gestion des erreurs
  // const errorMessage =
  //   minuteError || hourError || dayError
  //     ? "Une erreur est survenue lors du chargement des données."
  //     : null;

  // if (errorMessage) {
  //   return (
  //     <div className="h-screen flex flex-col justify-center items-center">
  //       <TriangleAlert size={40} />
  //       <p className="text-lg font-semibold my-4">
  //         {errorMessage}
  //       </p>
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
