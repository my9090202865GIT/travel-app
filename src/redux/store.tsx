import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice"
import LocReducer from "./features/locationSlice"

export const store = configureStore({
    reducer: {
        AuthReducer,
        LocReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
