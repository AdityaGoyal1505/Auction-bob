import React, { useEffect, useState } from 'react'

export default function Toast({ message, type='ok', duration=3500 }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!message) return
    setShow(true)
    const id = setTimeout(() => setShow(false), duration)
    return () => clearTimeout(id)
  }, [message, duration])
  if (!message) return null
  return (
    <div className={'toast' + (show ? ' show' : '') + (type==='error' ? ' error':'')}>
      <i className={'fas fa-' + (type==='error' ? 'exclamation-circle' : 'check-circle')}></i>
      {message}
    </div>
  )
}
