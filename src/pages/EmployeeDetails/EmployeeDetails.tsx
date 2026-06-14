import './EmployeeDetails.css';

import { useGetEmployeeByIdQuery } from '@api-services/employees/employees.api';
import Button from '@components/Button';
import Card from '@components/Card';
import TitleCard from '@components/TitleCard';
import pen from '@images/pen1.svg';
import { useNavigate, useParams } from 'react-router';

import ErrorElement from '@/components/ErrorElement/ErrorElement';

function EmployeeDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: employee, isLoading, error } = useGetEmployeeByIdQuery(Number(id));
    const address = employee?.addresses?.[0];

    const formattedAddress = address
        ? [address.line1, address.city, address.country, address.postal_code]
              .filter(Boolean)
              .join(', ')
        : 'No Address Provided';

    const handleEdit = () => navigate(`/employee/create/${employee?.id}`);

    return (
        <Card>
            <TitleCard label="Employee Details">
                <Button
                    typeName="submit"
                    className=""
                    onClick={handleEdit}
                    label={
                        <>
                            <img src={pen} alt="edit" className="details" />
                            Edit Details
                        </>
                    }
                />
            </TitleCard>
            <div className="employee-details">
                {isLoading ? (
                    <div className="page-state">
                        <div className="page-state-loader" />

                        <h3>Loading Employee Details</h3>

                        <p>Please wait while we retrieve employee information.</p>
                    </div>
                ) : error || !employee ? (
                    <ErrorElement
                        title="Employee Not Found"
                        message={`The employee record with id ${id} could not be found or may have been removed.`}
                        actionLabel="Back to Employee List"
                        onAction={() => navigate('/employee')}
                    />
                ) : (
                    <>
                        <div className="detail-row-1">
                            <div className="detail-item">
                                <span className="detail-label">Employee Name</span>
                                <span className="detail-value">{employee.name}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Joining Date</span>
                                <span className="detail-value">{employee.joining_date}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Role</span>
                                <span className="detail-value">{employee.role}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span
                                    id="status-row"
                                    className={`detail-value ${employee.status.toLowerCase()}`}
                                >
                                    {employee.status}
                                </span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Experience</span>
                                <span className="detail-value">{employee.experience || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="seperator" />

                        <div className="detail-row-2">
                            <div className="detail-item">
                                <span className="detail-label">Address</span>
                                <span className="detail-value">{formattedAddress}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Employee ID</span>
                                <span className="detail-value">{employee.id}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{employee.email}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
}

export default EmployeeDetails;
