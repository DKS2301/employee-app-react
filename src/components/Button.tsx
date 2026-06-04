import React, { type ReactNode } from 'react'

interface buttonProps{
  typeName?: string,
  className: string, 
  label: ReactNode
}

function Button({typeName="text", className, label}: buttonProps) {
  return (
    <>
        <button itemType={typeName} className={className}>{label}</button>
    </>
  )
}

export default Button