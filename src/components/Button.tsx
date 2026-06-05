import React, { type ReactNode } from 'react'

interface buttonProps{
  typeName?: string,
  className: string, 
  label: ReactNode,
  onClick?:  React.MouseEventHandler<HTMLButtonElement>
}

function Button({typeName="text", className, label, onClick=()=>{}}: buttonProps) {
  return (
    <>
        <button itemType={typeName} className={className} onClick={onClick}>{label}</button>
    </>
  )
}

export default Button