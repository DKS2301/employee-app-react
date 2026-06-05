import React, { useState } from 'react'

interface Option {
  value: string;
}

interface inputProps{
    label: string,
    id: string,
    type?: string,
    name?: string,
    variant?: "input" | "select";
    options?: Option[];
    defaultValue: string
}

function InputGroup({label, id, type='text', variant = "input", options = [], name ='', defaultValue =''} : inputProps) {
    debugger

    console.log({
        label,
        defaultValue
    })
  return (    
    <div className="input-group">
        <label htmlFor={id}>{label}</label>
        {variant === "input" ? (
            <input
                id={id}
                placeholder={label}
                type={type}
                name={name}
                defaultValue={defaultValue}
                />
            ) : (
                <select
                    id={id}
                    name={name}
                    defaultValue={defaultValue}
                >
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