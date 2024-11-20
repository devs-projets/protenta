"use client";

import Spinner from "@/components/Spinner";
import { fetchDayData } from "@/store/reducers/dayData/dayDataSlice";
import { fetchHourData } from "@/store/reducers/hourDate/hourDataSlice";
import { fetchMinuteData } from "@/store/reducers/minutesData/minutesDataSlice";
import { RootState, useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    dispatch(fetchMinuteData());
    dispatch(fetchHourData());
    dispatch(fetchDayData());
  }, [dispatch, minuteError, hourError, dayError]);

  if (minuteLoading || hourLoading || dayLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default SensorDataProvider;
