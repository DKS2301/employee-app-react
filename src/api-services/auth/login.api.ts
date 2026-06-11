import employeeBaseApi from "../employees/employees.api";

export const loginApi = employeeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: ({username, password}) => {

                const formData = new URLSearchParams();
                
                formData.append("username", username);
                formData.append("password", password);
            
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: formData,
                }
            }
        }),

    }),
});

export const {useLoginMutation}  = loginApi;