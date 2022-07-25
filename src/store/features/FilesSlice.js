import { createSlice } from "@reduxjs/toolkit";

export const FilesSlice = createSlice({
    name: "files",
    initialState: {
        files: false
    },
    reducers: {
        SET_FILES: (state, action) => {
            state.files = action.payload;
        }
    }
});

export const { SET_FILES } = FilesSlice.actions;

export const selectFiles = state => state.files.files;

export default FilesSlice.reducer;