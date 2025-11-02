import React, { useEffect, useState, useRef } from 'react'

export default function Timer({ seconds }) {
  const [remaining, setRemaining] = useState(seconds ?? 0)
  const prevValues = useRef({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    setRemaining(seconds ?? 0)
  }, [seconds])

  useEffect(() => {
    if (remaining <= 0) return
    const id = setInterval(() => setRemaining((s) => Math.max(0, s-1)), 1000)
    return () => clearInterval(id)
  }, [remaining])

  const days = Math.floor(remaining / 86400)
  const hours = Math.floor((remaining % 86400) / 3600)
  const mins = Math.floor((remaining % 3600) / 60)
  const secs = Math.floor(remaining % 60)

  const Box = ({value, label, prevValue}) => {
    const isChanging = value !== prevValue
    return (
      <div className="timer-box">
        <div className="timer-value-wrapper">
          <div className={`timer-value ${isChanging ? 'flip' : ''}`} key={`${label}-${value}`}>
            {String(value).padStart(2,'0')}
          </div>
        </div>
        <div className="timer-label">{label}</div>
      </div>
    )
  }

  // Get previous values for comparison (before updating)
  const prevDays = prevValues.current.days
  const prevHours = prevValues.current.hours
  const prevMins = prevValues.current.mins
  const prevSecs = prevValues.current.secs

  // Update prevValues after render completes
  useEffect(() => {
    prevValues.current = { days, hours, mins, secs }
  })

  return (
    <div className="timer">
      <Box value={days} label="Days" prevValue={prevDays} />
      <Box value={hours} label="Hours" prevValue={prevHours} />
      <Box value={mins} label="Minutes" prevValue={prevMins} />
      <Box value={secs} label="Seconds" prevValue={prevSecs} />
    </div>
  )
}
