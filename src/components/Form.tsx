import { useState } from "react";
import { useNavigate } from "react-router";
import { FileUploader } from "react-drag-drop-files";

import Button from "./Button";
import DialogBox from "./DialogBox/DialogBox";
import InputGroup from "./InputGroup";

import cloud from "@images/cloud.svg";
import close from "@images/close.svg";
import paperclip from "@images/paperclip.svg";
import upload from "@images/upload.svg";

import type { EmployeeResponse } from "@/api-services/employees/types";

interface FormProps {
    employeeData?: EmployeeResponse;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FILE_TYPES = ["JPG", "PNG", "GIF"];

const STATUS_OPTIONS = [
    { value: "Probation" },
    { value: "Active" },
    { value: "Inactive" },
    { value: "Terminated" },
];

const ROLE_OPTIONS = [
    { value: "UI" },
    { value: "UX" },
    { value: "DEVELOPER" },
    { value: "HR" },
];

function Form({ employeeData, onSubmit }: FormProps) {
    const navigate = useNavigate();

    const [uploadDialog, setUploadDialog] = useState(false);
    const [file, setFile] = useState<File>();

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const closeUploadDialog = () => {
        setUploadDialog(false);
    };

    const removeFile = (
        e?: React.MouseEvent<HTMLImageElement | HTMLButtonElement>
    ) => {
        e?.stopPropagation();
        setFile(undefined);
    };

    return (
        <>
            {uploadDialog && (
                <DialogBox classNames="upload">
                    <>
                        <div className="title">
                            <h5>Upload Proof</h5>
                            <img
                                src={close}
                                alt="close"
                                onClick={closeUploadDialog}
                            />
                        </div>

                        <FileUploader
                            handleChange={handleFileChange}
                            name="file"
                            types={FILE_TYPES}
                        >
                            <div className="upload-box">
                                <img
                                    src={cloud}
                                    alt="cloud"
                                    className="cloud-img"
                                />

                                {!file ? (
                                    <div className="upload-options">
                                        <p>Drag & drop file here</p>

                                        <div className="or">Or</div>

                                        <div>
                                            <img
                                                src={upload}
                                                alt="upload"
                                                className="upload-img"
                                            />
                                            <p>Upload file</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>{file.name}</p>
                                )}
                            </div>
                        </FileUploader>

                        <div className="button-group">
                            <Button
                                typeName="button"
                                className="outline"
                                label="Cancel"
                                onClick={removeFile}
                            />

                            <Button
                                typeName="button"
                                className="primary"
                                label="Upload"
                                onClick={closeUploadDialog}
                            />
                        </div>
                    </>
                </DialogBox>
            )}

            <form className="card" onSubmit={onSubmit}>
                <InputGroup
                    label="Employee Name"
                    id="employee-name"
                    name="employee-name"
                    defaultValue={employeeData?.name ?? ""}
                />

                <InputGroup
                    label="Employee Email"
                    id="employee-email"
                    name="employee-email"
                    defaultValue={employeeData?.email ?? ""}
                />

                <InputGroup
                    label="Employee ID"
                    id="employee-id"
                    name="employee-id"
                    defaultValue={employeeData?.id ?? ""}
                    disabled={true}
                />

                <InputGroup
                    label="Joining Date"
                    id="joining-date"
                    name="joining-date"
                    type="date"
                    defaultValue={employeeData?.joiningDate ?? ""}
                />

                <InputGroup
                    label="Role"
                    id="role"
                    name="role"
                    variant="select"
                    options={ROLE_OPTIONS}
                    defaultValue={employeeData?.role ?? ""}
                />

                <InputGroup
                    label="Status"
                    id="status"
                    name="status"
                    variant="select"
                    options={STATUS_OPTIONS}
                    defaultValue={employeeData?.status ?? ""}
                />
                
                <div className="input-group">
                    <label htmlFor="address">Address</label>

                    <input
                        id="address"
                        name="address"
                        placeholder="Address Line 1"
                        defaultValue={employeeData?.address?.line1 ?? ""}
                    />

                    <div className="address-group">

                        <input
                            name="city"
                            placeholder="City"
                            defaultValue={employeeData?.address?.city ?? ""}
                        />

                        <input
                            name="country"
                            placeholder="Country"
                            defaultValue={employeeData?.address?.country ?? ""}
                        />

                        <input
                            type="number"
                            name="postalCode"
                            placeholder="Postal Code"
                            defaultValue={
                                employeeData?.address?.postal_code ?? ""
                            }
                        />
                    </div>
                </div>

                <InputGroup
                    label="Experience"
                    id="experience"
                    name="experience"
                    defaultValue={employeeData?.experience ?? ""}
                />


                <label
                    className="file-upload"
                    onClick={() => setUploadDialog(true)}
                >
                    <p>Upload ID Proof</p>

                    <div>
                        {file && (
                            <div className="preview">
                                {file.name}

                                <img
                                    src={close}
                                    alt="remove file"
                                    className="upload-btn"
                                    onClick={removeFile}
                                />
                            </div>
                        )}

                        <p>
                            <img
                                src={paperclip}
                                alt="attach file"
                            />
                            Attach files
                        </p>
                    </div>
                </label>

                <div className="button-group">
                    <Button
                        typeName="submit"
                        className="primary"
                        label={employeeData ? "Update" : "Create"}
                    />

                    <Button
                        typeName="button"
                        className="outline"
                        label="Cancel"
                        onClick={() => navigate(-1)}
                    />
                </div>
            </form>
        </>
    );
}

export default Form;