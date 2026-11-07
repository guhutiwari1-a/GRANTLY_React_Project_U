import React from 'react'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className="dates-to-review-container">
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Dates to review</h3>

        <a 
          href="https://buddy4study.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer', marginBottom: '12px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
            <div style={{ textAlign: 'center', minWidth: '50px', backgroundColor: '#f0f4f8', padding: '8px', borderRadius: '6px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0056b3' }}>15</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>NOV</div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#333' }}>TCS InSight Scholarship</div>
              <div style={{ fontSize: '13px', color: '#777' }}>Undergraduate & Graduate programs</div>
            </div>
          </div>
        </a>

        <a 
          href="https://scholarships.gov.in" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
            <div style={{ textAlign: 'center', minWidth: '50px', backgroundColor: '#f0f4f8', padding: '8px', borderRadius: '6px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0056b3' }}>30</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666' }}>NOV</div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#333' }}>General Undergraduate & Graduate Scholarships</div>
              <div style={{ fontSize: '13px', color: '#777' }}>National Scholarship Portal support</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Ap