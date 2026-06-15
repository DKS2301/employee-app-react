import close from '@images/close.svg';
import cloud from '@images/cloud.svg';
import paperclip from '@images/paperclip.svg';
import upload from '@images/upload.svg';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useNavigate } from 'react-router';

import Button from './Button';
import DialogBox from './DialogBox/DialogBox';
import InputGroup from './InputGroup';

export interface EmployeeAddress {
    line1: string;
    city: string;
    country: string;
    postal_code: string | number;
}

export interface EmployeeData {
    id: number;
    name: string;
    email: string;
    joiningDate: string;
    role: string;
    status?: string;
    experience: number;
    address?: EmployeeAddress;
}
interface FormProps {
    employeeData?: EmployeeData;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FILE_TYPES = ['JPG', 'PNG', 'GIF'];

const STATUS_OPTIONS = [
    { value: 'Probation' },
    { value: 'Active' },
    { value: 'Inactive' },
    { value: 'Terminated' },
];

const ROLE_OPTIONS = [{ value: 'UI' }, { value: 'UX' }, { value: 'DEVELOPER' }, { value: 'HR' }];

function Form({ employeeData, onSubmit }: FormProps) {
    const navigate = useNavigate();

    const [uploadDialog, setUploadDialog] = useState(false);
    const [file, setFile] = useState<File>();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formValues, setFormValues] = useState(() => ({
        name: employeeData?.name ?? '',
        email: employeeData?.email ?? '',
        joiningDate: employeeData?.joiningDate ?? '',
        role: employeeData?.role ?? '',
        status: employeeData?.status ?? 'Active',
        address: employeeData?.address?.line1 ?? '',
        city: employeeData?.address?.city ?? '',
        country: employeeData?.address?.country ?? '',
        postalCode: String(employeeData?.address?.postal_code ?? ''),
        experience: employeeData?.experience ?? '',
    }));

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};

        if (!formValues.name.trim()) {
            nextErrors.name = 'Employee name is required.';
        }
        if (!formValues.email.trim()) {
            nextErrors.email = 'Employee email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (!formValues.role.trim()) {
            nextErrors.role = 'Role is required.';
        }
        if (!formValues.status?.trim()) {
            nextErrors.status = 'Status is required.';
        }
        if (!formValues.joiningDate) {
            nextErrors.joiningDate = 'Joining date is required.';
        }
        if (!formValues.experience) {
            nextErrors.experience = 'Experience is required.';
        }

        if (!formValues.address.trim() || formValues.address.length > 100) {
            nextErrors.address = 'Address line 1 must be 1 to 100 characters.';
        }
        if (!formValues.city.trim() || formValues.city.length > 50) {
            nextErrors.city = 'City must be 1 to 50 characters.';
        }
        if (!formValues.country.trim() || formValues.country.length > 20) {
            nextErrors.country = 'Country must be 1 to 20 characters.';
        }
        if (!formValues.postalCode.trim() || formValues.postalCode.length > 10) {
            nextErrors.postalCode = 'Postal code must be 1 to 10 characters.';
        }

        setErrors(nextErrors);
        return nextErrors;
    };

    const handleFileChange = (selectedFile: File | File[]) => {
        setFile(Array.isArray(selectedFile) ? selectedFile[0] : selectedFile);
    };

    const updateField = (field: keyof typeof formValues, value: string) => {
        setFormValues((current) => ({ ...current, [field]: value }));
        if (errors[field]) {
            setErrors((current) => ({ ...current, [field]: '' }));
        }
    };

    const closeUploadDialog = () => {
        setUploadDialog(false);
    };

    const removeFile = (e?: React.MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
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
                            <img src={close} alt="close" onClick={closeUploadDialog} />
                        </div>

                        <FileUploader
                            handleChange={handleFileChange}
                            name="file"
                            types={FILE_TYPES}
                        >
                            <div className="upload-box">
                                <img src={cloud} alt="cloud" className="cloud-img" />

                                {!file ? (
                                    <div className="upload-options">
                                        <p>Drag & drop file here</p>

                                        <div className="or">Or</div>

                                        <div>
                                            <img src={upload} alt="upload" className="upload-img" />
                                            <p>Upload file</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p data-testid="file-name">{file.name}</p>
                                )}
                            </div>
                        </FileUploader>

                        <div className="button-group">
                            <Button
                                typeName="button"
                                className="outline"
                                label="Cancel"
                                onClick={removeFile}
                                testId="cancel-file"
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

            <form
                key={employeeData?.id ?? 'new'}
                className="card"
                onSubmit={(event) => {
                    event.preventDefault();

                    if (Object.keys(validateForm()).length > 0) {
                        return;
                    }

                    onSubmit(event);
                }}
            >
                <div className="input-group">
                    <label htmlFor="employee-name">Employee Name</label>
                    <input
                        id="employee-name"
                        name="employee-name"
                        value={formValues.name}
                        onChange={(event) => updateField('name', event.target.value)}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="employee-email">Employee Email</label>
                    <input
                        id="employee-email"
                        name="employee-email"
                        type="email"
                        value={formValues.email}
                        onChange={(event) => updateField('email', event.target.value)}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <InputGroup
                    label="Employee ID"
                    id="employee-id"
                    name="employee-id"
                    defaultValue={(employeeData?.id as unknown as string) ?? ''}
                    disabled={true}
                />

                <div className="input-group">
                    <label htmlFor="joining-date">Joining Date</label>
                    <input
                        id="joining-date"
                        name="joining-date"
                        type="date"
                        value={formValues.joiningDate}
                        onChange={(event) => updateField('joiningDate', event.target.value)}
                    />
                    {errors.joiningDate && <p className="error-text">{errors.joiningDate}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formValues.role}
                        onChange={(event) => updateField('role', event.target.value)}
                    >
                        {ROLE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    {errors.role && <p className="error-text">{errors.role}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formValues.status}
                        onChange={(event) => updateField('status', event.target.value)}
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    {errors.status && <p className="error-text">{errors.status}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="address">Address</label>

                    <input
                        id="address"
                        name="address"
                        placeholder="Address Line 1"
                        value={formValues.address}
                        onChange={(event) => updateField('address', event.target.value)}
                    />
                    {errors.address && <p className="error-text">{errors.address}</p>}

                    <div className="address-group">
                        <input
                            name="city"
                            placeholder="City"
                            value={formValues.city}
                            onChange={(event) => updateField('city', event.target.value)}
                        />
                        {errors.city && <p className="error-text">{errors.city}</p>}

                        <input
                            name="country"
                            placeholder="Country"
                            value={formValues.country}
                            onChange={(event) => updateField('country', event.target.value)}
                        />
                        {errors.country && <p className="error-text">{errors.country}</p>}

                        <input
                            type="number"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={formValues.postalCode}
                            onChange={(event) => updateField('postalCode', event.target.value)}
                        />
                        {errors.postalCode && <p className="error-text">{errors.postalCode}</p>}
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="experience">Experience</label>
                    <input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formValues.experience}
                        onChange={(event) => updateField('experience', event.target.value)}
                    />
                    {errors.experience && <p className="error-text">{errors.experience}</p>}
                </div>

                <label className="file-upload" onClick={() => setUploadDialog(true)}>
                    <p>Upload ID Proof</p>

                    <div data-testid="file-upload">
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
                            <img src={paperclip} alt="attach file" />
                            Attach files
                        </p>
                    </div>
                </label>

                <div className="button-group">
                    <Button
                        typeName="submit"
                        className="primary"
                        label={employeeData ? 'Update' : 'Create'}
                    />

                    <Button
                        typeName="button"
                        className="outline"
                        label="Cancel"
                        testId="form-cancel"
                        onClick={() => navigate(-1)}
                    />
                </div>
            </form>
        </>
    );
}

export default Form;
