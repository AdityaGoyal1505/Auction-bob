import React from 'react'

function iconFor(type){
  const m = { bid:'fas fa-gavel', poll:'fas fa-poll', enquiry:'fas fa-envelope' }
  return m[type] || 'fas fa-bell'
}

export default function ActivityFeed({ items=[] }) {
  return (
    <div className="activity-feed">
      {items.map((item) => (
        <div className="activity-item" key={item.id}>
          <div className="activity-icon"><i className={iconFor(item.type)}></i></div>
          <div className="activity-content">
            <div className="activity-desc">{item.description}</div>
            <div className="activity-time">{new Date(item.timestamp).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
