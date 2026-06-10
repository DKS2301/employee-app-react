import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { EmployeeRecord } from "../../store/employee/employee.types";
import type { EmployeePayload } from "../../pages/EmployeeCreate/EmployeeCreate";

const employeeBaseApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://0.0.0.0:8000",
        prepareHeaders: (headers) => {
            const access_token = localStorage.getItem("access_token");

            if(access_token){
                headers.set("Authorization", `Bearer ${access_token}`)
            }

            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({	
        getEmployees: builder.query<object[], void>({
            query: () => 'employee',
            providesTags: ['Employees']
        }),
        getEmployeeById: builder.query<ResponseType, number>({
            query: (id) => `employee/${id}`
        }),
        getEmployeesByFilter: builder.query<ResponseType, EmployeePayload>({
            query: (params) => {
                return {
                    url: 'employee/search',
                    params
                }
            },
            // invalidatesTags: ['Employees']
        }),
        createEmployee: builder.mutation<EmployeeResponse, EmployeePayload>({
            query: (payload) => {
                return {
                    url: 'employee',
                    method: "POST",
                    body: payload,
                }
            },
            invalidatesTags: ['Employees']
        }),
        updateEmployeeAddress: builder.mutation<AddressResponse, AddressPayload>({
            query: ({id, address_id, ...payload}) => {
                return {
                    url: `employee/${id}/addresses/${address_id}`,
                    method: "PUT",
                    body: payload,
                }
            },
            invalidatesTags: ['Employees']
        }),
        updateEmployee: builder.mutation<ResponseType, RequestType>({
            query: ({id, ...payload}) => {
                console.log("update payload", payload)
                return {
                    url: `employee/${id}`,
                    method: "PUT",
                    body: payload,
                }
            },
            invalidatesTags: ['Employees']
        }),
        deleteEmployee: builder.mutation<EmployeeResponse, number>({
            query: (id) => {
                return {
                    url: `employee/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['Employees']
        }),
    }),
    tagTypes: ['Employees'],
})

	
export const {
  useGetEmployeesQuery, useGetEmployeeByIdQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation, useUpdateEmployeeAddressMutation, useGetEmployeesByFilterQuery
} = employeeBaseApi;

export default employeeBaseApi;