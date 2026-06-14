export interface AddressValues {
    line1: string;
    city: string;
    country: string;
    postal_code: string;
}

export interface EmployeeFormValues {
    name: string;
    email: string;
    role: string;
    status: string;
    joining_date: string;
    experience: string;
    age: number;
}

export interface CreateEmployeePayload extends EmployeeFormValues {
    password: string;
    address: AddressValues;
}

export interface CreateAddressPayload extends Partial<AddressValues> {
    id: number;
}

export interface UpdateEmployeePayload extends Partial<EmployeeFormValues> {
    id: number;
}

export interface UpdateAddressPayload extends Partial<AddressValues> {
    id: number;
    address_id: number;
}

export interface EmployeeSearchPayload {
    status?: string;
    name?: string;
    email?: string;
}

export interface AddressResponse extends AddressValues {
    id: number;
}

export interface EmployeeResponse extends EmployeeFormValues {
    id: number;
    addresses: AddressResponse[];
}

export interface AddressResponse {
    id: number;
    line1: string;
    city: string;
    country: string;
    postal_code: string;
}

export interface EmployeeResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    joining_date: string;
    experience: string;
    age: number;
    addresses: AddressResponse[];
}
