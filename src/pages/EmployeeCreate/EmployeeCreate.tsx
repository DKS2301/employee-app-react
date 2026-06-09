import React, { useState } from 'react'
import Form from '../../components/Form'
import './EmployeeCreate.css'
import TitleCard from '../../components/TitleCard'
import Card from '../../components/Card'
import { useParams } from 'react-router'
import type { EmployeeRecord } from '../../store/employee/employee.types'
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

function EmployeeCreate() {
  const {id} = useParams()
  const employeeState = useSelector(
    (state: RootState)=> state.employee.employees
  )
  const employee = employeeState.filter((employee: EmployeeRecord)=> employee.id == id);

  return (
    <Card>
        <TitleCard label='Create Employee'/>
        <Form employeeData={employee[0]}/>
    </Card>
  )
}

export default EmployeeCreate