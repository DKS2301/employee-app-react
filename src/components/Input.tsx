import React from 'react'

interface inputProps{
  type: string,
  label: string,
  placeholder: string,
  isRequired: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  autoFocus?: boolean,
  id?: string
}
function Input( {type, label, placeholder, isRequired, onChange, autoFocus=false, id =''}: inputProps) {
  return (
    <>
        <input 
        type={type}
        name={label}
        placeholder={placeholder}
        required={isRequired}
        onChange={onChange}
        autoFocus={autoFocus}
        id= {id}/>
    </>
  )
}

export default Input