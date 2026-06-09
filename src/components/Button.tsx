import React, { type ReactNode } from 'react'

interface buttonProps{
  typeName?: string,
  className: string, 
  label: ReactNode,
  onClick?:  React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean
}

function Button({typeName="text", className, label, onClick=()=>{}, disabled=false}: buttonProps) {
  return (
    <>
        <button itemType={typeName} className={className} onClick={onClick} disabled={disabled}>{label}</button>
    </>
  )
}

export default Button