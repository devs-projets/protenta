// export interface User {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   role: string;
// }

import { authUserService } from "@/lib/auth/userAuth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedUser: string | null = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;

const initialState: any = {
  access_token: storedUser,
};

export const authUser = createAsyncThunk(
  "loginUser",
  async (userCredentials: any) => {
    const data = await authUserService(userCredentials);
    return data || null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.access_token = action.payload;
      localStorage.setItem("access_token", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.access_token = null;
      localStorage.removeItem("access_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;