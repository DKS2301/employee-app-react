import React, { useRef, useState } from 'react'
import paperclip from '../assets/images/paperclip.svg'
import InputGroup from './InputGroup'
import Button from './Button'
import { useNavigate, type FormProps } from 'react-router'
import DialogBox from './DialogBox'
import cloud from '../assets/images/cloud.svg'
import upload from '../assets/images/upload.svg'
import close from '../assets/images/close.svg'
import { FileUploader } from 'react-drag-drop-files'

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
    const fileTypes = ["JPG", "PNG", "GIF"];
    const navigate = useNavigate()
    const [uploadDialog, setUploadDialog] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>();
    const handleChange = (file) => {
        setFile(file);
    };

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.get('employee-name'))
    }

    const uploadFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(fileRef.current?.value[0])
        console.log(file)
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
                    <div className='upload-box' onClick={() => fileRef.current?.click()}>
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
                                        {/* <input
                                            id="id-proof"
                                            name="id-proof"
                                            type="file"
                                            hidden
                                            ref={fileRef}
                                            onChange={(e)=>{
                                                setFile(e.target.files?.[0]);
                                                console.log(file)
                                            }}
                                        /> */}
                                            
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