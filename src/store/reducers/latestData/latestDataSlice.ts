import { getLatestData } from "@/lib/fetchData/getLatestData";
import { ILatestDataState } from "@/types/latestDataState";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILatestDataState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchLatestData = createAsyncThunk(
  "latestData/fetchLatestData",
  async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw Error('Token not found !')
    }
    const data = await getLatestData(token, 'monitor');
    return data;
  }
);

const latestDataSlice = createSlice({
  name: "latestData",
  initialState,
  reducers: {
    loadLocalData: (state, action: PayloadAction<ILatestDataState["data"]>) => {
      state.data = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLatestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestData.rejected, (state, action) => {
        state.error = action.error.message ?? "An unknown error occurred";
        state.loading = false;
      });
  }
});

export const { loadLocalData } = latestDataSlice.actions;
export default latestDataSlice.reducer;