import React from 'react'

export default function TeamCard({ team, onSelect }) {
  return (
    <div className="team-card" onClick={() => onSelect(team.id)}>
      <div className="team-animation">
        {team.animation_url ? (
          <video 
            src={team.animation_url} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="team-animation-video"
          />
        ) : (
          <div className="team-animation-placeholder">
            <i className="fas fa-users" style={{fontSize: '4rem', opacity: 0.3}}></i>
          </div>
        )}
      </div>
    </div>
  )
}

