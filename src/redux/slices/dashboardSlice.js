import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    dashboardData : {
        totalPosts : 0,
        totalUsers : 0,
        totalCategories : 0,
        pendingPosts : 0
    },
    allPosts : [],
    recentActivies : [],
    status: "idle",
    error : null
}

export const fetchDashboardData = createAsyncThunk("dashboard/fetchDashboard", async()=>{
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard`, {withCredentials: true});
    console.log(res.data.allPosts);
    return res.data;
});


const dashboardSlice = createSlice({
    name : "dashboard",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state)=>{
                state.status = "loading";
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                const { totalPosts, totalUsers, totalCategories, totalPendingPosts, allPosts } = action.payload;

                state.dashboardData.totalPosts = totalPosts;
                state.dashboardData.totalUsers = totalUsers;
                state.dashboardData.totalCategories = totalCategories;
                state.dashboardData.pendingPosts = totalPendingPosts;
                state.allPosts = allPosts;
                state.status = 'fulfilled';
                state.error = null;
            })
    }
})

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;