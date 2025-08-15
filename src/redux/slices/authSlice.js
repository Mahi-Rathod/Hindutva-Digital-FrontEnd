import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isAdmin: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = true;
      state.error = null;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
