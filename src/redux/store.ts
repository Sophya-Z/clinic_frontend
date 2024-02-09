import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { doctorApi } from "./doctorApi";

const rootReducer = combineReducers({
    [doctorApi.reducerPath]: doctorApi.reducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(doctorApi.middleware)
    });
}

export const store = setupStore();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']