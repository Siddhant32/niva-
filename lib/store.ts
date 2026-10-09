import { create } from 'zustand';
import { HealthRecord, PatientProfile, Appointment, WellnessData } from './types';

// Mock Patient Data
const mockPatient: PatientProfile = {
  id: 'p-001',
  name: 'Aarav Sharma',
  abhaId: '91-1234-5678-9012',
  age: 42,
  gender: 'Male',
  bloodGroup: 'O+',
  height: '175 cm',
  weight: '75 kg',
  allergies: ['Penicillin', 'Dust'],
  preferredLanguage: 'en',
};

// Mock Records
const mockRecords: HealthRecord[] = [
  {
    id: 'rec-001',
    type: 'lab_report',
    date: '2026-10-01T08:30:00Z',
    title: 'Complete Blood Count & Lipid Panel',
    provider: 'Apollo Diagnostics',
    observations: [
      { testName: 'Hemoglobin', value: 14.5, unit: 'g/dL', referenceRange: '13.8-17.2', status: 'normal' },
      { testName: 'Total Cholesterol', value: 240, unit: 'mg/dL', referenceRange: '< 200', status: 'high' },
      { testName: 'LDL Cholesterol', value: 160, unit: 'mg/dL', referenceRange: '< 100', status: 'high' },
    ],
    summary: {
      en: 'Your blood counts are normal. However, your cholesterol is high. Your Total Cholesterol is 240 mg/dL (ideal is below 200).',
      hi: 'आपका कोलेस्ट्रॉल बढ़ा हुआ है। कुल कोलेस्ट्रॉल 240 mg/dL है (आदर्श 200 से कम है)।'
    }
  }
];

// Mock Appointments
const mockAppointments: Appointment[] = [
  {
    id: 'app-001',
    doctorName: 'Dr. R. K. Gupta',
    specialty: 'Cardiology',
    date: '2026-10-15',
    time: '10:00 AM',
    status: 'upcoming',
    location: 'Fortis Hospital, Sector 44'
  },
  {
    id: 'app-002',
    doctorName: 'Dr. S. Mehta',
    specialty: 'General Physician',
    date: '2026-09-20',
    time: '04:30 PM',
    status: 'completed',
    location: 'Max Super Speciality'
  }
];

// Mock Wellness Data
const mockWellness: WellnessData = {
  heartRate: 72,
  steps: 8450,
  sleepHours: 6.5,
  caloriesBurned: 2100,
  date: new Date().toISOString()
};

interface CopilotStore {
  isAuthenticated: boolean;
  patient: PatientProfile;
  records: HealthRecord[];
  appointments: Appointment[];
  wellness: WellnessData;
  setLanguage: (lang: PatientProfile['preferredLanguage']) => void;
  addRecord: (record: HealthRecord) => void;
  login: () => void;
  logout: () => void;
}

export const useCopilotStore = create<CopilotStore>((set) => ({
  isAuthenticated: false, // Default not logged in
  patient: mockPatient,
  records: mockRecords,
  appointments: mockAppointments,
  wellness: mockWellness,
  setLanguage: (lang) => set((state) => ({ patient: { ...state.patient, preferredLanguage: lang } })),
  addRecord: (record) => set((state) => ({ records: [record, ...state.records] })),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false })
}));
