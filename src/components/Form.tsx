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
import { addEmployee } from '../store/employee/employeeReducer'
import { useAppDispatch } from '../store/store'

const statuses = [
    { value: "Probation" },
    { value: "Active" },
    { value: "Inctive" },
    { value: "Terminated" },
]

const roles = [
    { value: "Full Stack" },
    { value: "UI Engineer" },
    { value: "Devops" },
]
interface employeeProps{
    employeeData?: EmployeeRecord;
};

function Form({employeeData}: employeeProps) {
    // const [formData, setFormData] = useState({})
    const fileTypes = ["JPG", "PNG", "GIF"];
    const navigate = useNavigate()
    const [uploadDialog, setUploadDialog] = useState(false)
    const [file, setFile] = useState<File>();
    const handleChange = (file: React.SetStateAction<File | undefined>) => {
        setFile(file);
    };

    const dispatcher = useAppDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const employee: EmployeeRecord = {
            id: formData.get("employee-id") as string,
            name: formData.get("employee-name") as string,
            joiningDate: formData.get("joining-date") as string,

            role: formData.get("role") as string,
            status: formData.get("status") as EmployeeRecord["status"],

            experience: formData.get("experience") as string,

            address: {
                line1: formData.get("addressLine1") as string,
                line2: formData.get("addressLine2") as string,
                city: formData.get("city") as string,
                country: formData.get("country") as string,
                postalCode: formData.get("postalCode") as string,
            }
        };

        // dispatcher({
        //     type: EMPLOYEE_ACTION_TYPES.ADD,
        //     payload: employee
        // });
        dispatcher(addEmployee(employee))

        console.log(employee);
        navigate('/employee/')
    };

    const uploadFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUploadDialog(false)
    }
        
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
                    defaultValue={employeeData?.address?.postalCode || ''}
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