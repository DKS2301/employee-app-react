import React, { useState } from 'react'
import Form from '../../components/Form'
import './EmployeeCreate.css'
import TitleCard from '../../components/TitleCard'
import Card from '../../components/Card'
import { employees } from '../employees'
import { useParams } from 'react-router'

function EmployeeCreate() {
  const {id} = useParams()
  const employee = employees.filter((employee)=> employee.id == id);

  return (
    <Card>
        <TitleCard label='Create Employee'/>
        <Form employeeData={employee[0]}/>
    </Card>
  )
}

export default EmployeeCreate