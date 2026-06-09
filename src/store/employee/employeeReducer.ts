import { EMPLOYEE_ACTION_TYPES } from "./employee.types"


const initialState: EmployeeState = {
    employees: initialEmployees,
}

export const reducer = (
    state: EmployeeState = initialState,
    action: EmployeeAction
) : EmployeeeState => {
    switch(action.type){
        case(EMPLOYEE_ACTION_TYPES.ADD):{ 
            const record = action.payload,
            return {...state, employees:{...state.employees,record}} 
        }
        
    }
}
