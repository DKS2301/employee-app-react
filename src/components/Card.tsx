import React, { type ReactNode } from 'react'

function Card({children}:{children: ReactNode}) {
  return (
    <div className="contents">
        {children}
    </div>
  )
}

export default Card