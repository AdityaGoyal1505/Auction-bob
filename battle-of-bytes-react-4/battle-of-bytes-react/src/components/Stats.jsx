import React from 'react'

export default function Stats({ totalBids=0, totalValue=0 }) {
  return (
    <div className="stats" id="stats">
      <div className="stat-card">
        <div className="stat-value">{totalBids}</div>
        <div className="stat-label">Total Bids</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">${totalValue.toLocaleString()}</div>
        <div className="stat-label">Total Value</div>
      </div>
    </div>
  )
}
