import { useState } from 'react'
import './App.css'

// ─── SETUP ───────────────────────────────────────────────────────────────────
// To make the RSVP form send emails to laishasilva17@gmail.com:
//   1. Go to https://formspree.io and sign up (free)
//   2. Click "New Form", name it "Theodore RSVP"
//   3. Set the notification email to laishasilva17@gmail.com
//   4. Copy your form ID (looks like "xyzabc12") and paste it below
const FORMSPREE_ID = 'xvznowep'

// ─── PARTY DETAILS ───────────────────────────────────────────────────────────
// Update these with the real info before deploying!
const PARTY_DATE = 'Sunday, 08/08/2026'
const PARTY_TIME = '1pm – 3pm'
const PARTY_LOCATION = 'Mason Lake'

// ─────────────────────────────────────────────────────────────────────────────

const BLOCK_COLORS = [
  '#DC2626', // T — red
  '#1E3A8A', // H — navy
  '#D97706', // E — amber
  '#16A34A', // O — green
  '#7C3AED', // D — purple
  '#EA580C', // O — orange
  '#DC2626', // R — red
  '#2563EB', // E — blue
]

function ToyBlock({ letter, color, index, delay }) {
  return (
    <div
      className="toy-block"
      style={{
        backgroundColor: color,
        animationDelay: `${delay}s`,
        transform: `rotate(${index % 2 === 0 ? '-3.5deg' : '3.5deg'})`,
      }}
    >
      <span className="block-letter">{letter}</span>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState({
    name: '', email: '', attending: '', guests: '1', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const setAttending = val =>
    setForm(prev => ({ ...prev, attending: val }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          attending: form.attending,
          guests: form.attending === 'Yes' ? form.guests : 'N/A',
          message: form.message || '(no message)',
          _replyto: form.email,
          _subject: `RSVP from ${form.name} — Theodore's Birthday Party!`,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', attending: '', guests: '1', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const letters = 'THEODORE'.split('')

  return (
    <div className="page">
      {/* Animated sky clouds */}
      <div className="sky-layer" aria-hidden="true">
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
        <div className="cloud c4" />
        <div className="cloud c5" />
      </div>

      <main className="content">
        {/* ── Toy Block Name ── */}
        <section className="hero">
          <p className="tagline">IT&apos;S A</p>
          <div className="blocks-row" role="heading" aria-label="Theodore" aria-level="1">
            {letters.map((letter, i) => (
              <ToyBlock
                key={i}
                letter={letter}
                color={BLOCK_COLORS[i]}
                index={i}
                delay={i * 0.07}
              />
            ))}
          </div>
          <p className="tagline">BIRTHDAY PARTY!</p>
        </section>

        {/* ── Invitation Postcard ── */}
        <section className="postcard">
          <div className="postcard-header">
            <div className="star-row">⭐ ⭐ ⭐</div>
            <h2 className="invited-title">YOU&apos;RE INVITED!</h2>
            <div className="star-row">⭐ ⭐ ⭐</div>
          </div>

          <div className="details">
            <div className="detail">
              <span className="detail-icon">📅</span>
              <div>
                <small>WHEN</small>
                <strong>{PARTY_DATE}</strong>
              </div>
            </div>
            <div className="detail">
              <span className="detail-icon">🕑</span>
              <div>
                <small>TIME</small>
                <strong>{PARTY_TIME}</strong>
              </div>
            </div>
            <div className="detail">
              <span className="detail-icon">📍</span>
              <div>
                <small>WHERE</small>
                <strong>{PARTY_LOCATION}</strong>
              </div>
            </div>
          </div>

          <div className="postcard-footer">
            <p>To Infinity and Beyond! 🚀</p>
          </div>
        </section>

        {/* ── RSVP Form ── */}
        <section className="rsvp-card">
          <h2 className="rsvp-heading">RSVP</h2>
          <p className="rsvp-sub">Kindly respond at your earliest convenience.</p>

          {status === 'success' ? (
            <div className="success">
              <div className="success-rocket">🚀</div>
              <h3>Blast off! RSVP received!</h3>
              <p>We can&apos;t wait to celebrate with you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Cowboy or Spaceman?"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <span className="field-label">Will you attend?</span>
                <div className="attend-row">
                  <button
                    type="button"
                    className={`attend-btn yes ${form.attending === 'Yes' ? 'active' : ''}`}
                    onClick={() => setAttending('Yes')}
                  >
                    🤠 Yee-Haw! Count me in!
                  </button>
                  <button
                    type="button"
                    className={`attend-btn no ${form.attending === 'No' ? 'active' : ''}`}
                    onClick={() => setAttending('No')}
                  >
                    😢 Can&apos;t make it
                  </button>
                </div>
              </div>

              {form.attending === 'Yes' && (
                <div className="field">
                  <label htmlFor="guests">Number of Guests</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
                    <option value="1">1 — just me!</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              )}

              <div className="field">
                <label htmlFor="message">
                  Message for Theodore <span className="optional">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Say something fun!"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {status === 'error' && (
                <p className="error-msg">
                  Uh oh! Something went wrong — make sure your Formspree ID is set and try again.
                </p>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={!form.attending || status === 'sending'}
              >
                {status === 'sending' ? '🚀 Sending...' : '🚀 Send RSVP!'}
              </button>
            </form>
          )}
        </section>
      </main>

      <div className="ground" aria-hidden="true" />
    </div>
  )
}
