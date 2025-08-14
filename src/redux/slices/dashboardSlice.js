import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deletePost } from "./postSlice";

const initialState = {
  dashboardData: {
    totalPosts: 0,
    totalUsers: 0,
    totalCategories: 0,
    pendingPosts: 0,
  },
  allPosts: [],
  recentActivies: [],
  status: "idle",
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/dashboard`,
      { withCredentials: true }
    );
    console.log(res.data.allPosts);
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        const {
          totalPosts,
          totalUsers,
          totalCategories,
          totalPendingPosts,
          allPosts,
        } = action.payload;

        state.dashboardData.totalPosts = totalPosts;
        state.dashboardData.totalUsers = totalUsers;
        state.dashboardData.totalCategories = totalCategories;
        state.dashboardData.pendingPosts = totalPendingPosts;
        state.allPosts = allPosts;
        state.status = "fulfilled";
        state.error = null;
      })
      // Handle post deletion
      .addCase(deletePost.fulfilled, (state, action) => {
        // Remove the deleted post from allPosts
        state.allPosts = state.allPosts.filter(
          (post) => post.id !== action.payload.id
        );
        // Update dashboard counts
        state.dashboardData.totalPosts = Math.max(
          0,
          state.dashboardData.totalPosts - 1
        );
        // If it was a pending post, update pending count too
        if (
          state.allPosts.find((post) => post.id === action.payload.id)
            ?.status === "Pending"
        ) {
          state.dashboardData.pendingPosts = Math.max(
            0,
            state.dashboardData.pendingPosts - 1
          );
        }
      });
  },
});

export const actions = dashboardSlice.actions;

export default dashboardSlice.reducer;
