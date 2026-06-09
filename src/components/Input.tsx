import React from 'react'

interface inputProps{
  type: string,
  label: string,
  placeholder: string,
  isRequired: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  autoFocus?: boolean,
}
function Input( {type, label, placeholder, isRequired, onChange, autoFocus=false}: inputProps) {
  return (
    <>
        <input type={type} name={label} placeholder={placeholder} required={isRequired} onChange={onChange} autoFocus={autoFocus}/>
    </>
  )
}

export default Input