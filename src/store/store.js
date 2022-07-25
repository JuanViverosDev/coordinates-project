import FilesSlice from "./features/FilesSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        files: FilesSlice
    }
})