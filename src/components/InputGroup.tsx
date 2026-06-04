import React from 'react'

interface Option {
  value: string;
}

interface inputProps{
    label: string,
    id: string,
    type?: string,
    variant?: "input" | "select";
    options?: Option[];
}

function InputGroup({label, id, type='text', variant = "input", options = []} : inputProps) {
  return (    
    <div className="input-group">
        <label htmlFor={id}>{label}</label>
        {variant === "input" ? (
            <input
                id={id}
                placeholder={label}
                type={type}
                />
            ) : (
                <select id={id}>
                {options.map((option) => (
                    <option
                    key={option.value}
                    value={option.value}
                    >
                    {option.value}
                    </option>
                ))}
                </select>
            )}
    </div>
  )
}

export default InputGroup