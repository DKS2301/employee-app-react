import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const employeeBaseApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://0.0.0.0:8000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            console.log("token",token);

            if(token){
                headers.set("Authorization", `Bearer ${token}`)
            }

            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: () => ({}),
})

export default employeeBaseApi;