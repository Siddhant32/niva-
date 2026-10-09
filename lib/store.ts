import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HealthRecord, PatientProfile, Appointment, WellnessData, ChatMessage } from './types';

const defaultPatient: PatientProfile = {
  id: 'p-001',
  name: 'Aarav Sharma',
  abhaId: '91-1234-5678-9012',
  email: 'aarav.sharma@health.in',
  phone: '+91 98765 43210',
  age: 42,
  gender: 'Male',
  bloodGroup: 'O+',
  height: '175 cm',
  weight: '74 kg',
  allergies: ['Penicillin', 'Dust & Pollen'],
  chronicConditions: ['Mild Hypertension', 'Borderline Hyperlipidemia'],
  preferredLanguage: 'en',
};

const initialRecords: HealthRecord[] = [
  {
    id: 'rec-001',
    type: 'lab_report',
    date: '2026-10-01T08:30:00Z',
    title: 'Lipid Profile & Metabolic Screen',
    provider: 'Apollo Diagnostics Laboratory',
    fileName: 'apollo_lipid_oct2026.pdf',
    observations: [
      { testName: 'Total Cholesterol', value: 238, unit: 'mg/dL', referenceRange: '< 200', status: 'high', interpretation: 'Elevated total cholesterol indicates potential plaque buildup risk.' },
      { testName: 'LDL (Bad) Cholesterol', value: 158, unit: 'mg/dL', referenceRange: '< 100', status: 'high', interpretation: 'Significantly above optimal target; cardiovascular focus recommended.' },
      { testName: 'HDL (Good) Cholesterol', value: 44, unit: 'mg/dL', referenceRange: '> 40', status: 'normal', interpretation: 'Within healthy protective range.' },
      { testName: 'Triglycerides', value: 178, unit: 'mg/dL', referenceRange: '< 150', status: 'high', interpretation: 'Mildly elevated fat in blood; reduce refined carbohydrates.' },
      { testName: 'Fasting Blood Glucose', value: 94, unit: 'mg/dL', referenceRange: '70-99', status: 'normal', interpretation: 'Normal glucose homeostasis.' }
    ],
    diagnoses: ['Hypercholesterolemia (E78.0)', 'Borderline Hypertriglyceridemia'],
    recommendations: [
      'Adopt a Mediterranean-style diet low in saturated fats and refined sugars.',
      'Engage in 30 minutes of moderate aerobic activity 5 days a week.',
      'Follow up with Dr. Gupta for lipid-lowering therapy evaluation (Statin).'
    ],
    rawOcrText: `APOLLO DIAGNOSTICS - REPORT #AP-90412\nPATIENT: Aarav Sharma | AGE: 42 | GENDER: M\nTEST: Lipid Panel (Serum)\nTotal Cholesterol: 238 mg/dL [Ref: <200]\nLDL Direct: 158 mg/dL [Ref: <100]\nHDL: 44 mg/dL [Ref: >40]\nTriglycerides: 178 mg/dL [Ref: <150]\nFasting Blood Sugar: 94 mg/dL [Ref: 70-99]`,
    summary: {
      en: 'Your lipid test reveals elevated Total Cholesterol (238 mg/dL) and LDL "bad" cholesterol (158 mg/dL), along with mildly elevated triglycerides (178 mg/dL). Good cholesterol (HDL) and blood sugar are at healthy levels. We recommend reducing fried foods, increasing omega-3 intake, and discussing statin therapy with your cardiologist.',
      hi: 'आपकी लिपिड जांच में कुल कोलेस्ट्रॉल (238 mg/dL) और एलडीएल "खराब" कोलेस्ट्रॉल (158 mg/dL) बढ़ा हुआ पाया गया है। हालांकि अच्छा कोलेस्ट्रॉल (HDL) और ब्लड शुगर सामान्य हैं। तली-भुनी चीजों से परहेज करें और डॉक्टर से सलाह लें।',
      te: 'మీ లిపిడ్ పరీక్షలో మొత్తం కొలెస్ట్రాల్ (238 mg/dL) మరియు ఎల్‌డిఎల్ చెడు కొలెస్ట్రాల్ (158 mg/dL) ఎక్కువగా ఉన్నట్లు తెలిసింది. మంచి కొలెస్ట్రాల్ మరియు బ్లడ్ షుగర్ సాధారణంగా ఉన్నాయి. వైద్యుడిని సంప్రదించండి.',
      ta: 'உங்கள் கொழுப்பு பரிசோதனையில் மொத்த கொழுப்பு (238 mg/dL) மற்றும் எல்.டி.எல் கெட்ட கொழுப்பு (158 mg/dL) அதிகமாக உள்ளது. நல்ல கொழுப்பு மற்றும் சர்க்கரை அளவு இயல்பாக உள்ளன.'
    },
    fhirJson: JSON.stringify({
      resourceType: "DiagnosticReport",
      id: "rec-001",
      status: "final",
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0074", code: "LAB" }] }],
      code: { text: "Lipid Profile Panel" },
      subject: { reference: "Patient/91-1234-5678-9012", display: "Aarav Sharma" }
    }, null, 2)
  },
  {
    id: 'rec-002',
    type: 'prescription',
    date: '2026-10-05T11:00:00Z',
    title: 'Cardiology Rx & Follow-up Plan',
    provider: 'Dr. R. K. Gupta, MD (Cardiology)',
    fileName: 'dr_gupta_prescription_oct26.jpg',
    medicines: [
      { name: 'Atorvastatin (Lipitor)', dosage: '10 mg', frequency: 'Once daily (Night)', duration: '30 Days', instructions: 'Take after dinner with water. Helps lower LDL cholesterol.' },
      { name: 'Telmisartan (Telma)', dosage: '40 mg', frequency: 'Once daily (Morning)', duration: '30 Days', instructions: 'Take in morning with or without food. Controls blood pressure.' },
      { name: 'CoQ10 (Ubiquinol)', dosage: '100 mg', frequency: 'Once daily (Afternoon)', duration: '30 Days', instructions: 'Supports cellular energy and reduces statin muscle soreness.' }
    ],
    diagnoses: ['Essential Hypertension (Stage 1)', 'Dyslipidemia'],
    recommendations: [
      'Limit dietary sodium to under 2,000 mg daily.',
      'Maintain home BP log twice weekly.',
      'Repeat lipid profile in 90 days.'
    ],
    summary: {
      en: 'Dr. Gupta prescribed Atorvastatin (10mg) at night to lower LDL cholesterol, and Telmisartan (40mg) in the morning for blood pressure control. Both are 30-day courses. Continue low sodium diet and log your blood pressure.',
      hi: 'डॉ. गुप्ता ने कोलेस्ट्रॉल कम करने के लिए रात में एटोरवास्टेटिन (10mg) और ब्लड प्रेशर नियंत्रण के लिए सुबह टेल्मिसर्टन (40mg) लेने की सलाह दी है।',
      te: 'కొలెస్ట్రాల్ తగ్గించడానికి రాత్రి పూట అటోర్వాస్టాటిన్ (10mg) మరియు రక్తపోటు కోసం ఉదయం టెల్మిసార్టన్ (40mg) సూచించారు.',
      ta: 'கொழுப்பைக் குறைக்க இரவில் அடோர்வாஸ்டாடின் (10mg) மற்றும் ரத்த அழுத்தத்தைக் கட்டுப்படுத்த காலையில் டெல்மிசார்டன் (40mg) பரிந்துரைக்கப்பட்டுள்ளது.'
    }
  },
  {
    id: 'rec-003',
    type: 'lab_report',
    date: '2026-09-15T09:15:00Z',
    title: 'Complete Blood Count (CBC) & Hemogram',
    provider: 'Max Super Speciality PathLab',
    fileName: 'max_cbc_report_sep26.pdf',
    observations: [
      { testName: 'Hemoglobin', value: 14.8, unit: 'g/dL', referenceRange: '13.5-17.5', status: 'normal', interpretation: 'Optimal oxygen-carrying capacity.' },
      { testName: 'Total WBC Count', value: 6800, unit: 'cells/mcL', referenceRange: '4500-11000', status: 'normal', interpretation: 'Immune response normal, no active infection detected.' },
      { testName: 'Platelet Count', value: 245000, unit: 'cells/mcL', referenceRange: '150000-450000', status: 'normal', interpretation: 'Healthy blood clotting status.' },
      { testName: 'ESR (1st Hour)', value: 12, unit: 'mm/hr', referenceRange: '0-15', status: 'normal', interpretation: 'No acute systemic inflammation.' }
    ],
    diagnoses: ['Normal Hematological Profile'],
    summary: {
      en: 'All hematological markers including Hemoglobin (14.8 g/dL), White Blood Cells (6,800/mcL), and Platelets (245,000/mcL) are in excellent condition with no signs of infection or anemia.',
      hi: 'हीमोग्लोबिन, श्वेत रक्त कोशिकाएं और प्लेटलेट्स सहित सभी रक्त पैरामीटर पूरी तरह से सामान्य और स्वस्थ हैं।',
      te: 'హీమోగ్లోబిన్, తెల్ల రక్త కణాలు మరియు ప్లేట్‌లెట్‌లతో సహా అన్ని రక్త పరీక్షలు సాధారణంగా ఉన్నాయి.',
      ta: 'ஹீமோகுளோபின், வெள்ளை ரத்த அணுக்கள் மற்றும் பிளேட்லெட்டுகள் அனைத்தும் சிறந்த நிலையில் உள்ளன.'
    }
  }
];

const initialAppointments: Appointment[] = [
  {
    id: 'app-001',
    doctorName: 'Dr. R. K. Gupta',
    specialty: 'Cardiologist (MD, DM)',
    date: '2026-10-18',
    time: '10:30 AM',
    status: 'upcoming',
    location: 'Fortis Memorial Research Institute, Gurugram',
    type: 'In-person'
  },
  {
    id: 'app-002',
    doctorName: 'Dr. Priya Nambiar',
    specialty: 'Endocrinologist & Diabetologist',
    date: '2026-10-28',
    time: '04:00 PM',
    status: 'upcoming',
    location: 'Apollo TeleHealth Video Consult',
    type: 'Video Call'
  },
  {
    id: 'app-003',
    doctorName: 'Dr. S. K. Mehta',
    specialty: 'General Physician',
    date: '2026-09-20',
    time: '02:15 PM',
    status: 'completed',
    location: 'Max Healthcare, Saket',
    type: 'In-person'
  }
];

const initialWellness: WellnessData = {
  heartRate: 72,
  restingHeartRate: 64,
  steps: 8420,
  stepGoal: 10000,
  sleepHours: 7.2,
  sleepScore: 84,
  caloriesBurned: 2150,
  waterIntakeMl: 2400,
  oxygenSaturation: 99,
  bloodPressureSys: 122,
  bloodPressureDia: 78,
  date: new Date().toISOString()
};

const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Hello Aarav! I am **Niva**, your AI Health Copilot. I have reviewed your latest medical records from Apollo Diagnostics and Dr. Gupta.\n\nHow can I assist you today? You can ask about your **elevated LDL cholesterol**, your **medication routine**, or attach a new report for real-time analysis.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedFollowUps: [
      'What foods should I avoid for my LDL 158?',
      'When should I take Atorvastatin 10mg?',
      'Explain my blood pressure readings',
      'Translate my health summary to Hindi'
    ]
  }
];

interface CopilotStore {
  isAuthenticated: boolean;
  patient: PatientProfile;
  records: HealthRecord[];
  appointments: Appointment[];
  wellness: WellnessData;
  chatMessages: ChatMessage[];
  
  // Actions
  login: () => void;
  logout: () => void;
  setLanguage: (lang: PatientProfile['preferredLanguage']) => void;
  updateProfile: (updated: Partial<PatientProfile>) => void;
  addRecord: (record: HealthRecord) => void;
  removeRecord: (id: string) => void;
  bookAppointment: (app: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
}

export const useCopilotStore = create<CopilotStore>()(
  persist(
    (set) => ({
      isAuthenticated: true, // Default enabled for seamless exploration, auth pages can toggle
      patient: defaultPatient,
      records: initialRecords,
      appointments: initialAppointments,
      wellness: initialWellness,
      chatMessages: initialChatMessages,

      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      setLanguage: (lang) => set((state) => ({ patient: { ...state.patient, preferredLanguage: lang } })),
      updateProfile: (updated) => set((state) => ({ patient: { ...state.patient, ...updated } })),
      addRecord: (record) => set((state) => ({ records: [record, ...state.records] })),
      removeRecord: (id) => set((state) => ({ records: state.records.filter((r) => r.id !== id) })),
      bookAppointment: (app) =>
        set((state) => ({
          appointments: [
            { ...app, id: `app-${Date.now()}` },
            ...state.appointments,
          ],
        })),
      cancelAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status: 'cancelled' as const } : a
          ),
        })),
      addChatMessage: (msg) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              ...msg,
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        })),
      clearChat: () =>
        set({
          chatMessages: [
            {
              id: `msg-${Date.now()}`,
              sender: 'assistant',
              text: 'Chat history cleared. How can I help you today with your medical records or wellness goals?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              suggestedFollowUps: ['Explain my latest lab tests', 'What is my ABHA ID status?', 'Tips to reduce blood pressure']
            }
          ]
        })
    }),
    {
      name: 'niva-copilot-store-v2',
    }
  )
);
