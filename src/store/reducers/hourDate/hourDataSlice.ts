import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoredSensorData } from "@/lib/fetchData/getMonitorData";
import { IHourDataState } from "@/types/hourDataState";

const initialState: IHourDataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchHourData = createAsyncThunk(
  "hourData/fetchHourData",
  async ({ serreId, cultureId }: { serreId: string; cultureId: string }) => {
    const token = localStorage.getItem("access_token");
    const data = await getStoredSensorData("hour", token as string, serreId, cultureId);
    return data || [];
  }
);

const hourDataSlice = createSlice({
  name: "hourData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHourData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchHourData.rejected, (state, action) => {
        state.error = action.error.message ?? "An unknown error occurred";
        state.loading = false;
      });
  },
});

export default hourDataSlice.reducer;
