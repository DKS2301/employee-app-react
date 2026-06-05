import React from 'react'
import bin from '../../assets/images/bin.svg'
import pen from '../../assets/images/pen.svg'
import Button from '../../components/Button'
import { Link } from 'react-router';

interface Employee{
    id: string;
    name: string;
    joiningDate: string;
    role: string;
    status: string;
    experience: string;
}

interface rowProps{
    employee: Employee
}

function Row({employee} : rowProps) {
  return (
    <div className="table-row" key={employee.id}>
        <ul>
        <li>{employee.name}</li>
        <li>{employee.id}</li>
        <li>{employee.joiningDate}</li>
        <li>{employee.role}</li>
        <li className={employee.status.toLowerCase()} id='status-row'>{employee.status}</li>
        <li>{employee.experience}</li>
        <li><Button className='actions' label = {<img src={bin}/>}/> <Link to={'/employee/edit'}><Button className='actions' label = {<img src={pen}/>}/></Link></li>
        </ul>
    </div>  
    )
}

export default Row