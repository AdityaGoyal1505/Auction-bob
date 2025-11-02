import React, { useState } from 'react'

export default function PlayerCard({ p, onOpen }) {
  const [imageError, setImageError] = useState(false)

  // Convert Google Drive link to thumbnail format
  const getImageUrl = (url) => {
    if (!url) return ''
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] || url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1]
      if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
    return url
  }

  return (
    <div className="player-card" onClick={() => onOpen(p.id)}>
      {!imageError && p.image_url ? (
        <img 
          src={getImageUrl(p.image_url)} 
          className="player-image" 
          alt={p.name}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="player-image player-image-placeholder">
          <i className="fas fa-user" style={{fontSize: '4rem', opacity: 0.3}}></i>
          <div style={{marginTop: 'var(--spacing-sm)', fontSize: '0.875rem', opacity: 0.5}}>{p.name}</div>
        </div>
      )}
      <div className="player-info">
        <div className="player-name">{p.name}</div>
        <div className="player-role">"{p.nickname}" - {p.role}</div>
        <div className="bid-info">
          <div className="current-bid">${p.current_bid.toLocaleString()}</div>
          <div className="bid-count">{p.total_bids} bids</div>
        </div>
        {p.highest_bidder ? (
          <div className="highest-bidder">
            <i className="fas fa-trophy"></i>
            Leader: {p.highest_bidder}
          </div>
        ) : null}
        <button className="btn" onClick={(e) => { e.stopPropagation(); onOpen(p.id) }}>
          <i className="fas fa-gavel"></i> Place Bid
        </button>
      </div>
    </div>
  )
}
