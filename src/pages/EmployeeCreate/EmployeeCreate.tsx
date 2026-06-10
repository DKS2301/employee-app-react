import React, { useState } from 'react'
import Form from '../../components/Form'
import './EmployeeCreate.css'
import TitleCard from '../../components/TitleCard'
import Card from '../../components/Card'
import { useNavigate, useParams } from 'react-router'
import type { EmployeeRecord } from '../../store/employee/employee.types'
import { useAppDispatch, type RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { addEmployee } from '../../store/employee/employeeReducer'
import { useCreateEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeAddressMutation, useUpdateEmployeeMutation } from '../../api-services/employees/employees.api'

// export interface EmployeeRecord {
//     id: string;
//     name: string;
//     joiningDate: string; // YYYY-MM-DD

//     role: string;
//     status: EmployeeStatus;

//     experience: string;
//     // departmentId: number | string;

//     address?: Address;
// }

export interface EmployeePayload {
    name: string,
    email: string;
    password: string
    role: string;
    age: number
}
function EmployeeCreate() {
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatcher = useAppDispatch()
  const employeeState = useSelector(
    (state: RootState)=> state.employee.employees
  )
  const [createEmployee, {isLoading}] = useCreateEmployeeMutation()
  const { data, error} = useGetEmployeeByIdQuery(Number(id));
  const [updateEmployee] = useUpdateEmployeeMutation()
  const [updateEmployeeAddress] = useUpdateEmployeeAddressMutation()
  // const employee = employeeState.filter((employee: EmployeeRecord)=> employee.id == id);
  const employee = {
                    id: Number(data?.id),
                    name: data?.name,
                    joiningDate: data?.joining_date,
                    email: data?.email,
                    role: data?.role,
                    status: data?.status,
                    experience: data?.experience,
                    address: data?.addresses[0]
                  };
  console.log("create",employee)
  const createNewEmployee = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      // const employee: EmployeeRecord = {
      //     id: formData.get("employee-id") as string,
      //     name: formData.get("employee-name") as string,
      //     joiningDate: formData.get("joining-date") as string,

      //     role: formData.get("role") as string,
      //     status: formData.get("status") as EmployeeRecord["status"],

      //     address: {
      //         line1: formData.get("addressLine1") as string,
      //         line2: formData.get("addressLine2") as string,
      //         city: formData.get("city") as string,
      //         country: formData.get("country") as string,
      //         postalCode: formData.get("postalCode") as string,
      //     }
      // };

      const employee: EmployeePayload ={
        name: formData.get("employee-name") as string,
        email: formData.get("employee-email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as string,
        age: 21,
        joining_date: formData.get("joining-date") as string,
        experience: formData.get("experience") as string,
        status: formData.get("status") as string,
        address: {
          line1: formData.get("address") as string,
          city: formData.get("city") as string,
          country: formData.get("country") as string,
          postal_code: formData.get("postalCode") as string
        }
      }
      // dispatcher(addEmployee(employee))

      createEmployee(employee)
      console.log(employee);
      navigate('/employee/')
  };

  const updateExistingEmployee = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      // const employee: EmployeeRecord = {
      //     id: formData.get("employee-id") as string,
      //     name: formData.get("employee-name") as string,
      //     joiningDate: formData.get("joining-date") as string,

      //     role: formData.get("role") as string,
      //     status: formData.get("status") as EmployeeRecord["status"],

      //     address: {
      //         line1: formData.get("addressLine1") as string,
      //         line2: formData.get("addressLine2") as string,
      //         city: formData.get("city") as string,
      //         country: formData.get("country") as string,
      //         postalCode: formData.get("postalCode") as string,
      //     }
      // };
      const employeePayload: UpdateEmployeePayload ={
        id: Number(id),
        name: formData.get("employee-name") as string,
        email: formData.get("employee-email") as string,
        role: formData.get("role") as string,
        status: formData.get("status") as string,
        age: 21
      }

      const addressPayload: AddressPayload = {
        id: Number(id),
        address_id: Number(employee.address.id),
        line1: formData.get('address') as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        postal_code: formData.get("postalCode") as string,
      }

      console.log("initialting update",employee)

      // dispatcher(addEmployee(employee))

      updateEmployee(employeePayload)
      updateEmployeeAddress(addressPayload)
      console.log(employee);
      navigate('/employee/')
  };

  return (
    <Card>
        <TitleCard label='Create Employee'/>
        <Form employeeData={employee} onSubmit={id? updateExistingEmployee: createNewEmployee}/>
    </Card>
  )
}

export default EmployeeCreate