import React, { Suspense, useMemo, useState } from 'react'
import './EmployeeList.css'
import Card from '../../components/Card'
import TitleCard from '../../components/TitleCard'
import add from '../../assets/images/add.svg'
import dropdown from '../../assets/images/dropdown.svg'
import { useNavigate } from 'react-router'
import Title from '../../components/Table/Title'
// import Row from '../../components/Table/Row'
import Button from '../../components/Button'
import Chatbox from '../../components/Chatbox'
import Fallback from '../../components/Fallback'
import DialogBox from '../../components/DialogBox'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import type { EmployeeRecord } from '../../store/employee/employee.types'

const Row = React.lazy(()=>import('../../components/Table/Row'))

function useFetch(value:string, employeeList: EmployeeRecord[]) {
    // const [employeeName, setEmployeeName] = useState()
    // const [filter, setFilter] = useState('');
    const filteredEmployees= useMemo(()=>{
        if(value == 'all') return employeeList;
        return employeeList.filter((employee)=>  employee.status.toLowerCase()==value);
    },[employeeList, value])

    return filteredEmployees

}

function EmployeeList() {
    const employeeList = useSelector(
        (state: RootState)=> state.employee.employees
    )
    console.log(employeeList)
    const [status, setStatus] = useState('all');
    const filteredEmployees =  useFetch(status, employeeList)
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

    function cancelDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation(); 
        setdialogOpen(false)
    }

    function confirmDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation(); 
        setdialogOpen(false)
    }

    return (
        <>
            {dialogOpen &&
            <DialogBox classNames='delete'>
                <>
                    <h4 >Are you sure ?</h4>
                    <h6>Do you really want to delete employee?</h6>
                    <div className="button-group">
                        <Button typeName='button' className='outline' label='Cancel' onClick={(e) => cancelDelete(e)}/>
                        <Button typeName='submit' className='primary' label='Confirm' onClick={(e) => confirmDelete(e)}/>
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
                            className='status-filter'
                        >
                            <option value='all'>All</option>
                            <option value="active">Active</option>
                            <option value="probation">Probation</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <img src={dropdown} />
                    </div>
                    <Button typeName='submit' label={<><img src={add} alt='add' />Create Employee</>} onClick={() => navigate('/employee/create')} className={''} />
                </TitleCard>
                <Title />
                <Suspense fallback={<Fallback/>} >
                    <div className='table-rows'>                        
                        {filteredEmployees.map((employee) => (
                            <div key = {employee.id} onClick={() => navigate(`/employee/${employee.id}`)}>
                                <Row employee={employee} deleteAction={handleDelete} editAction={(e)=>handleEdit(e,employee.id)}/>
                            </div>
                        ))}
                    </div>
                </Suspense>
                <Chatbox />
            </Card>
        </>
    )
}

export default EmployeeList