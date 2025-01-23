import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import postReducer from './slices/postSlice.js';
import themeReducer from './slices/themeSlice.js';
import dashboardReducer from './slices/dashboardSlice.js';

export default configureStore({
    reducer:{
        auth : authReducer,
        post : postReducer,
        theme: themeReducer,
        dashboard : dashboardReducer,
    }
});