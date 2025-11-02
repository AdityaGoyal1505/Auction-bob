import React, { useState } from 'react'

export default function TeamMemberCard({ member }){
  const [imageError, setImageError] = useState(false)

  // Convert Google Drive link to thumbnail format (for compatibility)
  // Static images from /static folder work directly
  const getImageUrl = (url) => {
    if (!url) return ''
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] || url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1]
      if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
    return url
  }

  // Use speciality field directly, or fallback to bio/role if provided
  const speciality = member.speciality || member.bio || member.role || 'Team Member'

  return (
    <div className="roster-card">
      {!imageError && member.image_url ? (
        <div className="roster-image-wrapper">
          <img 
            src={getImageUrl(member.image_url)} 
            className="roster-image" 
            alt={member.name}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="roster-image roster-image-placeholder">
          <i className="fas fa-user" style={{fontSize: '4rem', opacity: 0.3}}></i>
          <div style={{marginTop: 'var(--spacing-sm)', fontSize: '0.875rem', opacity: 0.5}}>{member.name}</div>
        </div>
      )}
      <div className="roster-info">
        <div className="roster-name">{member.name}</div>
        <div className="roster-role">{speciality}</div>
      </div>
    </div>
  )
}

