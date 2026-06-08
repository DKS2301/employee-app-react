import React, { Suspense, useEffect, useMemo, useState } from 'react'
import './EmployeeList.css'
import Card from '../../components/Card'
import TitleCard from '../../components/TitleCard'
import add from '../../assets/images/add.svg'
import dropdown from '../../assets/images/dropdown.svg'
import { Link, useNavigate } from 'react-router'
import Title from '../../components/Table/Title'
// import Row from '../../components/Table/Row'
import Button from '../../components/Button'
import Chatbox from '../../components/Chatbox'
import {employees} from '../employees'
import Fallback from '../../components/Fallback'
import DialogBox from '../../components/DialogBox'

const Row = React.lazy(()=>import('../../components/Table/Row'))

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
    const [status, setStatus] = useState('status');
    const filteredEmployees =  useFetch(employeeName)
    const [dialogOpen, setdialogOpen] = useState(false)
    const navigate = useNavigate()

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        setdialogOpen(true);
    }

    function handleEdit(e: React.MouseEvent<HTMLButtonElement>,id: string){
        e.stopPropagation();
        navigate(`create/${id}`)
    }

    return (
        <>
            {dialogOpen &&
            <DialogBox classNames='delete'>
                <>
                    <h4 >Are you sure ?</h4>
                    <h6>Do you really want to delete employee?</h6>
                    <div className="button-group">
                        <Button typeName='button' className='outline' label='Cancel' onClick={(e)=>{ e.stopPropagation(); setdialogOpen(false)}}/>
                        <Button typeName='submit' className='primary' label='Confirm'/>
                    </div>
                </>
            </DialogBox>
            }
            <Card>
                <TitleCard label='Employee List'>
                    <label htmlFor='status'>
                        Filter By
                    </label>
                    <div>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => {console.log(e.target.value);setStatus(e.target.value)}}
                        >
                            <option value="status">Status</option>
                            <option value="joining-date">Joining Date</option>
                        </select>
                        <img src={dropdown} />
                    </div>
                    <Button typeName='submit' label={<><img src={add} alt='add' />Create Employee</>} onClick={() => navigate('/employee/create')} className={''} />
                </TitleCard>
                <Title />
                <Suspense fallback={<Fallback/>} >
                    {employees.map((employee) => (
                        <div key = {employee.id} onClick={() => navigate(`/employee/${employee.id}`)}>
                            <Row employee={employee} deleteAction={handleDelete} editAction={(e)=>handleEdit(e,employee.id)}/>
                        </div>
                    ))}
                </Suspense>
                <Chatbox />
            </Card>
        </>
    )
}

export default EmployeeList