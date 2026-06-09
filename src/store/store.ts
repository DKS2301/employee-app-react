// import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import employeeReducer from "./employee/employeeReducer";
import employeeBaseApi from "../api-services/employees/employees.api";

// const store = createStore(
//     rootReducer,
//     undefined,
//     // composedWithDevTools(applyMiddleware(logger))
// );

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        [employeeBaseApi.reducerPath]: employeeBaseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeeBaseApi.middleware)
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector<RootState, any>