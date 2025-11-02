import React, { useEffect, useState } from 'react'
import { getJSON, postJSON, API_BASE } from '../api.js'
import PollCard from '../components/PollCard.jsx'
import Toast from '../components/Toast.jsx'
import { io } from 'socket.io-client'

const socket = io(API_BASE || undefined, { autoConnect: true })

export default function Poll(){
  const [teams, setTeams] = useState([])
  const [toast, setToast] = useState({ msg:'', type:'ok' })

  async function load(){
    try{
      const data = await getJSON('/api/poll')
      setTeams(data)
    }catch(e){ console.error(e) }
  }
  async function vote(team_name){
    try{
      await postJSON('/api/poll/vote', { team_name })
      setToast({ msg:'Vote recorded!', type:'ok' })
      load()
    }catch(e){ setToast({ msg:String(e?.message || e), type:'error' }) }
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    function onUpdate(){ load() }
    socket.on('poll_update', onUpdate)
    return () => socket.off('poll_update', onUpdate)
  }, [])

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Vote for Your Favorite Team</h2>
        <p className="section-subtitle">Which team will <span className="highlight-gradient">dominate</span> the auction?</p>
      </div>
      <div className="poll-grid">
        {teams.map((t) => <PollCard key={t.id || t.team_name} team={t} onVote={vote} />)}
      </div>
      <Toast message={toast.msg} type={toast.type} />
    </section>
  )
}
