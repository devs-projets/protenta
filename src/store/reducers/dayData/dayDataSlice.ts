import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoredSensorData } from "@/lib/fetchData/getMonitorData";
import { IDayDataSate } from "@/types/daysDataState";

const initialState: IDayDataSate = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDayData = createAsyncThunk(
  "dayData/fetchDayData",
  async (serreId: string) => {
    const token = localStorage.getItem("access_token");
    const data = await getStoredSensorData("day", token as string, serreId);
    return data || [];
  }
);

const dayDataSlice = createSlice({
  name: "dayData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDayData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDayData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDayData.rejected, (state, action) => {
        state.error = action.error.message ?? "An unknown error occurred";
        state.loading = false;
      });
  },
});

export default dayDataSlice.reducer;
