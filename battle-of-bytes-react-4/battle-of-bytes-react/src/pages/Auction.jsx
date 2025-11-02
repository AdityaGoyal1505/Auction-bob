import React, { useEffect, useState } from 'react'
import PlayerCard from '../components/PlayerCard.jsx'
import TeamCard from '../components/TeamCard.jsx'
import Modal from '../components/Modal.jsx'
import Toast from '../components/Toast.jsx'
import { getJSON, postJSON, API_BASE } from '../api.js'
import { io } from 'socket.io-client'

const socket = io(API_BASE || undefined, { autoConnect: true })

export default function Auction(){
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [player, setPlayer] = useState(null)
  const [toast, setToast] = useState({ msg: '', type: 'ok' })
  const [form, setForm] = useState({ bid_amount:'' })

  async function loadTeams(){
    try{
      const data = await getJSON('/api/teams')
      setTeams(data)
    }catch(e){ 
      console.error(e)
      // Fallback to mock teams if API doesn't exist
      setTeams([
        { id: 1, name: 'Java Jesters', description: 'The last laugh is always coded in Java.', animation_url: '/static/java_jesters.mp4' },
        { id: 2, name: 'Syntax Samurai', description: 'Slicing through bugs with flawless precision.', animation_url: '/static/syntax_samurai.mp4' },
        { id: 3, name: 'Quantum Coders', description: 'Solving problems at the speed of light. And thought.', animation_url: '/static/quantum_coders.mp4' },
        { id: 4, name: 'Ruby Renegades', description: 'Breaking the mold, writing the next great script.', animation_url: '/static/ruby_renegades.mp4' },
        { id: 5, name: 'Data Mavericks', description: 'Taming the database, one query at a time.', animation_url: '/static/data_mavericks.mp4' },
        { id: 6, name: 'Logic Luminaries', description: 'Illuminating the future with pure, brilliant logic.', animation_url: '/static/logic_luminaries.mp4' },
        { id: 7, name: 'Code Commanders', description: 'We don\'t just write the rules—we enforce the code.', animation_url: '/static/code_commanders.mp4' },
        { id: 8, name: 'Byte Busters', description: 'Every bug\'s nightmare. We make them disappear.', animation_url: '/static/byte_busters.mp4' },
        { id: 9, name: 'Python Pioneers', description: 'Charting the course to victory with versatile scripts.', animation_url: '/static/python_pioneers.mp4' }
      ])
    }
  }

  async function loadPlayers(){
    try{
      const data = await getJSON('/api/players')
      setPlayers(data)
    }catch(e){ console.error(e) }
  }

  function handleTeamSelect(teamId){
    const team = teams.find(t => t.id === teamId)
    setSelectedTeam(team)
    // Load players after team selection
    loadPlayers()
  }

  function handleBackToTeams(){
    setSelectedTeam(null)
    setPlayers([])
  }

  async function openBidModal(id){
    try{
      const p = await getJSON(`/api/players/${id}`)
      setPlayer(p)
      setForm({
        bid_amount: (p.current_bid ?? 0) + 100
      })
    }catch(e){ console.error(e) }
  }

  function close(){ setPlayer(null); setForm({ bid_amount:'' }) }

  async function submit(e){
    e.preventDefault()
    if(!selectedTeam){
      setToast({ msg: 'Please select a team first', type: 'error' })
      return
    }
    if(!player || !player.id){
      setToast({ msg: 'Player information is missing', type: 'error' })
      return
    }
    
    // Reload player data to ensure we have the latest info before bidding
    let freshPlayer = player
    try {
      freshPlayer = await getJSON(`/api/players/${player.id}`)
    } catch(e) {
      console.warn('Could not refresh player data:', e)
    }

    try{
      // Try different field name formats that backend might expect
      const bidData = {
        player_id: String(freshPlayer.id), // Ensure it's a string
        bidder_name: selectedTeam.name,
        bid_amount: Number(form.bid_amount)
      }
      console.log('Submitting bid:', bidData)
      const response = await postJSON('/api/bid', bidData)
      setToast({ msg: 'Bid placed successfully!', type: 'ok' })
      close()
      loadPlayers()
    }catch(err){
      // Check if error contains SQLAlchemy session error - this is a backend issue
      const errorMsg = err?.message || 'Failed to place bid. Please try again.'
      if(errorMsg.includes('not bound to a Session') || errorMsg.includes('SQLAlchemy')){
        setToast({ 
          msg: 'Server error: Please refresh the page and try again. If the issue persists, contact support.', 
          type: 'error' 
        })
      } else {
        setToast({ msg: errorMsg, type: 'error' })
      }
      console.error('Bid submission error:', err, 'Bid data:', { 
        player_id: freshPlayer.id, 
        bidder_name: selectedTeam.name, 
        bid_amount: Number(form.bid_amount),
        player_obj: freshPlayer
      })
    }
  }

  useEffect(() => {
    loadTeams()
  }, [])

  useEffect(() => {
    if(selectedTeam){
      loadPlayers()
    }
  }, [selectedTeam])

  useEffect(() => {
    function onBidUpdate(data){
      setToast({ msg: `${data.bidder_name} bid $${data.bid_amount.toLocaleString()} on ${data.player_name}!`, type: 'ok' })
      loadPlayers()
    }
    socket.on('bid_update', onBidUpdate)
    return () => { socket.off('bid_update', onBidUpdate) }
  }, [])

  // Show teams selection if no team selected
  if(!selectedTeam){
    return (
      <section>
        <div className="section-header">
          <h2 className="section-title">Select Your Team</h2>
          <p className="section-subtitle">Choose your team to start <span className="highlight-gradient">bidding</span> on players</p>
        </div>
        <div className="teams-grid">
          {teams.map((team) => <TeamCard key={team.id} team={team} onSelect={handleTeamSelect} />)}
        </div>
        <Toast message={toast.msg} type={toast.type} />
      </section>
    )
  }

  // Show players after team selection
  return (
    <section>
      <div className="section-header">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)'}}>
          <div>
            <h2 className="section-title">Players on Auction</h2>
            <p className="section-subtitle">Place your bids and secure <span className="highlight-gradient">top talent</span> for <strong>{selectedTeam.name}</strong></p>
          </div>
          <button 
            className="btn" 
            onClick={handleBackToTeams}
            style={{width: 'auto', padding: 'var(--spacing-sm) var(--spacing-md)', background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,.1)'}}
          >
            <i className="fas fa-arrow-left"></i> Change Team
          </button>
        </div>
      </div>
      <div className="players-grid">
        {players.map((p) => <PlayerCard key={p.id} p={p} onOpen={openBidModal} />)}
      </div>

      <Modal open={!!player} onClose={close}>
        {player && (
          <div>
            <h2 style={{marginBottom:'var(--spacing-md)'}}>Place Your Bid</h2>
            <div style={{background:'var(--bg-secondary)',padding:'var(--spacing-md)',borderRadius:'var(--radius-md)',marginBottom:'var(--spacing-md)',border:'1px solid rgba(255,255,255,.05)'}}>
              <h3 style={{marginBottom:'var(--spacing-xs)'}}>{player.name} "{player.nickname}"</h3>
              <p style={{margin:'var(--spacing-xs) 0',color:'var(--text-secondary)'}}>{player.bio}</p>
              <p style={{color:'var(--text-secondary)',marginTop:'var(--spacing-xs)'}}><strong>Skills:</strong> {player.skills}</p>
              <div style={{marginTop:'var(--spacing-md)',display:'flex',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:'.875rem',color:'var(--text-secondary)'}}>Current Bid</div>
                  <div style={{fontSize:'1.75rem',fontWeight:700,background:'var(--accent-gradient)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>${player.current_bid.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{fontSize:'.875rem',color:'var(--text-secondary)'}}>Total Bids</div>
                  <div style={{fontSize:'1.75rem',fontWeight:700}}>{player.total_bids}</div>
                </div>
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="form-group">
                <label>Bidding as: <strong>{selectedTeam?.name}</strong></label>
              </div>
              <div className="form-group">
                <label>Bid Amount ($)</label>
                <input type="number" required step={100} min={(player.current_bid ?? 0) + 100} value={form.bid_amount}
                       onChange={(e)=>setForm(f=>({...f,bid_amount:e.target.value}))} />
              </div>
              <button className="btn" type="submit"><i className="fas fa-gavel"></i> Place Bid</button>
            </form>

            <div className="bid-history" style={{marginTop:'var(--spacing-md)'}}>
              <h3>Recent Bids</h3>
              {player.bid_history?.length ? player.bid_history.map((b, idx) => (
                <div className="bid-item" key={idx}>
                  <div>
                    <strong>{b.bidder_name}</strong><br/>
                    <small style={{color:'var(--text-tertiary)'}}>{new Date(b.timestamp).toLocaleString()}</small>
                  </div>
                  <div style={{fontSize:'1.25rem',fontWeight:700,background:'var(--accent-gradient)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                    ${b.bid_amount.toLocaleString()}
                  </div>
                </div>
              )) : <p style={{color:'var(--text-secondary)',textAlign:'center'}}>No bids yet. Be the first!</p>}
            </div>
          </div>
        )}
      </Modal>

      <Toast message={toast.msg} type={toast.type} />
    </section>
  )
}
