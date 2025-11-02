import React, { useEffect, useState } from 'react'
import ActivityFeed from '../components/ActivityFeed.jsx'
import { getJSON, API_BASE } from '../api.js'
import { io } from 'socket.io-client'

const socket = io(API_BASE || undefined, { autoConnect: true })

export default function Feed(){
  const [items, setItems] = useState([])

  async function load(){
    try{
      const data = await getJSON('/api/activity')
      setItems(data)
    }catch(e){ console.error(e) }
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    function onUpdate(item){ setItems((prev) => [item, ...prev]) }
    socket.on('activity_update', onUpdate)
    return () => socket.off('activity_update', onUpdate)
  }, [])

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Live Activity Feed</h2>
        <p className="section-subtitle"><span className="highlight-gradient">Real-time</span> updates on all auction activities</p>
      </div>
      <ActivityFeed items={items} />
    </section>
  )
}
