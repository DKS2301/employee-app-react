import React, { Suspense, useState } from 'react'
import { useNavigate } from 'react-router'
import add from '../../assets/images/add.svg'
import dropdown from '../../assets/images/dropdown.svg'
import Card from '../../components/Card'
import Title from '../../components/Table/Title'
import TitleCard from '../../components/TitleCard'
import './EmployeeList.css'
// import Row from '../../components/Table/Row'
import { useDeleteEmployeeMutation, useGetEmployeesByFilterQuery, useGetEmployeesQuery } from '../../api-services/employees/employees.api'
import Button from '../../components/Button'
import Chatbox from '../../components/Chatbox'
import DialogBox from '../../components/DialogBox'
import Fallback from '../../components/Fallback'
import type { EmployeeRecord } from '../../store/employee/employee.types'

const Row = React.lazy(()=>import('../../components/Table/Row'))

// function useFetch(value:string, employeeList: EmployeeRecord[]) {
//     // const [employeeName, setEmployeeName] = useState()
//     // const [filter, setFilter] = useState('');
//     const filteredEmployees= useMemo(()=>{
//         if(value == 'all') return employeeList;
//         return employeeList.filter((employee)=>  employee.status.toLowerCase()==value);
//     },[employeeList, value])

//     return filteredEmployees

// }

function EmployeeList() {
    // const employeeList = useSelector(
    //     (state: RootState)=> state.employee.employees
    // )
    const [employeeList, setEmployeeList] = useState<EmployeeRecord[]>([]) 
    const [status, setStatus] = useState('all');
    // const filteredEmployees =  useFetch(status, employeeList)
    const [dialogOpen, setdialogOpen] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
    const navigate = useNavigate()
    const { data, isLoading, error } = useGetEmployeesQuery();
    const { data: filteredEmployees, isLoading: isLoadingEmployee } = useGetEmployeesByFilterQuery({status:status});

    console.log("employees", filteredEmployees)
    const [deleteEmployee] = useDeleteEmployeeMutation();
    // useEffect(() => {if(data){
    //     // const employee = {...data, joiningDate:{data.created}}
    //     console.log("data",data)
    //     const employeeList: EmployeeRecord[] =
    //         data?.map(emp => ({
    //             id: Number(emp.id),
    //             name: emp.name,
    //             joiningDate: emp.joining_date.split('T')[0],
    //             role: emp.role,
    //             status: emp.status,
    //             experience: emp.experience
    //         })) ?? [];
    //     setEmployeeList(employeeList)
    //     }
    // },[data])

    function employeeById(){
        // const { data, isLoading, error } = useGetEmployeesQuery();
        console.log("id name",data)
    }

    // const employees = data;
    // employees['joiningDate'] = 

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) =>{
        e.stopPropagation();
        setSelectedEmployeeId(Number(id))
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
        deleteEmployee(selectedEmployeeId)
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
                            onChange={(e) => {setStatus(e.target.value)}}
                            className='status-filter'
                        >
                            <option value='all'>All</option>
                            <option value="Active">Active</option>
                            <option value="Probation">Probation</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <img src={dropdown} />
                    </div>
                    <Button typeName='submit' label={<><img src={add} alt='add' />Create Employee</>} onClick={() => navigate('/employee/create')} className={''} />
                </TitleCard>
                <Title />
                <Suspense fallback={<Fallback/>} >
                    <div className='table-rows'>                     
                        {!isLoadingEmployee ? filteredEmployees?.map((employee) => (
                            <div key = {employee.id} onClick={() => navigate(`/employee/${employee.id}`)}>
                                <Row employee={employee} deleteAction={(e)=>handleDelete(e, employee.id)} editAction={(e)=>handleEdit(e,employee.id)}/>
                            </div>
                        )): `No Employees for status ${status} exists`}
                    </div>
                </Suspense>
                <Chatbox />
            </Card>
        </>
    )
}

export default EmployeeList