import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    AddressResponse,
    CreateEmployeePayload,
    EmployeeResponse,
    EmployeeSearchPayload,
    UpdateAddressPayload,
    UpdateEmployeePayload,
} from './types';

const employeeBaseApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://0.0.0.0:8000',
        prepareHeaders: (headers) => {
            const access_token = localStorage.getItem('access_token');

            if (access_token) {
                headers.set('Authorization', `Bearer ${access_token}`);
            }

            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getEmployees: builder.query<EmployeeResponse[], void>({
            query: () => 'employee',
            providesTags: ['Employees'],
        }),
        getEmployeeById: builder.query<EmployeeResponse, number>({
            query: (id) => `employee/${id}`,
        }),
        getEmployeesByFilter: builder.query<EmployeeResponse[], EmployeeSearchPayload>({
            query: (params) => {
                return {
                    url: 'employee/search',
                    params,
                };
            },
            providesTags: ['Employees'],
        }),
        createEmployee: builder.mutation<EmployeeResponse, CreateEmployeePayload>({
            query: (payload) => {
                return {
                    url: 'employee',
                    method: 'POST',
                    body: payload,
                };
            },
            invalidatesTags: ['Employees'],
        }),
        updateEmployeeAddress: builder.mutation<AddressResponse, UpdateAddressPayload>({
            query: ({ id, address_id, ...payload }) => {
                return {
                    url: `employee/${id}/addresses/${address_id}`,
                    method: 'PUT',
                    body: payload,
                };
            },
            invalidatesTags: ['Employees'],
        }),
        updateEmployee: builder.mutation<EmployeeResponse, UpdateEmployeePayload>({
            query: ({ id, ...payload }) => {
                console.log('update payload', payload);
                return {
                    url: `employee/${id}`,
                    method: 'PUT',
                    body: payload,
                };
            },
            invalidatesTags: ['Employees'],
        }),
        deleteEmployee: builder.mutation<ResponseType, number>({
            query: (id) => {
                return {
                    url: `employee/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Employees'],
        }),
    }),
    tagTypes: ['Employees'],
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeAddressMutation,
    useGetEmployeesByFilterQuery,
    useLazyGetEmployeesByFilterQuery,
    useLazyGetEmployeesQuery,
    useLazyGetEmployeeByIdQuery,
} = employeeBaseApi;

export default employeeBaseApi;
