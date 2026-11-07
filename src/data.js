// Scholarship records are curated from official government/provider pages.
// Dates and eligibility can change by state and academic year; verify on sourceUrl before applying.
export const scholarships = [
  {
    id: 'pm-yasasvi-school',
    name: 'PM YASASVI — Top Class School Education',
    provider: 'Ministry of Social Justice & Empowerment · NSP',
    amount: 'Up to ₹1,25,000 / year',
    amountNote: 'Class 9–10: up to ₹75,000/year; Class 11–12: up to ₹1,25,000/year',
    category: 'Need-based', level: 'School',
    eligibility: [
      'Belong to OBC, EBC or DNT category.',
      'Annual family income below ₹2.50 lakh.',
      'Studying in Classes 9–12 at a school listed as a Top Class School under the scheme.',
      'Selection and available slots are subject to NSP and scheme rules.'
    ],
    deadline: '15 Nov 2026', status: 'Open · Fresh applications',
    deadlineNote: 'NSP lists fresh applications through 15 Nov 2026. Current announcement excludes Rajasthan, Kerala and Karnataka for now; check the portal for state-specific updates.',
    documents: ['Recent passport-size photograph', 'Previous class marksheet', 'OBC/EBC/DNT category certificate', 'Income certificate', 'School admission / bonafide certificate', 'Bank account details', 'Aadhaar / OTR details as requested by NSP'],
    sourceUrl: 'https://scholarships.gov.in/All-Scholarships', sourceLabel: 'National Scholarship Portal',
    tags: ['OBC', 'EBC', 'DNT', 'School'], color: 'violet', match: 92
  },
  {
    id: 'pm-yasasvi-college',
    name: 'PM YASASVI — Top Class College Education',
    provider: 'Ministry of Social Justice & Empowerment · NSP',
    amount: 'Tuition + living support',
    amountNote: 'Private institution tuition ceiling ₹2 lakh/year; living ₹3,000/month; books ₹5,000/year; laptop assistance up to ₹45,000 once, subject to scheme rules.',
    category: 'Need-based', level: 'Undergraduate / Professional',
    eligibility: [
      'Belong to OBC, EBC or DNT category.',
      'Annual family income up to ₹2.50 lakh.',
      'Admitted to an eligible full-time course at an institution notified under the scheme.',
      'Award is subject to institution-wise slots and merit/selection rules.'
    ],
    deadline: '30 Nov 2026', status: 'Listed on NSP · Verify fresh/renewal',
    deadlineNote: 'NSP lists student applications through 30 Nov 2026 for AY 2026–27. Confirm the application type and institution slot on NSP before applying.',
    documents: ['Photograph', 'Category certificate', 'Income certificate', 'Class 12 marksheet', 'Admission / bonafide certificate', 'Fee receipt', 'Bank account details', 'Aadhaar / OTR details as requested by NSP'],
    sourceUrl: 'https://scholarships.gov.in/All-Scholarships', sourceLabel: 'National Scholarship Portal',
    tags: ['OBC', 'EBC', 'DNT', 'College'], color: 'mint', match: 88
  },
  {
    id: 'pm-usp-csss',
    name: 'PM-USP Central Sector Scholarship (CSSS)',
    provider: 'Department of Higher Education · NSP',
    amount: '₹12,000–₹20,000 / year',
    amountNote: '₹12,000/year for the first 3 years of graduation; ₹20,000/year for eligible later years and postgraduate study, as per course rules.',
    category: 'Merit-based', level: 'Undergraduate / Postgraduate',
    eligibility: [
      'Score above the 80th percentile in the relevant Class 12 board stream.',
      'Enrolled in a regular recognised college/university course (not distance/correspondence).',
      'Family income up to ₹4.50 lakh per year.',
      'Not receiving another scholarship or fee reimbursement; diploma students and students who took a gap after Class 12 are not eligible under the published FAQ.'
    ],
    deadline: '30 Nov 2026', status: 'Renewal window listed on NSP',
    deadlineNote: 'NSP currently lists the AY 2026–27 renewal application through 30 Nov 2026. A fresh-application window/date was not confirmed in the current listing; check NSP.',
    documents: ['Class 12 marksheet', 'Current-year admission / bonafide certificate', 'Income certificate', 'Bank account details', 'Aadhaar / OTR details', 'Previous-year marksheet for renewal'],
    sourceUrl: 'https://scholarships.gov.in/All-Scholarships', sourceLabel: 'National Scholarship Portal',
    tags: ['Merit', 'Class 12', 'UG', 'PG'], color: 'blue', match: 90
  },
  {
    id: 'post-matric-st',
    name: 'Post-Matric Scholarship for ST Students',
    provider: 'Ministry of Tribal Affairs · State / UT portals',
    amount: '₹230–₹1,200 / month + eligible fees',
    amountNote: 'Maintenance allowance varies by course; compulsory fees are reimbursed subject to state fee limits and scheme rules.',
    category: 'Category-based', level: 'Post-matric',
    eligibility: [
      'Belong to a recognised Scheduled Tribe (ST) category.',
      'Studying Class 11 or above in a recognised course/institution.',
      'Annual parental/family income must not exceed ₹2.50 lakh.',
      'Application, verification and disbursement are managed through the relevant State/UT.'
    ],
    deadline: 'State-specific', status: 'Check your State / UT portal',
    deadlineNote: 'There is no single all-India deadline shown by the Ministry; dates and portals vary by State/UT and academic year.',
    documents: ['ST certificate', 'Income certificate', 'Previous examination marksheet', 'Current admission / bonafide certificate', 'Fee receipt', 'Bank passbook details', 'Aadhaar / identity details as requested by the State portal'],
    sourceUrl: 'https://tribal.nic.in/Scholarship.aspx', sourceLabel: 'Ministry of Tribal Affairs',
    tags: ['ST', 'Post-matric', 'State portal'], color: 'peach', match: 84
  },
  {
    id: 'reliance-ug',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    amount: 'Up to ₹2,00,000 total',
    amountNote: 'Support over the duration of the undergraduate degree; up to 5,000 scholars annually.',
    category: 'Merit + means', level: 'Undergraduate · First year',
    eligibility: [
      'Indian resident citizen enrolled in the first year of a regular full-time undergraduate degree in AY 2026–27.',
      'At least 60% in Class 12.',
      'Household income below ₹15 lakh.',
      'Mandatory online aptitude test; online, distance, hybrid and remote courses are excluded.'
    ],
    deadline: 'Closed for 2026–27', status: 'Applications closed',
    deadlineNote: 'The official programme page states that 2026–27 applications are closed. Watch the provider page for the next cycle; do not rely on old dates.',
    documents: ['Class 10 and 12 marksheets', 'Current college admission proof', 'Income proof', 'Government photo ID', 'Academic and achievement details', 'Other supporting documents requested in the live application'],
    sourceUrl: 'https://scholarships.reliancefoundation.org/UG_Scholarship.aspx', sourceLabel: 'Reliance Foundation',
    tags: ['Merit', 'Means', 'First year'], color: 'violet', match: 86
  },
  {
    id: 'post-matric-obc',
    name: 'Post-Matric Scholarship for OBC / EBC / DNT Students',
    provider: 'Ministry of Social Justice & Empowerment · State / UT portals',
    amount: 'Academic allowance ₹5,000–₹20,000',
    amountNote: 'Allowance varies by course category; eligible compulsory fees are handled under the applicable scheme rules.',
    category: 'Category-based', level: 'Post-matric',
    eligibility: [
      'Belong to OBC, EBC or DNT category as defined by the applicable scheme.',
      'Enrolled in a recognised post-matric course.',
      'Family income ceiling is generally ₹2.50 lakh per year under the central scheme; verify the current state implementation rules.',
      'Application is handled through the relevant State/UT portal or NSP listing.'
    ],
    deadline: 'State-specific', status: 'Check State / UT notification',
    deadlineNote: 'The application window is set by State/UT implementation and may differ by academic year. Confirm the live notification before relying on a date.',
    documents: ['OBC/EBC/DNT certificate', 'Income certificate', 'Previous examination marksheet', 'Current admission / bonafide certificate', 'Fee receipt', 'Bank account details', 'Aadhaar / OTR details as requested'],
    sourceUrl: 'https://socialjustice.gov.in/schemes/101', sourceLabel: 'Ministry of Social Justice & Empowerment',
    tags: ['OBC', 'EBC', 'DNT', 'Post-matric'], color: 'mint', match: 81
  }
]

export const defaultProfile = {
  fullName: 'Alex Taylor',
  email: '',
  phone: '',
  state: 'Uttar Pradesh',
  educationLevel: 'Undergraduate',
  course: '',
  category: 'General',
  annualIncome: ''
}

export const documentChecklistNote = 'This is a preparation checklist, not a guarantee that every document is required. The official application form and your State/UT or institution may request different documents.'
