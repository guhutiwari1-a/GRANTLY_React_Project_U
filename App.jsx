import React, { useEffect, useMemo, useState } from 'react'
import {
  LayoutDashboard, Search, Bookmark, FileText, UserRound, Settings, Bell,
  ChevronDown, ArrowUpRight, ArrowRight, Sparkles, CalendarDays, Wallet,
  GraduationCap, Clock3, Menu, X, Heart, CheckCircle2, UploadCloud,
  ExternalLink, SlidersHorizontal, CircleAlert, ClipboardList, Trash2
} from 'lucide-react'
import { scholarships, defaultProfile, documentChecklistNote } from './data.js'

const STORAGE = {
  saved: 'grantly.saved.v2',
  profile: 'grantly.profile.v2',
  applications: 'grantly.applications.v2'
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch (error) {
    console.warn(`Could not persist ${key}`, error)
  }
}

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Find scholarships', icon: Search },
  { label: 'My shortlist', icon: Bookmark },
  { label: 'Applications', icon: FileText },
  { label: 'My profile', icon: UserRound }
]

const categories = ['All categories', 'Merit-based', 'Need-based', 'Merit + means', 'Category-based']
const levels = ['All study levels', 'School', 'Undergraduate', 'Undergraduate / Postgraduate', 'Post-matric', 'Undergraduate · First year']

export default function App() {
  const [active, setActive] = useState('Overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [level, setLevel] = useState('All study levels')
  const [saved, setSaved] = useState(() => readStorage(STORAGE.saved, []))
  const [profile, setProfile] = useState(() => ({ ...defaultProfile, ...readStorage(STORAGE.profile, {}) }))
  const [applications, setApplications] = useState(() => readStorage(STORAGE.applications, []))
  const [selectedScholarship, setSelectedScholarship] = useState(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => writeStorage(STORAGE.saved, saved), [saved])
  useEffect(() => writeStorage(STORAGE.profile, profile), [profile])
  useEffect(() => writeStorage(STORAGE.applications, applications), [applications])

  const filteredScholarships = useMemo(() => scholarships.filter(item => {
    const haystack = [item.name, item.provider, item.category, item.level, ...item.tags].join(' ').toLowerCase()
    const matchesQuery = haystack.includes(query.trim().toLowerCase())
    const matchesCategory = category === 'All categories' || item.category === category
    const matchesLevel = level === 'All study levels' || item.level === level || item.level.includes(level)
    const matchesSaved = active !== 'My shortlist' || saved.includes(item.id)
    return matchesQuery && matchesCategory && matchesLevel && matchesSaved
  }), [query, category, level, active, saved])

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(notify.timer)
    notify.timer = window.setTimeout(() => setToast(''), 3200)
  }

  const navigate = (label) => {
    setActive(label)
    setMobileNavOpen(false)
    setSelectedScholarship(null)
    if (label === 'Find scholarships' || label === 'My shortlist') {
      window.setTimeout(() => document.getElementById('scholarship-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
  }

  const toggleSaved = (id) => {
    setSaved(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id])
    notify(saved.includes(id) ? 'Removed from your shortlist.' : 'Saved to your shortlist.')
  }

  const submitApplication = (formData) => {
    const record = {
      id: `app-${Date.now()}`,
      scholarshipId: selectedScholarship.id,
      scholarshipName: selectedScholarship.name,
      submittedAt: new Date().toISOString(),
      status: 'Draft submitted (demo)',
      applicantName: formData.fullName,
      email: formData.email,
      course: formData.course,
      documents: formData.documents
    }
    setApplications(current => [record, ...current])
    setSelectedScholarship(null)
    setActive('Applications')
    notify('Your demo application has been saved on this device.')
  }

  const updateProfile = (nextProfile) => {
    setProfile(nextProfile)
    setProfileModalOpen(false)
    notify('Your profile has been saved on this device.')
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`} aria-label="Main navigation">
        <div className="brand"><div className="brand-mark"><GraduationCap size={22} /></div><span>grant<span className="brand-accent">ly</span><i>.</i></span></div>
        <div className="workspace-label">STUDENT WORKSPACE</div>
        <nav className="nav-list">
          {navItems.map(item => {
            const Icon = item.icon
            return <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => navigate(item.label)}>
              <Icon size={18} /><span>{item.label}</span>
              {item.label === 'Applications' && applications.length > 0 && <span className="nav-count">{applications.length}</span>}
            </button>
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><ClipboardList size={17} /></div><strong>Ready to apply?</strong><p>Check the official eligibility rules and document list before submitting any application.</p><button onClick={() => navigate('Find scholarships')}>Explore opportunities <ArrowUpRight size={14} /></button></div>
          <button className="nav-item muted" onClick={() => setProfileModalOpen(true)}><Settings size={18} />Profile settings</button>
          <div className="profile-mini"><div className="avatar">{initials(profile.fullName)}</div><div><strong>{profile.fullName || 'Student'}</strong><small>Student account · This device</small></div><button className="mini-edit" onClick={() => setProfileModalOpen(true)} aria-label="Edit profile"><ChevronDown size={16} /></button></div>
        </div>
      </aside>
      {mobileNavOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
          <div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div>
          <div className="top-actions"><button className="icon-button notification" aria-label="Notifications" onClick={() => notify('You are all caught up.') }><Bell size={19} /></button><div className="top-divider" /><button className="top-user" onClick={() => setProfileModalOpen(true)}><div className="avatar small">{initials(profile.fullName)}</div><span>{profile.fullName || 'Student'}</span><ChevronDown size={15} /></button></div>
        </header>

        <div className="content">
          {toast && <div className="toast" role="status"><CheckCircle2 size={17} />{toast}<button onClick={() => setToast('')} aria-label="Dismiss"><X size={15} /></button></div>}

          {active === 'My profile' ? (
            <ProfilePage profile={profile} onEdit={() => setProfileModalOpen(true)} savedCount={saved.length} applicationCount={applications.length} />
          ) : active === 'Applications' ? (
            <ApplicationsPage applications={applications} onBrowse={() => navigate('Find scholarships')} onDelete={(id) => setApplications(current => current.filter(app => app.id !== id))} />
          ) : (
            <>
              <section className="welcome-row">
                <div><div className="eyebrow"><Sparkles size={14} /> YOUR NEXT CHAPTER STARTS HERE</div><h1>{active === 'My shortlist' ? 'Your saved opportunities.' : active === 'Find scholarships' ? 'Find your next opportunity.' : `Good morning, ${firstName(profile.fullName)}`} <span>✦</span></h1><p className="welcome-sub">{active === 'My shortlist' ? 'All the scholarships you have saved, together in one place.' : 'Discover funding that fits your goals, track deadlines, and move forward with confidence.'}</p></div>
                <button className="profile-progress" onClick={() => setProfileModalOpen(true)}><div className="progress-ring"><span>{profileCompletion(profile)}%</span></div><div><b>Profile strength</b><small>{profileCompletion(profile) >= 80 ? 'Looking good!' : 'Add a few details'}</small></div><ArrowUpRight size={16} /></button>
              </section>

              <section className="hero-card"><div className="hero-copy"><div className="hero-kicker"><span className="sparkle-dot">✦</span> YOUR PERSONAL SCHOLARSHIP HUB</div><h2>Make your ambitions<br /><em>affordable.</em></h2><p>Explore verified Indian scholarship programmes, understand the requirements, and keep your next steps organised.</p><button className="hero-button" onClick={() => navigate('Find scholarships')}>Explore scholarships <ArrowRight size={17} /></button></div><HeroArt /></section>

              <section className="stats-grid">
                <Stat icon={<Search size={19} />} label="Scholarship programmes" value={String(scholarships.length)} note="Curated Indian schemes" tone="purple" />
                <Stat icon={<Bookmark size={19} />} label="Saved scholarships" value={String(saved.length)} note="Your personal shortlist" tone="green" />
                <Stat icon={<FileText size={19} />} label="Applications tracked" value={String(applications.length)} note="Saved on this device" tone="orange" />
                <Stat icon={<Wallet size={19} />} label="Profile completion" value={`${profileCompletion(profile)}%`} note="Improve your matches" tone="blue" />
              </section>

              <div className="section-layout" id="scholarship-section">
                <section className="scholarship-panel">
                  <div className="section-heading"><div><div className="eyebrow muted-eyebrow">OFFICIAL PROGRAMMES · AY 2026–27</div><h2>{active === 'My shortlist' ? 'Your shortlist' : 'Scholarships for you'} <span className="result-count">{filteredScholarships.length}</span></h2><p>Search, filter and review eligibility before visiting the official source.</p></div><button className="text-link" onClick={() => navigate('Find scholarships')}>Browse all <ArrowRight size={15} /></button></div>
                  <div className="search-toolbar"><label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, provider, category..." aria-label="Search scholarships" /></label><label className="filter-wrap"><SlidersHorizontal size={15} /><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">{categories.map(value => <option key={value}>{value}</option>)}</select><ChevronDown size={14} /></label><label className="filter-wrap level-filter"><GraduationCap size={15} /><select value={level} onChange={e => setLevel(e.target.value)} aria-label="Filter by study level">{levels.map(value => <option key={value}>{value}</option>)}</select><ChevronDown size={14} /></label></div>
                  <div className="scholarship-list">{filteredScholarships.map(item => <ScholarshipCard key={item.id} item={item} saved={saved.includes(item.id)} onSave={() => toggleSaved(item.id)} onOpen={() => setSelectedScholarship(item)} />)}{filteredScholarships.length === 0 && <div className="empty-state"><Search size={25} /><b>No scholarships found</b><span>Try another keyword or reset your filters.</span><button onClick={() => { setQuery(''); setCategory('All categories'); setLevel('All study levels') }}>Reset filters</button></div>}</div>
                  <p className="data-disclaimer"><CircleAlert size={14} /> Scholarship information is a guide, not an eligibility decision. Dates and rules can change; always verify with the official provider.</p>
                </section>
                <aside className="right-column">
                  <section className="deadline-card"><div className="side-heading"><div><div className="eyebrow muted-eyebrow">APPLICATION CHECK</div><h3>Dates to review</h3><h3>Dates to review</h3>
<div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
  <input 
    type="date" 
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer'
    }}
    onClick={(e) => e.target.showPicker && e.target.showPicker()}
    onChange={(e) => console.log("Selected Date:", e.target.value)}
  />
  <CalendarDays size={19} />
</div></div><CalendarDays size={19} /></div><DeadlineItem date="15 NOV" title="PM YASASVI · School" note="Fresh application listing" tone="violet" /><DeadlineItem date="30 NOV" title="PM YASASVI · College" note="NSP listing · verify category" tone="peach" /><DeadlineItem date="30 NOV" title="PM-USP CSSS" note="Renewal window listed" tone="blue" /><button className="side-link" onClick={() => navigate('Find scholarships')}>Review all programmes <ArrowUpRight size={14} /></button></section>
                  <section className="activity-card"><div className="side-heading"><div><div className="eyebrow muted-eyebrow">YOUR WORKSPACE</div><h3>Quick activity</h3></div><ClipboardList size={19} /></div><div className="quick-stats"><div><b>{saved.length}</b><span>Saved</span></div><div><b>{applications.length}</b><span>Tracked</span></div></div><button className="side-link" onClick={() => navigate('Applications')}>Open application tracker <ArrowUpRight size={14} /></button></section>
                  <div className="tip-card"><div className="tip-icon"><GraduationCap size={18} /></div><div><b>Protect your documents</b><p>Never share Aadhaar numbers or original certificates with an unverified website. GRANTLY demo stores only selected file names.</p><button onClick={() => setProfileModalOpen(true)}>Complete my profile <ArrowRight size={13} /></button></div></div>
                </aside>
              </div>
            </>
          )}
          <footer><span>© 2026 GRANTLY · HACKATHON DEMO</span><span>Built for the dreams you're working towards <i>✦</i></span><a href="https://scholarships.gov.in/" target="_blank" rel="noreferrer">Official NSP <ExternalLink size={12} /></a></footer>
        </div>
      </main>

      {selectedScholarship && <ApplyModal scholarship={selectedScholarship} profile={profile} onClose={() => setSelectedScholarship(null)} onSubmit={submitApplication} />}
      {profileModalOpen && <ProfileModal profile={profile} onClose={() => setProfileModalOpen(false)} onSave={updateProfile} />}
    </div>
  )
}

function initials(name = '') { return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() || '').join('') || 'ST' }
function firstName(name = '') { return name.trim().split(/\s+/)[0] || 'there' }
function profileCompletion(profile) { const fields = ['fullName', 'email', 'state', 'educationLevel', 'course', 'category', 'annualIncome']; return Math.round(fields.filter(key => String(profile[key] || '').trim()).length / fields.length * 100) }

function Stat({ icon, label, value, note, tone }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div> }
function DeadlineItem({ date, title, note, tone }) { return <div className="deadline-feature"><div className={`date-tile ${tone}`}><b>{date.split(' ')[0]}</b><span>{date.split(' ')[1]}</span></div><div><strong>{title}</strong><small><Clock3 size={12} /> {note}</small></div></div> }

function HeroArt() { return <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-sun" /><div className="art-card card-back"><span>YOUR FUTURE</span><b>Unlimited<br />possibilities.</b><div className="mini-bars"><i /><i /><i /><i /></div></div><div className="art-card card-front"><div className="art-cap"><GraduationCap size={27} /></div><span>SCHOLARSHIP MATCH</span><strong>98%</strong><small>You're on the right path</small><div className="art-line" /></div><div className="floating-star star-a">✦</div><div className="floating-star star-b">✧</div></div> }

function ScholarshipCard({ item, saved, onSave, onOpen }) {
  const isClosed = item.status.toLowerCase().includes('closed')
  return <article className="scholarship-card"><div className={`scholarship-logo ${item.color}`}><GraduationCap size={21} /></div><div className="scholarship-info"><div className="scholarship-title-row"><h3>{item.name}</h3><span className={`status-pill ${isClosed ? 'closed' : ''}`}>{item.status}</span></div><p>{item.provider}</p><div className="tag-row"><span>{item.category}</span><span>{item.level}</span></div><div className="card-deadline"><Clock3 size={11} /> {item.deadline}</div></div><div className="award-block"><small>AWARD / SUPPORT</small><strong>{item.amount}</strong><button onClick={onOpen}>View details <ArrowUpRight size={13} /></button></div><button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={onSave} aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'} title={saved ? 'Remove from shortlist' : 'Save to shortlist'}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></article>
}

function ProfilePage({ profile, onEdit, savedCount, applicationCount }) {
  return <section className="page-panel"><div className="eyebrow muted-eyebrow">STUDENT DETAILS</div><h1>Your profile</h1><p className="page-intro">Keep your information up to date to make your scholarship search more relevant.</p><div className="profile-summary"><div className="avatar profile-avatar">{initials(profile.fullName)}</div><div><h2>{profile.fullName || 'Add your name'}</h2><p>{profile.email || 'Add an email address'} · {profile.state || 'Add your state'}</p></div><button className="primary-button" onClick={onEdit}>Edit profile</button></div><div className="profile-details-grid">{[['Email', profile.email], ['Phone', profile.phone], ['State', profile.state], ['Education level', profile.educationLevel], ['Course / stream', profile.course], ['Category', profile.category], ['Annual family income', profile.annualIncome]].map(([label, value]) => <div className="detail-cell" key={label}><small>{label}</small><b>{value || 'Not provided'}</b></div>)}</div><div className="profile-metrics"><div><b>{savedCount}</b><span>Saved scholarships</span></div><div><b>{applicationCount}</b><span>Applications tracked</span></div></div><p className="local-note"><CircleAlert size={15} /> Profile details are stored in this browser only. This prototype does not send them to a server.</p></section>
}

function ApplicationsPage({ applications, onBrowse, onDelete }) {
  return <section className="page-panel"><div className="eyebrow muted-eyebrow">YOUR APPLICATION WORKSPACE</div><h1>Application tracker</h1><p className="page-intro">Applications created in this demo are saved locally on this device.</p>{applications.length === 0 ? <div className="empty-apps"><FileText size={32} /><h2>No applications yet</h2><p>Open a scholarship and select Apply now to create a demo application record.</p><button className="primary-button" onClick={onBrowse}>Find scholarships <ArrowRight size={15} /></button></div> : <div className="application-list">{applications.map(app => <article className="application-row" key={app.id}><div className="application-icon"><FileText size={19} /></div><div className="application-main"><h3>{app.scholarshipName}</h3><p>{app.applicantName} · {app.email}</p><small>Created {new Date(app.submittedAt).toLocaleString()}</small></div><span className="application-status">{app.status}</span><button className="delete-button" onClick={() => onDelete(app.id)} aria-label={`Delete ${app.scholarshipName} record`}><Trash2 size={16} /></button></article>)}</div>}<p className="local-note"><CircleAlert size={15} /> These are local demo records, not submissions to scholarship authorities.</p></section>
}

function ProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState(profile)
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const submit = (event) => { event.preventDefault(); onSave(form) }
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="detail-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button><div className="eyebrow muted-eyebrow">YOUR INFORMATION</div><h2 id="profile-title">Student profile</h2><p className="modal-provider">Only saved in this browser for this demo.</p><form onSubmit={submit} className="form-grid"><Field label="Full name" value={form.fullName} onChange={v => set('fullName', v)} required /><Field label="Email address" type="email" value={form.email} onChange={v => set('email', v)} required /><Field label="Phone (optional)" value={form.phone} onChange={v => set('phone', v)} /><Field label="State / UT" value={form.state} onChange={v => set('state', v)} /><label className="form-field"><span>Education level</span><select value={form.educationLevel} onChange={e => set('educationLevel', e.target.value)}><option>School</option><option>Undergraduate</option><option>Postgraduate</option><option>Diploma</option><option>Other</option></select></label><Field label="Course / stream" value={form.course} onChange={v => set('course', v)} /><label className="form-field"><span>Category</span><select value={form.category} onChange={e => set('category', e.target.value)}><option>General</option><option>OBC</option><option>EBC</option><option>DNT</option><option>SC</option><option>ST</option><option>Other</option></select></label><Field label="Annual family income (₹)" value={form.annualIncome} onChange={v => set('annualIncome', v)} placeholder="e.g. 250000" /><div className="form-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Save profile</button></div></form></section></div>
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }) { return <label className="form-field"><span>{label}</span><input type={type} value={value || ''} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder} /></label> }

function ApplyModal({ scholarship, profile, onClose, onSubmit }) {
  const [form, setForm] = useState({ fullName: profile.fullName || '', email: profile.email || '', course: profile.course || '', documents: {} })
  const [error, setError] = useState('')
  const requiredDocs = ['Income certificate', 'Previous marksheet', 'Admission / bonafide proof']
  const setField = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const setDoc = (key, file) => setForm(current => ({ ...current, documents: { ...current.documents, [key]: file ? file.name : '' } }))
  const submit = event => {
    event.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.course.trim()) { setError('Please complete your name, email and course.'); return }
    onSubmit(form)
  }
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="detail-modal apply-modal" role="dialog" aria-modal="true" aria-labelledby="apply-title" onMouseDown={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button><div className={`modal-icon ${scholarship.color}`}><GraduationCap size={24} /></div><div className="eyebrow muted-eyebrow">DEMO APPLICATION</div><h2 id="apply-title">Apply for {scholarship.name}</h2><p className="modal-provider">{scholarship.provider}</p><div className="modal-amount"><span>Published award / support</span><strong>{scholarship.amount}</strong></div><div className="eligibility"><b>Eligibility to review</b><ul>{scholarship.eligibility.map(item => <li key={item}>{item}</li>)}</ul></div><form onSubmit={submit}><div className="form-grid"><Field label="Student full name" value={form.fullName} onChange={v => setField('fullName', v)} required /><Field label="Email address" type="email" value={form.email} onChange={v => setField('email', v)} required /><Field label="Course / class" value={form.course} onChange={v => setField('course', v)} required /></div><div className="upload-heading"><b>Document checklist</b><span>Choose sample files to simulate uploads</span></div><div className="upload-grid">{requiredDocs.map(doc => <label className="upload-box" key={doc}><UploadCloud size={17} /><span>{doc}</span><small>{form.documents[doc] || 'Choose PDF / image'}</small><input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setDoc(doc, e.target.files?.[0])} /></label>)}</div><p className="security-note"><CircleAlert size={14} /> Demo only: files are not uploaded or stored. Only their filenames are saved in local application records. Never select real Aadhaar or sensitive documents in this prototype.</p>{error && <p className="form-error" role="alert">{error}</p>}<div className="form-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Save demo application <ArrowRight size={15} /></button></div></form><a className="official-link" href={scholarship.sourceUrl} target="_blank" rel="noreferrer">Verify details on official provider site <ExternalLink size={13} /></a><small className="demo-note">This does not submit an application to the scholarship authority.</small></section></div>
}
