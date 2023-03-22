import { createSlice } from "@reduxjs/toolkit";

const converterSlice = createSlice({
    name: 'converterSlice',
    initialState: {
        fromCurrency: "EUR",
        toCurrency: "PLN"
    },
    reducers: {
        setFromCurrency: (state, action) => {
            state.fromCurrency = action.payload.fromCurrency;
        },
        setToCurrency: (state, action) => {
            state.toCurrency = action.payload.toCurrency;
        },
        
    }
})

export const setFromCurrency = converterSlice.actions.setFromCurrency;
export const setToCurrency = converterSlice.actions.setToCurrency;
export default converterSlice.reducer;