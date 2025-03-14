import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { json_type } from "../../models/json_type"

type initialStateType = {
    locations: Array<string>,
    images: json_type[],
    currentLocation: string
}
interface action_type {
    locations: Array<string>,
    images: json_type[]
}

const initialState: initialStateType = {
    locations: [],
    images: [],
    currentLocation: "all",
};

export const locSlice = createSlice({
    name: "locSlice",
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<action_type>) => {
            return { ...state, locations: action.payload.locations, images: action.payload.images }
        },
        addCurrentLocation: (state, action: PayloadAction<{ currentLocation: string }>) => {
            return { ...state, currentLocation: action.payload.currentLocation };
        }
    }
});

export const { addLocation, addCurrentLocation } = locSlice.actions;
export default locSlice.reducer;
