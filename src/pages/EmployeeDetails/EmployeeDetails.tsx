import { useNavigate, useParams } from "react-router";

import Button from "../../components/Button";
import Card from "../../components/Card";
import TitleCard from "../../components/TitleCard";

import pen from "../../assets/images/pen1.svg";

import "./EmployeeDetails.css";

import { useGetEmployeeByIdQuery } from "../../api-services/employees/employees.api";

function EmployeeDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data: employee,
        isLoading,
        error,
    } = useGetEmployeeByIdQuery(Number(id));

    if (isLoading) {
        return (
            <Card>
                <div className="page-state">Loading employee details...</div>
            </Card>
        );
    }

    if (error || !employee) {
        return (
            <Card>
                <div className="page-state error">
                    Failed to load employee details.
                </div>
            </Card>
        );
    }

    const address = employee.addresses?.[0];

    const formattedAddress = address
        ? [
              address.line1,
              address.city,
              address.country,
              address.postal_code,
          ]
              .filter(Boolean)
              .join(", ")
        : "No Address Provided";

    return (
        <Card>
            <TitleCard label="Employee Details">
                <Button
                    typeName="submit"
                    className=""
                    onClick={() =>
                        navigate(`/employee/create/${employee.id}`)
                    }
                    label={
                        <>
                            <img
                                src={pen}
                                alt="edit"
                                className="details"
                            />
                            Edit Details
                        </>
                    }
                />
            </TitleCard>

            <div className="employee-details">
                <div className="detail-row-1">
                    <div className="detail-item">
                        <span className="detail-label">Employee Name</span>
                        <span className="detail-value">
                            {employee.name}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Joining Date</span>
                        <span className="detail-value">
                            {employee.joining_date}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Role</span>
                        <span className="detail-value">
                            {employee.role}
                        </span>
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
                        <span className="detail-value">
                            {employee.experience || "N/A"}
                        </span>
                    </div>
                </div>

                <div className="seperator" />

                <div className="detail-row-2">
                    <div className="detail-item">
                        <span className="detail-label">Address</span>
                        <span className="detail-value">
                            {formattedAddress}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Employee ID</span>
                        <span className="detail-value">
                            {employee.id}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">
                            {employee.email}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default EmployeeDetails;