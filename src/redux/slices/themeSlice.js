import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLight : false
}

const themeSlice = createSlice({
    name : "theme",
    initialState,
    reducers : {
        loadTheme : (state) =>{
            state.isLight = JSON.parse(localStorage.getItem("Theme")) || state.isLight;
        },
        toggleTheme : (state) =>{
            state.isLight = !state.isLight;
            localStorage.setItem("Theme", JSON.stringify(state.isLight));
        }
    }
});


export const { toggleTheme, loadTheme } = themeSlice.actions;

export default themeSlice.reducer;