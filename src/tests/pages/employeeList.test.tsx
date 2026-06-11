import { configureStore } from '@reduxjs/toolkit/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import EmployeeList from '@/pages/EmployeeList/EmployeeList';

const mockEmployeesList = [
    {
        id: '1',
        name: 'John Doe',
        joiningDate: '15-Jan-2023',
        role: 'Software Engineer',
        status: 'Active',
        experience: '3 Years',
        address: 'xyz',
    },
    {
        id: '2',
        name: 'Jane Smith',
        joiningDate: '22-Mar-2022',
        role: 'QA Engineer',
        status: 'Probation',
        experience: '4 Years',
        address: 'xyz',
    },
    {
        id: '3',
        name: 'Michael Brown',
        joiningDate: '10-Aug-2021',
        role: 'DevOps Engineer',
        status: 'Inactive',
        experience: '5 Years',
        address: 'xyz',
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        joiningDate: '05-Jun-2024',
        role: 'Product Manager',
        status: 'Probation',
        experience: '1 Year',
        address: 'xyz',
    },
    {
        id: '5',
        name: 'David Lee',
        joiningDate: '18-Nov-2020',
        role: 'UI/UX Designer',
        status: 'Active',
        experience: '6 Years',
        address: 'xyz',
    },
    {
        id: '6',
        name: 'Sophia Martinez',
        joiningDate: '18-Apr-2025',
        role: 'Business Analyst',
        status: 'Probation',
        experience: '6 Months',
    },
    {
        id: '7',
        name: 'William Anderson',
        joiningDate: '14-Jul-2021',
        role: 'System Administrator',
        status: 'Inactive',
        experience: '5 Years',
    },
    {
        id: '8',
        name: 'Olivia Thomas',
        joiningDate: '09-Jan-2024',
        role: 'Data Engineer',
        status: 'Active',
        experience: '2 Years',
    },
];

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock the store
const mockStore = configureStore({
    reducer: {
        employee: (state = { employees: [] }) => state,
        department: (state = { departments: [] }) => state,
        employeeApi: (state = {}) => state,
    },
});

let mockIsLoadingEmployees = false;
let mockIsError = false;
let failMessage = undefined;
let mockIsDeleting = false;
let mockDeleteError = false;
let mockEmployees = [];

const mockTrigger = vi.fn();
const mockDeleteEmployee = vi.fn();

vi.mock('../../api-services/employees/employees.api', () => ({
    useLazyGetEmployeesByFilterQuery: () => [
        mockTrigger,
        {
            data: mockEmployees,
            isLoading: mockIsLoadingEmployees,
            isError: mockIsError,
            error: failMessage,
            isSuccess: true,
            isFetching: false,
        },
    ],
    useDeleteEmployeeMutation: () => [
        mockDeleteEmployee,
        {
            isLoading: false,
            isError: false,
            isSuccess: false,
        },
    ],
}));

beforeEach(() => {
    vi.clearAllMocks();
    mockIsLoadingEmployees = false;
    mockIsError = false;
    failMessage = undefined;
    mockEmployees = [];
    mockIsDeleting = false;
    mockDeleteError = false;
});

describe('Employee List Page', () => {
    it('match snapshot', () => {
        const { container: employeeListPage } = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );
        expect(employeeListPage).toMatchSnapshot();
    });

    it('should fail gracefully if employee fetch query fails', async () => {
        mockIsError = true;
        failMessage = {
            data: {
                detail: 'Failed to load employees.',
            },
        };
        const { container: employeeListPage } = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Failed to load employees.')).toBeInTheDocument();
        });
    });

    it('should fetch all employees on initial mount', async () => {
        mockEmployees = mockEmployeesList;

        const { container: employeeListPage } = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );

        expect(mockTrigger).toHaveBeenCalledWith({ status: 'all' });
    });

    it('should filter employees on status change', async () => {
        mockEmployees = mockEmployeesList;

        const { container: employeeListPage } = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );

        fireEvent.change(screen.getByTestId('status-filter'), { target: { value: 'Active' } });
        expect(mockTrigger).toHaveBeenCalledWith({ status: 'Active' });
    });
    it('should trigger delete confirm dialog and cancel on delete action', async () => {
        mockEmployees[0] = mockEmployeesList[0];
        const employeeListPage = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );
        const deleteBtn = employeeListPage.getByTestId('delete-btn');

        await userEvent.click(deleteBtn);

        await waitFor(() => {
            expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        });

        const cancelDeleteBtn = screen.getByTestId('delete-cancel');
        await userEvent.click(cancelDeleteBtn);

        await waitFor(() => {
            expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
        });
    });

    it('should navigate to edit(create) page on employee select', async () => {
        mockEmployees[0] = mockEmployeesList[0];

        const { container: employeeListPage } = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );

        const employeeRow = screen.getByTestId(`employee-row-${mockEmployeesList[0].id}`);

        userEvent.click(employeeRow);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/employee/${mockEmployeesList[0].id}`);
        });
    });

    it('should trigger delete employee on delete confirm on delete action', async () => {
        mockEmployees[0] = mockEmployeesList[0];
        const employeeListPage = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );
        const deleteBtn = employeeListPage.getByTestId('delete-btn');

        userEvent.click(deleteBtn);

        await waitFor(() => {
            expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        });
        const confirmDeleteBtn = screen.getByTestId('delete-confirm');

        await userEvent.click(confirmDeleteBtn);

        await waitFor(() => {
            expect(mockDeleteEmployee).toHaveBeenCalledWith(mockEmployeesList[0].id);
        });
    });

    it('should navigate to create employee page on edit action', async () => {
        mockEmployees[0] = mockEmployeesList[0];
        const employeeListPage = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );
        const editBtn = employeeListPage.getByTestId('edit-btn');

        userEvent.click(editBtn);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`create/${mockEmployeesList[0].id}`);
        });
    });

    it('should navigate to create employee page on create employee button click', async () => {
        const employeeListPage = render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );
        const createBtn = employeeListPage.getByTestId('create-btn');

        userEvent.click(createBtn);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/employee/create');
        });
    });

    it('should show loading fallback on loading data', async () => {
        mockIsLoadingEmployees = true;
        render(
            <Provider store={mockStore}>
                <EmployeeList />
            </Provider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });
});
