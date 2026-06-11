import React, { type ReactNode } from 'react'

interface buttonProps{
  typeName?: string,
  className: string, 
  label: ReactNode,
  onClick?:  React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  id?: string
}

function Button({typeName="text", className, label, onClick=()=>{}, disabled=false, id = ''}: buttonProps) {
  return (
    <>
        <button itemType={typeName} className={className} onClick={onClick} disabled={disabled} id = {id}>{label}</button>
    </>
  )
}

export default Button