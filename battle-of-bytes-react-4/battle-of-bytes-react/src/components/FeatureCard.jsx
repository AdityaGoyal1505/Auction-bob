import React from 'react'

export default function FeatureCard({ icon, title, children }) {
  return (
    <div className="feature-card">
      <div className="feature-icon"><i className={icon}></i></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
