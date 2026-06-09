export interface empoyeeRecord{
    role: string,
    status: string,
    experience: string,
    departmentId: number | string;
    address?: string
}

export const EMPLOYEE_ACTION_TYPES = {
    ADD: "employee/ADD",
    UPDATE: "employee/UPDATE",
    DELETE: "employee/DELETE"
} as const