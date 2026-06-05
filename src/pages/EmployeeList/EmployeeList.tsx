import React, { useEffect, useMemo, useState } from 'react'
import Card from '../../components/Card'
import TitleCard from '../../components/TitleCard'
import add from '../../assets/images/add.svg'
import dropdown from '../../assets/images/dropdown.svg'
import bin from '../../assets/images/bin.svg'
import pen from '../../assets/images/pen.svg'
import Button from '../../components/Button'

type Employee = {
  name: string;
  role: string;
};

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    joiningDate: "15-Jan-2023",
    role: "Software Engineer",
    status: "Active",
    experience: "3 Years",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    joiningDate: "22-Mar-2022",
    role: "QA Engineer",
    status: "Probation",
    experience: "4 Years",
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    joiningDate: "10-Aug-2021",
    role: "DevOps Engineer",
    status: "Inactive",
    experience: "5 Years",
  },
  {
    id: "EMP004",
    name: "Sarah Wilson",
    joiningDate: "05-Jun-2024",
    role: "Product Manager",
    status: "Probation",
    experience: "1 Year",
  },
  {
    id: "EMP005",
    name: "David Lee",
    joiningDate: "18-Nov-2020",
    role: "UI/UX Designer",
    status: "Active",
    experience: "6 Years",
  },
  {
    id: "EMP006",
    name: "Emily Johnson",
    joiningDate: "12-Feb-2023",
    role: "Frontend Developer",
    status: "Inactive",
    experience: "2 Years",
  },
  {
    id: "EMP007",
    name: "Robert Garcia",
    joiningDate: "30-Sep-2022",
    role: "Backend Developer",
    status: "Active",
    experience: "3 Years",
  },
  {
    id: "EMP008",
    name: "Sophia Martinez",
    joiningDate: "18-Apr-2025",
    role: "Business Analyst",
    status: "Probation",
    experience: "6 Months",
  },
  {
    id: "EMP009",
    name: "William Anderson",
    joiningDate: "14-Jul-2021",
    role: "System Administrator",
    status: "Inactive",
    experience: "5 Years",
  },
  {
    id: "EMP010",
    name: "Olivia Thomas",
    joiningDate: "09-Jan-2024",
    role: "Data Engineer",
    status: "Active",
    experience: "2 Years",
  },
];


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
            <button type='submit'>
                <img src={add} alt='add'/>
                Create Employee
            </button>
        </TitleCard>
        <div className='employee-title'>
            <ul className='list-title'>
                <li>Employee Name</li>
                <li>Employee ID</li>
                <li>Joining Date</li>
                <li>Role</li>
                <li>Status</li>
                <li>Experience</li>
                <li>Action</li>
            </ul>
        </div>
        {employees.map((employee) => (
        <div className="employee-row" key={employee.id}>
            <ul>
            <li>{employee.name}</li>
            <li>{employee.id}</li>
            <li>{employee.joiningDate}</li>
            <li>{employee.role}</li>
            <li className={employee.status.toLowerCase()} id='status'>{employee.status}</li>
            <li>{employee.experience}</li>
            <li><Button className='actions' label = {<img src={bin}/>}/><Button className='actions' label = {<img src={pen}/>}/></li>
            </ul>
        </div>
        ))}
    </Card>  )
}

export default EmployeeList