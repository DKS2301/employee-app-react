import React from 'react'

interface inputProps{
  type: string,
  label: string,
  placeholder: string,
  isRequired: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}
function Input( {type, label, placeholder, isRequired, onChange}: inputProps) {
  return (
    <>
        <input type={type} name={label} placeholder={placeholder} required={isRequired} onChange={onChange}/>
    </>
  )
}

export default Input