import React from 'react'

export default function PollCard({ team, onVote }){
  return (
    <div className="poll-card" onClick={() => onVote?.(team.team_name)}>
      <div className="poll-name">{team.team_name}</div>
      <div className="poll-votes">{team.votes}</div>
      <div style={{fontSize:'.875rem',color:'var(--text-secondary)',marginTop:'var(--spacing-xs)'}}>votes</div>
    </div>
  )
}
