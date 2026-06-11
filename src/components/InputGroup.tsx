import React from 'react';

interface Option {
    value: string;
}

interface inputProps {
    label: string;
    id: string;
    type?: string;
    name?: string;
    variant?: 'input' | 'select';
    options?: Option[];
    defaultValue: string;
    disabled?: boolean;
}

function InputGroup({
    label,
    id,
    type = 'text',
    variant = 'input',
    options = [],
    name = '',
    defaultValue = '',
    disabled = false,
}: inputProps) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            {variant === 'input' ? (
                <input
                    id={id}
                    placeholder={label}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    disabled={disabled}
                />
            ) : (
                <select id={id} name={name} defaultValue={defaultValue}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default InputGroup;
