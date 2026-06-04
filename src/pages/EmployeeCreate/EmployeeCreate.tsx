import React from 'react'
import Form from '../../components/Form'
import './styles.css'
import TitleCard from '../../components/TitleCard'
import Card from '../../components/Card'


function EmployeeCreate() {
  return (
    <Card>
        <TitleCard label='Create Employee'/>
        <Form />
    </Card>
  )
}

export default EmployeeCreate