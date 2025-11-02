import React from 'react'
import TeamMemberCard from '../components/TeamMemberCard.jsx'

export default function About(){
  // Hardcoded team members who created the website
  // Update image paths, names, and specialities as needed
  const teamMembers = [
    {
      id: 1,
      name: 'Aditya Goyal',
      image_url: '/static/aditya_goyal.png',
      speciality: 'Full Stack Developer'
    },
    {
      id: 2,
      name: 'Gourav Mittal',
      image_url: '/static/gaurav_mittal.jpg',
      speciality: 'Backend Artist'
    },
    {
      id: 3,
      name: 'Aditya Gupta',
      image_url: '/static/aditya_gupta.jpeg',
      speciality: 'Full Stack Developer'
    },
    {
      id: 4,
      name: 'Sara Nahata',
      image_url: '/static/Sara.jpg',
      speciality: 'SQL, Competitive Programming'
    },
    {
      id: 5,
      name: 'Shirish Pareek',
      image_url: '/static/sirishi.png',
      speciality: 'Stratigies & Tactics'
    },
    {
      id: 6,
      name: 'Sanchit Pawa',
      image_url: '/static/sanchit_pawa.png',
      speciality: 'Python, C++, DSA'
    },
    {
      id: 7,
      name: 'Sarthak Goyal',
      image_url: '/static/sarthak.png',
      speciality: 'C, C++, DSA , Python'
    },
    {
      id: 8,
      name: 'Kumud Agrawal',
      image_url: '/static/Kumud.png',
      speciality: 'DSA, Competitive Programming'
    },
    {
      id: 9,
      name: 'Shaikh Fahad',
      image_url: '/static/fahad.png',
      speciality: 'DSA, Competitive Programming'
    },
    {
      id: 10,
      name: 'Rishit Murarka',
      image_url: '/static/rishit.png',
      speciality: 'JAVA Devloper'
    }

  ]

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">About Our Team</h2>
        <p className="section-subtitle">Meet the talented <span className="highlight-gradient">Quantum Coders</span> behind Battle of Bytes 2.0</p>
      </div>
      <div className="roster-grid">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  )
}

