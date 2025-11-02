import React, { useEffect, useState } from 'react'
import Timer from '../components/Timer.jsx'
import Stats from '../components/Stats.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import { getJSON } from '../api.js'

export default function Home(){
  const [status, setStatus] = useState({ time_remaining: 0, total_bids: 0, total_value: 0 })

  async function load(){
    try{
      const data = await getJSON('/api/status')
      setStatus(data)
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section>
      <header>
        <div className="hero-animation-wrapper">
          <video className="hero-animation" src="/static/hero_animation.mp4" autoPlay loop muted playsInline></video>
        </div>
        <h1 className="hero-title">Battle of Bytes 2.0</h1>
        <p className="hero-subtitle">The Ultimate <span className="highlight-gradient">Tech Talent Auction</span> Event</p>
      </header>

      <Timer seconds={Math.max(0, Math.floor(status.time_remaining || 0))} />
      <Stats totalBids={status.total_bids || 0} totalValue={status.total_value || 0} />

      <div className="feature-grid">
        <FeatureCard icon="fas fa-gavel" title="Live Auction">
          Compete in real-time bidding wars. The highest bid at the end of the 72-hour window wins!
        </FeatureCard>
        <FeatureCard icon="fas fa-users" title="Elite Talent">
          Bid on curated tech professionals, from Full-Stack Developers to ML Engineers.
        </FeatureCard>
        <FeatureCard icon="fas fa-trophy" title="9 Teams Competing">
          Nine professional teams competing to build their ultimate tech dream team.
        </FeatureCard>
      </div>

      <div className="auction-section">
        <div className="section-header auction-header">
          <h2 className="section-title auction-title">Auction</h2>
        </div>

        <div className="auction-content-block">
          <div className="auction-content">
            <h3 className="auction-heading">What is the Auction Event?</h3>
            <p className="auction-text">
              The Battle of Bytes auction follows the classic English Auction format, where participants compete in real-time bidding wars. In this open-cry ascending price auction, each player is available for bidding, and teams can place higher bids throughout the auction period. The bidding starts at a base price and continues as participants raise their offers. The player is awarded to the highest bidder at the end of the 72-hour auction window, creating an exciting, transparent, and competitive environment where every team has a fair chance to secure the talent they need.
            </p>
          </div>
          <div className="auction-image">
            <img src="/static/auction.JPG" alt="English Auction Format" />
          </div>
        </div>

        <div className="auction-content-block reverse">
          <div className="auction-image">
            <img src="/static/auction_stage.JPG" alt="Auction Purpose" />
          </div>
          <div className="auction-content">
            <h3 className="auction-heading">Purpose of the Auction: Forge the Future of Code</h3>
            <p className="auction-punchline">Where legends are drafted, and the road to victory begins.</p>
            <p className="auction-text">
              The goal is simple: to ensure every team in the Battle of Bytes is perfectly balanced and fiercely competitive. This auction guarantees a fair and exciting distribution of talent, setting the stage for an epic tournament. The teams built here will be the ones battling it out for glory, bragging rights, and the ultimate title of Battle of Bytes Champions!
            </p>
            <p className="auction-text auction-highlight">
              The clock is ticking. Place your bids, and let the Byte Battle commence!
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
