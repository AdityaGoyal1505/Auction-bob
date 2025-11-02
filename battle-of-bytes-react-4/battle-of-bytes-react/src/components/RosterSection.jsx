import React, { useState } from 'react'

function Card({ p }){
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
    <div className="roster-card">
      {!imageError && p.image_url ? (
        <div className="roster-image-wrapper">
          <img 
            src={getImageUrl(p.image_url)} 
            className="roster-image" 
            alt={p.name}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="roster-image roster-image-placeholder">
          <i className="fas fa-user" style={{fontSize: '4rem', opacity: 0.3}}></i>
          <div style={{marginTop: 'var(--spacing-sm)', fontSize: '0.875rem', opacity: 0.5}}>{p.name}</div>
        </div>
      )}
      <div className="roster-info">
        <div className="roster-name">{p.name}</div>
        <div className="roster-role">{p.role}</div>
        <p className="roster-bio">{p.bio}</p>
        <div className="roster-contact">
          {p.email && (
            <a href={`mailto:${p.email}`} className="roster-email">
              <i className="fas fa-envelope"></i> {p.email}
            </a>
          )}
          {p.social_handle && (
            <a href="#" className="roster-social">
              <i className="fab fa-instagram"></i> {p.social_handle}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RosterSection({ title, items=[] }){
  return (
    <div className="roster-section">
      <h3 className="roster-section-title">{title}</h3>
      <div className="roster-grid">
        {items.map((p) => <Card key={`${title}-${p.id}`} p={p} />)}
      </div>
    </div>
  )
}
