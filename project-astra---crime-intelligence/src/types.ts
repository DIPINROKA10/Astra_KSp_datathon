export interface Incident {
  id: string;
  fir_id: string;
  district: string;
  police_station: string;
  fir_date: string;
  incident_date: string;
  crime_type: string;
  crime_subtype: string;
  bns_sections: string[];
  ipc_sections: string[];
  lat: number;
  lon: number;
  fir_narrative: string;
  severity_score: number;
  anomaly_score: number;
  is_anomaly: boolean;
  sha256: string;
}

export interface Alert {
  id: string;
  district: string;
  crime_type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  z_score: number;
  current_count: number;
  baseline_mean: number;
  detected_at: string;
  is_active: boolean;
}

export interface POLENode {
  id: string;
  label: string;
  type: 'PERSON' | 'LOCATION' | 'OBJECT' | 'EVENT';
  properties: {
    name?: string;
    aliases?: string[];
    role?: string;
    is_accused?: boolean;
    offender_score?: number;
    district?: string;
    address?: string;
    lat?: number;
    lon?: number;
    h3_index?: string;
    reg_number?: string;
    make?: string;
    model?: string;
    color?: string;
    fir_id?: string;
    date?: string;
    crime_type?: string;
    bns_sections?: string[];
    owner_id?: string;
  };
  degree: number;
}

export interface POLEEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight: number;
  predicted: boolean;
  confidence?: number;
  supporting_firs?: string[];
}

export interface MOSearchResult {
  fir_id: string;
  similarity: number;
  snippet: string;
  district: string;
  date: string;
  crime_type: string;
  bns_sections: string[];
  narrative: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  reasoningSteps?: {
    agent: string;
    content: string;
  }[];
  entities?: {
    id: string;
    label: string;
    type: 'PERSON' | 'LOCATION' | 'OBJECT' | 'EVENT';
    lat?: number;
    lon?: number;
  }[];
}

export interface PredictionHex {
  id: string;
  h3_index: string;
  district: string;
  risk_score: number;
  confidence: number;
  shap_values: {
    recent_crime_density: number;
    day_of_week: number;
    hour_of_day: number;
    socioeconomic_index: number;
    population_density: number;
  };
  lat: number;
  lon: number;
}

export interface UserProfile {
  name: string;
  email: string;
  picture?: string;
}

