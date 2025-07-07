import { createSlice } from "@reduxjs/toolkit";


export const citySlice = createSlice({
  name: 'savedCities',
  initialState: { cities: [] },
  reducers: {
    addCity: (state, action) => {
      if (!state.cities.includes(Number(action.payload))){
        state.cities.push(Number(action.payload))
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(cityId => cityId !== action.payload).slice()
    },
    setCities: (state, action) => {
      state.cities = action.payload
    },
    clearCities: (state) => {
      state.cities = []
    }
  },
})

export const { addCity, removeCity, setCities,clearCities } = citySlice.actions

export default citySlice.reducer