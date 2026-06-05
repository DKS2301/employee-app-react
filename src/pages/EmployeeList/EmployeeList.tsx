import React, { useMemo, useState } from 'react'
import './EmployeeList.css'
import Card from '../../components/Card'
import TitleCard from '../../components/TitleCard'
import add from '../../assets/images/add.svg'
import dropdown from '../../assets/images/dropdown.svg'
import { Link, useNavigate } from 'react-router'
import Title from '../../components/Table/Title'
import Row from '../../components/Table/Row'
import Button from '../../components/Button'
import Chatbox from '../../components/Chatbox'
import {employees} from '../employees'

function useFetch(value:string) {
    // const [employeeName, setEmployeeName] = useState()
    // const [filter, setFilter] = useState('');
    const filteredEmployees= useMemo(()=>{
        return employees.filter((employee)=>  employee.name.toLowerCase().includes(value.toLowerCase()));
    },[value])

    return filteredEmployees

}

function EmployeeList() {
    const [employeeName,setEmployeeName] = useState('')
    const filteredEmployees =  useFetch(employeeName)
    const navigate = useNavigate()

    return (
    <Card>
        <TitleCard label='Employee List'>
            <label htmlFor='status'>
            Filter By
            </label>
            <div>
                <select id='status'>
                    <option>Status</option>
                </select>
                <img src={dropdown}/>
            </div>
            <Link to='/employee/create' >
                <Button typeName='submit' label={<><img src={add} alt='add' />Create Employee</>} className={''} />
            </Link>
        </TitleCard>
        <Title/>
        {employees.map((employee) => (
            <div onClick={()=> navigate(`/employee/${employee.id}`)}>
                <Row employee={employee} />
            </div>
        ))}
        <Chatbox/>
    </Card>  )
}

export default EmployeeList