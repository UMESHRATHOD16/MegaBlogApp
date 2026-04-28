import React from 'react'

function Logo({width = '100px', className = ''}) {
  return (
    <div className={`font-bold text-xl tracking-tight text-slate-900 ${className}`} style={{ width }}>
      MegaBlog
    </div>
  )
}

export default Logo
