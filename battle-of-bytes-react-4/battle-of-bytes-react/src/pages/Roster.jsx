import React, { useEffect, useState } from 'react'
import { getJSON } from '../api.js'
import RosterSection from '../components/RosterSection.jsx'

export default function Roster(){
  const [data, setData] = useState({ coordinators:[], teams:[], faculty:[] })

  async function load(){
    try{
      const d = await getJSON('/api/people')
      setData(d)
    }catch(e){ console.error(e) }
  }

  useEffect(() => { load() }, [])

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Meet Our Coordinators</h2>
        <p className="section-subtitle">The brilliant minds behind <span className="highlight-gradient">Battle of Bytes 2.0</span></p>
      </div>
      <RosterSection title="Faculty" items={data.faculty} />
      <RosterSection title="Head Coordinators" items={data.coordinators} />
      <RosterSection title="Bidding Teams" items={data.teams} />

    </section>
  )
}
