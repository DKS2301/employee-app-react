import './Table.css';

import Button from '@components/Button';
import bin from '@images/bin.svg';
import pen from '@images/pen.svg';
interface Employee {
    id: number;
    name: string;
    joining_date: string;
    role: string;
    status: string;
    experience: string;
}

interface rowProps {
    employee: Employee;
    handleDeleteAction: React.MouseEventHandler<HTMLButtonElement>;
    handleEditAction: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

function Row({ employee, handleDeleteAction, handleEditAction, className = '' }: rowProps) {
    return (
        <div
            className={`table-row ${className}`}
            key={employee.id}
            data-testid={`employee-row-${employee.id}`}
        >
            <ul>
                <li>{employee.name}</li>
                <li>{employee.id}</li>
                <li>{employee.joining_date}</li>
                <li>{employee.role}</li>
                <li className={employee.status.toLowerCase()} id="status-row">
                    {employee.status}
                </li>
                <li>{employee.experience}</li>
                <li>
                    <Button
                        className="actions"
                        testId="delete-btn"
                        label={<img src={bin} />}
                        onClick={(e) => {
                            handleDeleteAction(e);
                        }}
                    />
                    <Button
                        className="actions"
                        testId="edit-btn"
                        label={<img src={pen} />}
                        onClick={handleEditAction}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Row;
