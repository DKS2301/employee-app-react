import { EMPLOYEE_ACTION_TYPES, type EmployeeRecord } from "./employee.types";

export const addEmployeeActionCreator = (employee: EmployeeRecord) => {
    return {
        type: EMPLOYEE_ACTION_TYPES.ADD,
        payload: employee,
    };
}