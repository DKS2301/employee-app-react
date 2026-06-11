import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import add from '@images/add.svg';
import dropdown from '@images/dropdown.svg';

import Card from '@components/Card';
import Title from '@components/Table/Title';
import TitleCard from '@components/TitleCard';
import Button from '@components/Button';
import Chatbox from '@components/Chatbot/Chatbox';
import DialogBox from '@components/DialogBox/DialogBox';
import Fallback from '@components/Fallback';
import Row from '@components/Table/Row'

import './EmployeeList.css';

import {
    useDeleteEmployeeMutation,
    useLazyGetEmployeesByFilterQuery,
} from '../../api-services/employees/employees.api';

// const Row = React.lazy(() => import('../../components/Table/Row'));

function EmployeeList() {
    const navigate = useNavigate();

    const [status, setStatus] = useState('all');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();

    const [
        filterEmployeeByStatus,
        {
            data: employees = [],
            isLoading,
            isFetching,
            isError,
            error,
        },
    ] = useLazyGetEmployeesByFilterQuery();

    const [
        deleteEmployee,
        {
            isLoading: isDeleting,
            isError: isDeleteError,
            error: deleteError,
            isSuccess: isDeleteSuccess,
        },
    ] = useDeleteEmployeeMutation();

    useEffect(() => {
        if (isError) {
            console.error('Failed to fetch employees', error);
        }
    }, [isError, error]);

    useEffect(() => {
        filterEmployeeByStatus({status})
    }, [status, filterEmployeeByStatus]);

    useEffect(() => {
        if (isDeleteError) {
            console.error('Failed to delete employee', deleteError);
        }
    }, [isDeleteError, deleteError]);

    useEffect(() => {
        if (isDeleteSuccess) {
            setDialogOpen(false);
        }
    }, [isDeleteSuccess]);

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        e.stopPropagation();
        setSelectedEmployeeId(id);
        setDialogOpen(true);
    };

    const handleEdit = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        e.stopPropagation();
        navigate(`create/${id}`);
    };

    const cancelDelete = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        setDialogOpen(false);
    };

    const confirmDelete = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        if (!selectedEmployeeId) return;

        try {
            await deleteEmployee(selectedEmployeeId).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {dialogOpen && (
                <DialogBox classNames="delete">
                    <>
                        <h4>Are you sure?</h4>
                        <h6>Do you really want to delete employee?</h6>

                        <div className="button-group">
                            <Button
                                typeName="button"
                                className="outline"
                                label="Cancel"
                                testId = "delete-cancel"
                                onClick={cancelDelete}
                            />

                            <Button
                                typeName="submit"
                                className="primary"
                                label={
                                    isDeleting
                                        ? 'Deleting...'
                                        : 'Confirm'
                                }
                                testId = "delete-confirm"
                                disabled={isDeleting}
                                onClick={confirmDelete}
                            />
                        </div>
                    </>
                </DialogBox>
            )}

            <Card>
                <TitleCard label="Employee List">
                    <label htmlFor="status">Filter By</label>

                    <div>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="status-filter"
                            data-testid="status-filter"
                        >
                            <option value="all">All</option>
                            <option value="Active">Active</option>
                            <option value="Probation">
                                Probation
                            </option>
                            <option value="Inactive">
                                Inactive
                            </option>
                        </select>

                        <img src={dropdown} alt="" />
                    </div>

                    <Button
                        typeName="submit"
                        className=""
                        testId='create-btn'
                        label={
                            <>
                                <img src={add} alt="add" />
                                Create Employee
                            </>
                        }
                        onClick={() =>
                            navigate('/employee/create')
                        }
                    />
                </TitleCard>

                <Title />

                {/* <Suspense fallback={<Fallback />}> */}
                    <div className="table-rows">
                        {isLoading || isFetching ? (
                            <Fallback />
                        ) : isError ? (
                            <p>
                                Failed to load employees.
                            </p>
                        ) : employees.length === 0 ? (
                            <p>
                                No employees found for "
                                {status}".
                            </p>
                        ) : (
                            employees.map((employee) => (
                                <div
                                    key={employee.id}
                                    onClick={() =>
                                        navigate(
                                            `/employee/${employee.id}`
                                        )
                                    }
                                    className='clickable-element'
                                >
                                    <Row
                                        employee={employee}
                                        deleteAction={(e) =>
                                            handleDelete(
                                                e,
                                                employee.id
                                            )
                                        }
                                        editAction={(e) =>
                                            handleEdit(
                                                e,
                                                employee.id
                                            )
                                        }
                                    />
                                </div>
                            ))
                        )}
                    </div>
                {/* </Suspense> */}

                <Chatbox />
            </Card>
        </>
    );
}

export default EmployeeList;