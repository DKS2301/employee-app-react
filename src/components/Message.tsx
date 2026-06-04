import React, { type ReactNode } from 'react'

interface messageProps{
    content: ReactNode,
    id: string
}

function Message({content, id}: messageProps) {
  return (
    <>
      <div className='message-sent' id={id}>
        {content}
      </div>
    </>
  )
}

export default Message