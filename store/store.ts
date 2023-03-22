import { configureStore } from "@reduxjs/toolkit";

import converterSlice from './converter';

export const store = configureStore({
    reducer: {
        converterSlice: converterSlice
    }
});