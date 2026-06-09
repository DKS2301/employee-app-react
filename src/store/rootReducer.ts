import { combineReducers } from "redux";

const rootReducer = combineReducers({
    employee: employeeReducer,
    department: departmentReducer,
})

export default rootReducer;