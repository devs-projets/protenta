import { getAllSerres } from "@/lib/serre/getAllSerres";
import { ICulture } from "@/types/culture";
import { ISerre } from "@/types/serre";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ISerreState {
  serres: ISerre[] | null;
  currentSerre: ISerre | null;
  allCulture: ICulture[] | null;
  activeCulture: ICulture | null;
  loading: boolean;
  error: string | null;
}

const storedUser: string | null =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const lastSelectedSerre: string | null =
  typeof window !== "undefined"
    ? localStorage.getItem("lastSelectedSerre")
    : null;

const initialState: ISerreState = {
  serres: null,
  currentSerre: null,
  allCulture: null,
  activeCulture: null,
  loading: false,
  error: null,
};

export const currentSerre = createAsyncThunk("serre/cultures", async () => {
  const data = await getAllSerres(storedUser as string);
  return data || null;
});

const serreSlice = createSlice({
  name: "serre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currentSerre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentSerre.fulfilled, (state, action) => {
        const payload = action.payload;

        const selectedSerre =
          payload.find((s: ISerre) => s.id === lastSelectedSerre) ?? payload[0];

        localStorage.setItem('lastSelectedSerre', selectedSerre.id) 

        const thisActiveCulture =
          selectedSerre.allCulture?.find(
            (c: ICulture) => !c.productionIsEnded
          ) ?? null;

        state.serres = payload;
        state.currentSerre = selectedSerre;
        state.allCulture = selectedSerre.allCulture;
        state.activeCulture = thisActiveCulture;
        state.loading = false;
      })
      .addCase(currentSerre.rejected, (state, action) => {
        state.error = action.error.message ?? "An unknown error occurred";
        state.loading = false;
      });
  },
});

export default serreSlice.reducer;
