import React, { useState, useEffect } from 'react'

interface IDetails {
  children: any
}

export const Details: React.FC<IDetails> = ({ children }) => {
  return (
    <div className="m-10 border border-green-700 w-50 h-auto">
      <div className="p-2">{children}</div>
    </div>
  )
}
