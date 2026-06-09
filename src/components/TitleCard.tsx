import React, { type ReactNode } from 'react'

interface titleProps{
    label:string,
    children?: ReactNode
}

function TitleCard({label, children}: titleProps) {
  return (
    <div className="card title-container">
        <h2>{label}</h2>
        <div className='add-props'>
        {children}
        </div>
    </div>
  )
}

export default TitleCard