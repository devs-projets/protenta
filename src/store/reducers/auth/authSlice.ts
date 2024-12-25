import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { authUserService } from "@/lib/auth/userAuth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedUser: string | null =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const initialState: any = {
  access_token: storedUser,
  user: null,
  loading: false,
  error: null,
};

export const currentUser = createAsyncThunk("auth/currentUser", async () => {
  const data = await getCurrentUser(storedUser as string);
  return data || null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      const token = action.payload;
      state.access_token = token;
      localStorage.setItem("access_token", JSON.stringify(token));
    },
    logout: (state) => {
      state.access_token = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.error = action.error.message ?? "An unknown error occurred";
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
