import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoredSensorData } from "@/lib/fetchData/getMonitorData";
import { IMinuteDataState } from "@/types/minuteDataState";

const initialState: IMinuteDataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchMinuteData = createAsyncThunk(
  "minuteData/fetchMinuteData",
  async () => {
    const data = await getStoredSensorData("minute");
    return data || [];
  }
);

const minuteDataSlice = createSlice({
  name: "minuteData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinuteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMinuteData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMinuteData.rejected, (state, action) => {
        state.error = action.error.message ?? "An unknown error occurred";
        state.loading = false;
      });
  },
});

export default minuteDataSlice.reducer;
