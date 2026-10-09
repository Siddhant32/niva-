export type RecordType = 'prescription' | 'lab_report' | 'discharge_summary' | 'diagnostic';

export interface HealthRecord {
  id: string;
  type: RecordType;
  date: string; // ISO date
  title: string;
  provider: string; // Doctor or Lab name
  fileName?: string;
  
  medicines?: Medicine[];
  observations?: Observation[];
  diagnoses?: string[];
  recommendations?: string[];
  rawOcrText?: string;
  
  summary: {
    en: string;
    hi?: string;
    te?: string;
    ta?: string;
  };
  
  fhirJson?: string;
  rawFileUrl?: string; 
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Observation {
  testName: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'abnormal';
  interpretation?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  abhaId: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string[];
  chronicConditions: string[];
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
  type: 'In-person' | 'Video Call';
}

export interface WellnessData {
  heartRate: number;
  restingHeartRate: number;
  steps: number;
  stepGoal: number;
  sleepHours: number;
  sleepScore: number;
  caloriesBurned: number;
  waterIntakeMl: number;
  oxygenSaturation: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: string;
    size?: string;
  };
  suggestedFollowUps?: string[];
}
