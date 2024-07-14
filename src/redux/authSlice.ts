import { Tokens, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
} = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: JSON.parse(localStorage.getItem("user")!),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; tokens: Tokens }>
    ) => {
      state.accessToken = action.payload.tokens.access.token;
      state.refreshToken = action.payload.tokens.refresh.token;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.tokens.access.token);
      localStorage.setItem("refreshToken", action.payload.tokens.refresh.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
