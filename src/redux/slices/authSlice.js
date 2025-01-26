import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    user : null,
    error : null,
    isAdmin : false,
    name : 'Mahesh',
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        loginSuccess : (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isAdmin = true;
            state.error = null;
        },
        loginFailure : (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload;
            console.log(action.payload);
        },
        logoutSuccess : (state, action) =>{
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        }
    }
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;