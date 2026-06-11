import Card from "../../components/Card";
import Form from "../../components/Form";
import TitleCard from "../../components/TitleCard";
import "./EmployeeCreate.css";

import { useNavigate, useParams } from "react-router";

import {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeAddressMutation,
  useUpdateEmployeeMutation,
} from "../../api-services/employees/employees.api";

function EmployeeCreate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [createEmployee, {isLoading : isCreating}] = useCreateEmployeeMutation();
  const [updateEmployee, {isLoading: isUpdating}] = useUpdateEmployeeMutation();
  const [updateEmployeeAddress] = useUpdateEmployeeAddressMutation();

  const { data } = useGetEmployeeByIdQuery(Number(id), {
    skip: !id,
  });

  const employee = data
    ? {
        id: Number(data.id),
        name: data.name,
        joiningDate: data.joining_date,
        email: data.email,
        role: data.role,
        status: data.status,
        experience: data.experience,
        address: data.addresses?.[0],
      }
    : undefined;

  const getFormValues = (formData: FormData) => ({
    name: formData.get("employee-name") as string,
    email: formData.get("employee-email") as string,
    role: formData.get("role") as string,
    status: formData.get("status") as string,
    joining_date: formData.get("joining-date") as string,
    experience: formData.get("experience") as string,
    age: 21,
  });

  const getAddressValues = (formData: FormData) => ({
    line1: formData.get("address") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    postal_code: formData.get("postalCode") as string,
  });

  const createNewEmployee = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if(!isCreating){
      await createEmployee({
        ...getFormValues(formData),
        password: formData.get("password") as string,
        address: getAddressValues(formData),
      });
    }

    navigate("/employee");
  };

  const updateExistingEmployee = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await updateEmployee({
      id: Number(id),
      ...getFormValues(formData),
    });

    if (!isUpdating && employee?.address?.id) {
      await updateEmployeeAddress({
        id: Number(id),
        address_id: employee.address.id,
        ...getAddressValues(formData),
      });
    }

    navigate("/employee");
  };

  return (
    <Card>
      <TitleCard label={id ? "Edit Employee" : "Create Employee"} />

      <Form
        employeeData={employee}
        onSubmit={id ? updateExistingEmployee : createNewEmployee}
      />
    </Card>
  );
}

export default EmployeeCreate;