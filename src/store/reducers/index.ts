import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import serreReducer from "./serre/serreSlice";
import latestDataReducer from "./latestData/latestDataSlice";
import minuteDataReducer from "./minutesData/minutesDataSlice";
import hourDataReducer from "./hourDate/hourDataSlice";
import dayDataReducer from "./dayData/dayDataSlice";

const rootReducer = combineReducers({
  // auth: authReducer,
  serre: serreReducer,
  latestData: latestDataReducer,
  minuteData: minuteDataReducer,
  hourData: hourDataReducer,
  dayData: dayDataReducer,
});

export default rootReducer;
