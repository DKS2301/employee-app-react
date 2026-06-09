import { EMPLOYEE_ACTION_TYPES, type AddEmployeeAction, type EmployeeAction, type EmployeeRecord, type EmployeeState } from "./employee.types"
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: EmployeeState = {
    employees: [
    {
        id: "1",
        name: "John Doe",
        joiningDate: "2023-01-15",
        role: "Full Stack",
        status: "Active",
        experience: "3 Years",
        address: {
        line1: "12 Park Avenue",
        line2: "Sector 5",
        city: "Bengaluru",
        country: "India",
        postalCode: "560001"
        }
    },
    {
        id: "2",
        name: "Jane Smith",
        joiningDate: "2022-03-22",
        role: "UI Engineer",
        status: "Probation",
        experience: "4 Years",
        address: {
        line1: "45 Lake View Road",
        line2: "Whitefield",
        city: "Bengaluru",
        country: "India",
        postalCode: "560066"
        }
    },
    {
        id: "3",
        name: "Michael Brown",
        joiningDate: "2021-08-10",
        role: "Devops",
        status: "Inactive",
        experience: "5 Years",
        address: {
        line1: "89 Tech Park",
        line2: "Hinjewadi Phase 2",
        city: "Pune",
        country: "India",
        postalCode: "411057"
        }
    },
    {
        id: "4",
        name: "Sarah Wilson",
        joiningDate: "2024-06-05",
        role: "Full Stack",
        status: "Probation",
        experience: "1 Year",
        address: {
        line1: "34 Green Street",
        line2: "Indiranagar",
        city: "Bengaluru",
        country: "India",
        postalCode: "560038"
        }
    },
    {
        id: "5",
        name: "David Lee",
        joiningDate: "2020-11-18",
        role: "UI Engineer",
        status: "Active",
        experience: "6 Years",
        address: {
        line1: "67 River Side",
        line2: "Baner",
        city: "Pune",
        country: "India",
        postalCode: "411045"
        }
    },
    {
        id: "6",
        name: "Emily Johnson",
        joiningDate: "2023-02-12",
        role: "UI Engineer",
        status: "Inactive",
        experience: "2 Years",
        address: {
        line1: "22 Palm Residency",
        line2: "Kakkanad",
        city: "Kochi",
        country: "India",
        postalCode: "682030"
        }
    },
    {
        id: "7",
        name: "Robert Garcia",
        joiningDate: "2022-09-30",
        role: "Full Stack",
        status: "Active",
        experience: "3 Years",
        address: {
        line1: "101 Skyline Towers",
        line2: "Electronic City",
        city: "Bengaluru",
        country: "India",
        postalCode: "560100"
        }
    },
    {
        id: "8",
        name: "Sophia Martinez",
        joiningDate: "2025-04-18",
        role: "UI Engineer",
        status: "Probation",
        experience: "6 Months",
        address: {
        line1: "14 Rose Villa",
        line2: "MG Road",
        city: "Kochi",
        country: "India",
        postalCode: "682016"
        }
    },
    {
        id: "9",
        name: "William Anderson",
        joiningDate: "2021-07-14",
        role: "Devops",
        status: "Inactive",
        experience: "5 Years",
        address: {
        line1: "56 Hill Crest",
        line2: "Anna Nagar",
        city: "Chennai",
        country: "India",
        postalCode: "600040"
        }
    },
    {
        id: "10",
        name: "Olivia Thomas",
        joiningDate: "2024-01-09",
        role: "Devops",
        status: "Active",
        experience: "2 Years",
        address: {
        line1: "78 Sapphire Apartments",
        line2: "Gachibowli",
        city: "Hyderabad",
        country: "India",
        postalCode: "500032"
        }
    }
    ]
};

// export const employeeReducer = (
//     state: EmployeeState = initialState,
//     action: EmployeeAction
// ) : EmployeeState => {
//     switch(action.type){
//         case(EMPLOYEE_ACTION_TYPES.ADD):{ 
//             const record = action.payload;
//             return {...state, employees:[...state.employees, record]}   ;
//         }
//         default:
//             return state;
//     }
// }

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeRecord>) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer;