export type RecordType = 'prescription' | 'lab_report' | 'discharge_summary' | 'diagnostic';

export interface HealthRecord {
  id: string;
  type: RecordType;
  date: string; // ISO date
  title: string;
  provider: string; // Doctor or Lab name
  
  medicines?: Medicine[];
  observations?: Observation[];
  diagnoses?: string[];
  
  summary: {
    en: string;
    hi?: string;
    te?: string;
    ta?: string;
  };
  
  rawFileUrl?: string; 
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Observation {
  testName: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'abnormal';
}

export interface PatientProfile {
  id: string;
  name: string;
  abhaId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string[];
  preferredLanguage: 'en' | 'hi' | 'te' | 'ta';
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

export interface WellnessData {
  heartRate: number;
  steps: number;
  sleepHours: number;
  caloriesBurned: number;
  date: string;
}
