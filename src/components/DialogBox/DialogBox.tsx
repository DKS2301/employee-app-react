import React, { type ReactNode } from 'react'
import './DialogBox.css'

interface dialogProps{
    classNames: string,
    children?: ReactNode
}

function DialogBox({classNames,children}: dialogProps) {
  return (
    <div className= 'dialog-box'>
      <div className={`dialog-contents ${classNames}`}>
        {children}
      </div>
    </div>
  )
}

export default DialogBox