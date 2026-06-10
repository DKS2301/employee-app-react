import React, { useRef, useState } from 'react'
import paperclip from '../assets/images/paperclip.svg'
import InputGroup from './InputGroup'
import Button from './Button'
import { useNavigate } from 'react-router'
import DialogBox from './DialogBox'
import cloud from '../assets/images/cloud.svg'
import upload from '../assets/images/upload.svg'
import close from '../assets/images/close.svg'
import { FileUploader } from 'react-drag-drop-files'
import { EMPLOYEE_ACTION_TYPES, type EmployeeRecord } from '../store/employee/employee.types'
import { useCreateEmployeeMutation } from '../api-services/employees/employees.api'

const statuses = [
    { value: "Probation" },
    { value: "Active" },
    { value: "Inactive" },
    { value: "Terminated" },
]

const roles = [
    { value: "UI" },
    { value: "UX" },
    { value: "DEVELOPER" },
    { value: "HR" },
]
interface employeeProps{
    employeeData?: EmployeeRecord;
    onSubmit: React.SubmitEventHandler<HTMLFormElement>
};

function Form({employeeData, onSubmit}: employeeProps) {
    // const [formData, setFormData] = useState({})
    const fileTypes = ["JPG", "PNG", "GIF"];
    const navigate = useNavigate()
    const [uploadDialog, setUploadDialog] = useState(false)
    const [file, setFile] = useState<File>();
    const handleChange = (file: React.SetStateAction<File | undefined>) => {
        setFile(file);
    };

    const uploadFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUploadDialog(false)
    }
     
    console.log("in form", employeeData?.role)
    return (
        <>
            {uploadDialog &&
            <DialogBox classNames='upload'>
            <>
                <div className='title'>
                    <h5>Upload Proof</h5>
                    <img src={close} alt="close"onClick={()=> setUploadDialog(false)}/>
                </div>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <div className='upload-box'>
                        <div>
                            <img src={cloud} alt="cloud" className='cloud-img'/>
                        </div>
                        {!file  ? (
                                <div className='upload-options'>
                                    <p>Drag & drop excel file here</p> 
                                    <div className='or'>Or</div>
                                    <div>
                                        <img src = {upload} alt='upload' className='upload-img'/>
                                        <p>Upload file</p>
                                    </div>
                                </div>
                        ) :
                        (   
                            <>
                            <div>
                                <p>{file.name}</p>
                            </div>
                            </>
                        )}
                    </div>
                </FileUploader>
                <div className="button-group">  
                    <Button typeName='button' className='outline' label='Cancel' onClick={(e)=>{ setFile(undefined)}}/>
                    <Button typeName='submit' className='primary' label='Upload' onClick={(e) => {uploadFile(e)}}/>
                </div>
            </>
            </DialogBox>
        }
        <form className="card" onSubmit={(e)=>onSubmit(e)}>

        <InputGroup
            label="Employee Name"
            id="employee-name"
            name="employee-name"
            defaultValue={employeeData?.name || ''}
        />

        <InputGroup
            label="Employee Email"
            id="employee-email"
            name="employee-email"
            defaultValue={employeeData?.email || ''}
        />

        <InputGroup
            label="Password"
            id="password"
            name="password"
            defaultValue={''}
            type='password'
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
            options={roles}
        />

        <InputGroup
            label="Status"
            id="status"
            variant="select"
            name='status'
            defaultValue={employeeData?.status  || ''}
            options={statuses}
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
            defaultValue={employeeData?.address?.line1 || ''}
            />

            <div className="address-group">

                <input
                    name="addressLine2"
                    placeholder="Address Line 2"
                    defaultValue={employeeData?.address?.line2 || ''}
                />

                <input
                    name="city"
                    placeholder="City"
                    defaultValue={employeeData?.address?.city || ''}
                />

                <input
                    name="country"
                    placeholder="Country"
                    defaultValue={employeeData?.address?.country || ''}
                />

                <input
                    name="postalCode"
                    placeholder="Postal Code"
                    defaultValue={employeeData?.address?.postal_code || ''}
                />
            </div>
        </div>

        <label
            className="file-upload"
            onClick={()=> setUploadDialog(true)}
        >
            <p>Upload ID Proof</p>

            <div>
                {file && 
                <div className='preview'>{file.name} <img className='upload-btn' src={close} alt='close' onClick={(e) => { e.stopPropagation();setFile(undefined)}}/></div>
                }
                <p>
                    <img
                        src={paperclip}
                        alt="file upload icon"
                    />Attach files
                </p>
            </div>
        </label>

        <div className="button-group">
            <Button typeName='submit' className='primary' label='Create'/>
            <Button typeName='button' className='outline' label='Cancel' onClick={()=> navigate(-1)}/>
        </div>

            </form>
        </>
  )
}

export default Form