import React from 'react'
import Card from '../../components/Card'
import TitleCard from '../../components/TitleCard'
import { useNavigate, useParams } from 'react-router'
import Button from '../../components/Button'
import pen from '../../assets/images/pen1.svg'
import './EmployeeDetails.css'
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useGetEmployeeByIdQuery } from '../../api-services/employees/employees.api'

function EmployeeDetails() {
  const navigate = useNavigate()
  const {id} = useParams()
  const employeeList = useSelector(
        (state: RootState)=> state.employee.employees
    )
  const { data, isLoading, error } = useGetEmployeeByIdQuery(Number(id));
    console.log("details data",data?.addresses[0])
    const {
    name,
    joiningDate,
    role,
    status,
    experience,
    address
    } = {
    name: data?.name,
    joiningDate: data?.created_at.split('T')[0],
    role: data?.role,
    status: data?.status,
    experience: data?.experience,
    address: data?.addresses[0],
    };
  return (
    <Card>
        <TitleCard label='Employee details'>
            <Button typeName='submit' label={<><img src={pen} alt='pen' className='details' />Edit details</>} onClick={() => navigate(`/employee/create/${id}`)} className={''} />
        </TitleCard>
        <div className="employee-details">
            <div className='detail-row-1'>
                <div className="detail-item">
                    <span className="detail-label">Employee Name</span>
                    <span className="detail-value">{name}</span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">Joining Date</span>
                    <span className="detail-value">{joiningDate}</span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">Role</span>
                    <span className="detail-value">{role}</span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className={`detail-value ${String(status).toLowerCase()}`} id='status-row'>
                    {status}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">Experience</span>
                    <span className="detail-value">{experience}</span>
                </div>
            </div>
            <div className='seperator'></div>
            <div className='detail-row-2'>
                <div className="detail-item">
                    <span className="detail-label">Address</span>
                    <span className="detail-value">{address ? `${address?.line1}, ${address?.city}, ${address?.country}, ${address?.postal_code}` : 'No Address Provided'}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Employee ID</span>
                    <span className="detail-value">{id}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Employee ID</span>
                    <span className="detail-value">{id}</span>
                </div>
            </div>
        </div>
    </Card>
  )
}

export default EmployeeDetails