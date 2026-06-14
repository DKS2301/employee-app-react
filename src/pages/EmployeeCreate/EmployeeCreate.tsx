import './EmployeeCreate.css';

import Card from '@components/Card';
import Form from '@components/Form';
import TitleCard from '@components/TitleCard';
import { useNavigate, useParams } from 'react-router';

import {
    useCreateEmployeeAddressMutation,
    useCreateEmployeeMutation,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeAddressMutation,
    useUpdateEmployeeMutation,
} from '../../api-services/employees/employees.api';
import type { AddressValues, EmployeeFormValues } from '../../api-services/employees/types';

function EmployeeCreate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
    const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
    const [updateEmployeeAddress] = useUpdateEmployeeAddressMutation();
    const [createEmployeeAddress] = useCreateEmployeeAddressMutation();

    const { data: employeeDetails } = useGetEmployeeByIdQuery(Number(id), {
        skip: !id,
    });

    const employee = employeeDetails
        ? {
              id: employeeDetails.id,
              name: employeeDetails.name,
              joiningDate: employeeDetails.joining_date,
              email: employeeDetails.email,
              role: employeeDetails.role,
              status: employeeDetails.status,
              experience: employeeDetails.experience,
              address: employeeDetails.addresses?.[0],
          }
        : undefined;

    const getFormValues = (formData: FormData): EmployeeFormValues => ({
        name: (formData.get('employee-name') as string) ?? '',
        email: (formData.get('employee-email') as string) ?? '',
        role: (formData.get('role') as string) ?? '',
        status: (formData.get('status') as string) ?? '',
        joining_date: (formData.get('joining-date') as string) ?? '',
        experience: (formData.get('experience') as string) ?? '',
        age: 21,
    });

    const getAddressValues = (formData: FormData): AddressValues => ({
        line1: (formData.get('address') as string) ?? '',
        city: (formData.get('city') as string) ?? '',
        country: (formData.get('country') as string) ?? '',
        postal_code: (formData.get('postalCode') as string) ?? '',
    });

    const normalizeValue = (value: string | number | null | undefined) =>
        String(value ?? '').trim();

    const getChangedFields = <T extends object>(nextValues: T, currentValues: T) =>
        Object.fromEntries(
            Object.entries(nextValues).filter(([key, value]) => {
                const currentValue = currentValues[key as keyof T] as
                    | string
                    | number
                    | null
                    | undefined;
                return normalizeValue(value) !== normalizeValue(currentValue);
            }),
        ) as Partial<T>;

    const createNewEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (!isCreating) {
            await createEmployee({
                ...getFormValues(formData),
                password: formData.get('password') as string,
                address: getAddressValues(formData),
            });
        }

        navigate('/employee');
    };

    const updateExistingEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const nextEmployeeValues = getFormValues(formData);
        const currentEmployeeValues = {
            name: employee?.name ?? '',
            email: employee?.email ?? '',
            role: employee?.role ?? '',
            status: employee?.status ?? '',
            joining_date: employee?.joiningDate ?? '',
            experience: employee?.experience ?? '',
            age: 21,
        };

        const changedEmployeeValues = getChangedFields(nextEmployeeValues, currentEmployeeValues);

        if (Object.keys(changedEmployeeValues).length > 0 && !isUpdating) {
            await updateEmployee({
                id: Number(id),
                ...changedEmployeeValues,
            } as never);
        }

        const nextAddressValues = getAddressValues(formData);
        const currentAddressValues = {
            line1: employee?.address?.line1 ?? '',
            city: employee?.address?.city ?? '',
            country: employee?.address?.country ?? '',
            postal_code: String(employee?.address?.postal_code ?? ''),
        };
        const changedAddressValues = getChangedFields(nextAddressValues, currentAddressValues);

        if (Object.keys(changedAddressValues).length > 0 && !isUpdating) {
            if (employee?.address?.id) {
                await updateEmployeeAddress({
                    id: Number(id),
                    address_id: employee.address.id,
                    ...changedAddressValues,
                } as never);
            } else {
                await createEmployeeAddress({
                    id: Number(id),
                    ...changedAddressValues,
                } as never);
            }
        }

        navigate('/employee');
    };

    return (
        <Card>
            <TitleCard label={id ? 'Edit Employee' : 'Create Employee'} />

            <Form
                employeeData={employee}
                onSubmit={id ? updateExistingEmployee : createNewEmployee}
            />
        </Card>
    );
}

export default EmployeeCreate;
