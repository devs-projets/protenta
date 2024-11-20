import { combineReducers } from "@reduxjs/toolkit";
import minuteDataReducer from "./minutesData/minutesDataSlice";
import hourDataReducer from "./hourDate/hourDataSlice";
import dayDataReducer from "./dayData/dayDataSlice";

const rootReducer = combineReducers({
  minuteData: minuteDataReducer,
  hourData: hourDataReducer,
  dayData: dayDataReducer,
});

export default rootReducer;
