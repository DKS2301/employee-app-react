import React from 'react'

function Input(props: { type: string, label: string, placeholder: string, isRequired: boolean}) {
  return (
    <>
        <input type={props.type} name={props.label} placeholder={props.placeholder} required={props.isRequired}/>
    </>
  )
}

export default Input