export const addEmployeeActionCreator = (employee: Employee) => {
    return {
        type: EMPLOYEE_ACTION_TYPES.ADD,
        payload: employee,
    };
}