import React, { useState } from 'react'
import paperclip from '../assets/images/paperclip.svg'
import InputGroup from './InputGroup'
import Button from './Button'
import type { FormProps } from 'react-router'

type Employee = {
    id?: string;
    name?: string;
    joiningDate?: string;
    role?: string;
    status?: string;
    experience?: string;
    address?: string;
};

interface employeeProps{
    employeeData?: Employee;
};

function Form({employeeData}: employeeProps) {
    // const [formData, setFormData] = useState({})
    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log(formData.get('employee-name'))
    }

    console.log("a=", employeeData)
    
    return (
        <form className="card" onSubmit={(e)=>onSubmit(e)}>

        <InputGroup
            label="Employee Name"
            id="employee-name"
            name="employee-name"
            defaultValue={employeeData?.name || ''}
        />

        <InputGroup
            label="Employee ID"
            id="employee-id"
            name="employee-id"
            defaultValue={employeeData?.id || ''}
        />

        <InputGroup
            label="Joining Date"
            id="joining-date"
            type="date"
            name="joining-date"
            defaultValue={employeeData?.joiningDate  || ''}
        />

        <InputGroup
            label="Role"
            id="role"
            variant="select"
            name='role'
            defaultValue={employeeData?.role || ''}
            options={[
            { value: "SWE" },
            { value: "QA" },
            ]}
        />

        <InputGroup
            label="Status"
            id="status"
            variant="select"
            name='status'
            defaultValue={employeeData?.status  || ''}
            options={[
            { value: "Active" },
            { value: "Terminated" },
            ]}
        />

        <InputGroup
            label="Experience"
            id="experience"
            name="experience"
            defaultValue={employeeData?.experience || ''}
        />

        <div className="input-group">
            <label htmlFor="address">Address</label>

            <input
            id="address"
            placeholder="Address Line 1"
            name='address'
            value={employeeData?.address || ''}
            />

            <div className="address-group">
            <input placeholder="Address Line 2" />
            <input placeholder="City" />
            <input placeholder="Country" />
            <input placeholder="Postal Code" />
            </div>
        </div>

        <label
            className="file-upload"
            htmlFor="id-proof"
        >
            <p>Upload ID Proof</p>

            <input
            id="id-proof"
            name="id-proof"
            type="file"
            />

            <div>
            <img
                src={paperclip}
                alt="file upload icon"
            />
            <p>Attach files</p>
            </div>
        </label>

        <div className="button-group">
            <Button typeName='submit' className='primary' label='Create'/>
            <Button typeName='button' className='outline' label='Cancel'/>
        </div>

        </form>
  )
}

export default Form