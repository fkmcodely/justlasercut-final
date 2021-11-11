import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./reducers/configurationSlice";
export const store = configureStore({
    reducer: {
        configuration: configurationSlice
    },
});
