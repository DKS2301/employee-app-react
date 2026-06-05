import React, { type ReactNode } from 'react'

interface titleProps{
    label:string,
    children?: ReactNode
}

function TitleCard({label, children}: titleProps) {
  return (
    <div className="card title-container">
        <h1>{label}</h1>
        <div className='add-props'>
        {children}
        </div>
    </div>
  )
}

export default TitleCard