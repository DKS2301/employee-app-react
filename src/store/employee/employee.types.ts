export interface Address {
    line1: string;
    line2: string;
    city: string,
    country: string,
    postal_code: string
}

export type EmployeeStatus =
    | "Active"
    | "Probation"
    | "Inactive";

export interface EmployeeRecord {
    id: string;
    name: string;
    joiningDate: string; // YYYY-MM-DD
    email: string,
    role: string;
    status: EmployeeStatus;

    experience: string;
    // departmentId: number | string;

    address?: Address;
}

export const EMPLOYEE_ACTION_TYPES = {
    ADD: "employee/ADD",
    UPDATE: "employee/UPDATE",
    DELETE: "employee/DELETE",
} as const;

export interface EmployeeState {
    employees: EmployeeRecord[];
}

export interface AddEmployeeAction {
    type: typeof EMPLOYEE_ACTION_TYPES.ADD;
    payload: EmployeeRecord;
}

export interface UpdateEmployeeAction {
    type: typeof EMPLOYEE_ACTION_TYPES.UPDATE;
    payload: EmployeeRecord;
}

export interface DeleteEmployeeAction {
    type: typeof EMPLOYEE_ACTION_TYPES.DELETE;
    payload: string; // employee id
}

export type EmployeeAction =
    | AddEmployeeAction
    | UpdateEmployeeAction
    | DeleteEmployeeAction;