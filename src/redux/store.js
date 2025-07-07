import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice.js"

export const store = configureStore({
  reducer: {
    savedCities: cityReducer,
  },
})