import React, { useState } from 'react'
import { postJSON } from '../api.js'
import Toast from '../components/Toast.jsx'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [toast, setToast] = useState({ msg:'', type:'ok' })

  async function submit(e){
    e.preventDefault()
    try{
      const data = await postJSON('/api/enquiry', form)
      setToast({ msg: data.message || 'Enquiry submitted successfully!', type: 'ok' })
      setForm({ name:'', email:'', message:'' })
    }catch(e){
      setToast({ msg: 'Error submitting enquiry', type: 'error' })
    }
  }

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Have questions? We'd <span className="highlight-gradient">love</span> to hear from you</p>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto'}}>
        <div style={{background:'var(--card-bg-solid)',padding:'var(--spacing-xl)',borderRadius:'var(--radius-lg)',boxShadow:'var(--shadow-md)',border:'1px solid rgba(255,255,255,.05)'}}>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Name</label>
              <input required value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea required value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))} />
            </div>
            <button className="btn" type="submit">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>

      <Toast message={toast.msg} type={toast.type} />
    </section>
  )
}
