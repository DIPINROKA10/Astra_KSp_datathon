import { Incident, Alert, POLENode, POLEEdge, PredictionHex, MOSearchResult } from './types';

// Normalized 31 districts of Karnataka for selection
export const KARNATAKA_DISTRICTS = [
  "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
  "Bidar", "Chamarajanagara", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
  "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri",
  "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur",
  "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada",
  "Vijayapura", "Vijayanagara", "Yadgir"
];

// Crime categories
export const CRIME_CATEGORIES = [
  "Theft", "Chain Snatching", "Robbery", "Cybercrime", "Drug Offence", "Assault", "Murder", "Cheating"
];

// Rich, high-fidelity mock FIR incidents matching Karnataka
export const mockIncidents: Incident[] = [
  {
    id: "fir-1",
    fir_id: "FIR-2024-BNG-0082",
    district: "Bengaluru Urban",
    police_station: "Shivajinagar Police Station",
    fir_date: "2024-06-12",
    incident_date: "2024-06-11",
    crime_type: "Chain Snatching",
    crime_subtype: "Snatching at Day Time",
    bns_sections: ["Section 304 (BNS)", "Section 3(5) (BNS)"],
    ipc_sections: ["Section 379 (IPC)", "Section 34 (IPC)"],
    lat: 12.9789,
    lon: 77.5917,
    fir_narrative: "An elderly lady Shantamma R. was walking near Shivajinagar Bus Stand when two suspects on a black Pulsar motorcycle rode up from behind, snatched her gold neck chain weighing 40 grams, and fled towards Commercial Street market lane.",
    severity_score: 0.65,
    anomaly_score: 0.12,
    is_anomaly: false,
    sha256: "0c878f0d8a5de20b22a075e7aef733224ba461320ea500d057a627d04fbc7520"
  },
  {
    id: "fir-2",
    fir_id: "FIR-2024-BNG-0104",
    district: "Bengaluru Urban",
    police_station: "Indiranagar Police Station",
    fir_date: "2024-06-15",
    incident_date: "2024-06-14",
    crime_type: "Cybercrime",
    crime_subtype: "Phishing & Financial Fraud",
    bns_sections: ["Section 318 (BNS)", "Section 66D (IT Act)"],
    ipc_sections: ["Section 420 (IPC)", "Section 468 (IPC)"],
    lat: 12.9718,
    lon: 77.6411,
    fir_narrative: "The victim, an IT professional, received an urgent text claiming his electricity connection would be disconnected unless he paid a nominal bill fee through a provided link. Upon clicking, ₹2,40,000 was debited in three transactions and transferred to various mule accounts.",
    severity_score: 0.78,
    anomaly_score: 0.85,
    is_anomaly: true,
    sha256: "d5ff8827fa6a6c4293e620571dbe4382571210ea50073e6593a20da6b5533221"
  },
  {
    id: "fir-3",
    fir_id: "FIR-2024-MYS-0041",
    district: "Mysuru",
    police_station: "Devaraja Police Station",
    fir_date: "2024-06-18",
    incident_date: "2024-06-18",
    crime_type: "Theft",
    crime_subtype: "Motor Vehicle Theft",
    bns_sections: ["Section 303(2) (BNS)"],
    ipc_sections: ["Section 379 (IPC)"],
    lat: 12.3086,
    lon: 76.6548,
    fir_narrative: "A black Honda Activa scooter (KA-09-EF-5532) parked in front of Devaraja Market was stolen during daytime peak shopping hours. CCTV footages show a single lean suspect unlocking it with a duplicate key and driving towards Mysuru Palace road.",
    severity_score: 0.45,
    anomaly_score: 0.08,
    is_anomaly: false,
    sha256: "9e112abf8e29a3e62057adbe438257d00fbc7520e500d057a627d04fbc11283e"
  },
  {
    id: "fir-4",
    fir_id: "FIR-2024-MYS-0055",
    district: "Mysuru",
    police_station: "Lashkar Police Station",
    fir_date: "2024-06-20",
    incident_date: "2024-06-19",
    crime_type: "Chain Snatching",
    crime_subtype: "Snatching at Evening Time",
    bns_sections: ["Section 304 (BNS)", "Section 3(5) (BNS)"],
    ipc_sections: ["Section 379 (IPC)", "Section 34 (IPC)"],
    lat: 12.3162,
    lon: 76.6631,
    fir_narrative: "A lady was intercepted near Suburban Bus Stand, Mysuru. Two riders wearing full-face helmets on a black Pulsar motorcycle snatched her gold neck chain (32 grams) and drove off towards outer ring road. Similar MO to Bengaluru Shivajinagar case.",
    severity_score: 0.62,
    anomaly_score: 0.22,
    is_anomaly: false,
    sha256: "fa461320ea500d057a627d04fbc75200c878f0d8a5de20b22a075e7aef733224"
  },
  {
    id: "fir-5",
    fir_id: "FIR-2024-BEL-0112",
    district: "Belagavi",
    police_station: "Khade Bazar Police Station",
    fir_date: "2024-06-22",
    incident_date: "2024-06-21",
    crime_type: "Robbery",
    crime_subtype: "Armed Robbery in Residence",
    bns_sections: ["Section 309(4) (BNS)", "Section 310 (BNS)"],
    ipc_sections: ["Section 392 (IPC)", "Section 395 (IPC)"],
    lat: 15.8497,
    lon: 74.5089,
    fir_narrative: "Three masked men entered a residential house in Khade Bazar under threat of knives. They tied up the housewife, looted silver vessels, diamond jewelry, and ₹4,50,000 in cash, then locked the door from outside and fled in an unregistered white Suzuki Swift.",
    severity_score: 0.85,
    anomaly_score: 0.45,
    is_anomaly: false,
    sha256: "bba5533221d5ff8827fa6a6c4293e620571dbe4382571210ea50073e6593a20da"
  },
  {
    id: "fir-6",
    fir_id: "FIR-2024-BNG-0145",
    district: "Bengaluru Urban",
    police_station: "Koramangala Police Station",
    fir_date: "2024-06-25",
    incident_date: "2024-06-25",
    crime_type: "Drug Offence",
    crime_subtype: "Possession and Sale of Synthetic Drugs",
    bns_sections: ["Section 20 (NDPS Act)", "Section 22 (NDPS Act)"],
    ipc_sections: ["Section 21 (NDPS Act)"],
    lat: 12.9352,
    lon: 77.6244,
    fir_narrative: "Based on actionable intelligence, a raid was conducted near a high-profile pub in Koramangala. A drug peddler named Mohammed Rafi was caught with 25 MDMA pills and 15 grams of premium cocaine intended for distribution to college youths during weekend events.",
    severity_score: 0.72,
    anomaly_score: 0.31,
    is_anomaly: false,
    sha256: "20ea500d057a627d04fbc75200c878f0d8a5de20b22a075e7aef733224ba46132"
  },
  {
    id: "fir-7",
    fir_id: "FIR-2024-BNG-0220",
    district: "Bengaluru Urban",
    police_station: "Whitefield Police Station",
    fir_date: "2024-06-28",
    incident_date: "2024-06-27",
    crime_type: "Cheating",
    crime_subtype: "Investment Scam & Ponzi Scheme",
    bns_sections: ["Section 318(4) (BNS)", "Section 316 (BNS)"],
    ipc_sections: ["Section 420 (IPC)", "Section 406 (IPC)"],
    lat: 12.9698,
    lon: 77.7499,
    fir_narrative: "Multiple victims registered complaints against a financial firm operating in ITPL. The firm promised 18% monthly dividends on cryptocurrency holdings, operated for 5 months, gathered over ₹18 Crores from tech employees, and abruptly shut down its offices.",
    severity_score: 0.88,
    anomaly_score: 0.92,
    is_anomaly: true,
    sha256: "6c4293e620571dbe4382571210ea50073e6593a20dad5ff8827fa6a6c4293e620"
  },
  {
    id: "fir-8",
    fir_id: "FIR-2024-HUB-0094",
    district: "Dharwad",
    police_station: "Hubballi Town Police Station",
    fir_date: "2024-07-02",
    incident_date: "2024-07-01",
    crime_type: "Murder",
    crime_subtype: "Culpable Homicide / Gang Dispute",
    bns_sections: ["Section 101 (BNS)", "Section 111 (BNS)"],
    ipc_sections: ["Section 302 (IPC)", "Section 120B (IPC)"],
    lat: 15.3647,
    lon: 75.1242,
    fir_narrative: "A history-sheeter gang member Ramesh G. alias 'Kappe Ramesh' was chased and hacked to death by five rival gang members with sickles near Hubballi railway station cross. Prior personal enmity and turf wars over real estate extortion are identified as motives.",
    severity_score: 0.98,
    anomaly_score: 0.62,
    is_anomaly: false,
    sha256: "e7aef733224ba461320ea500d057a627d04fbc75200c878f0d8a5de20b22a075"
  }
];

// High fidelity alerts indicating crime outbreaks
export const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    district: "Bengaluru Urban",
    crime_type: "Cybercrime",
    severity: "HIGH",
    message: "A massive 142% spike in electricity-bill phishing fraud cases detected across eastern police subdivisions within 7 days.",
    z_score: 3.42,
    current_count: 24,
    baseline_mean: 9.9,
    detected_at: "2026-07-18T10:00:00Z",
    is_active: true
  },
  {
    id: "alert-2",
    district: "Mysuru",
    crime_type: "Chain Snatching",
    severity: "HIGH",
    message: "Inter-district chain-snatching syndicate detected. 5 events within 10 days sharing identical black Pulsar MO near transit hubs.",
    z_score: 2.95,
    current_count: 8,
    baseline_mean: 2.1,
    detected_at: "2026-07-17T15:30:00Z",
    is_active: true
  },
  {
    id: "alert-3",
    district: "Belagavi",
    crime_type: "Theft",
    severity: "MEDIUM",
    message: "Outbreak of residential daytime thefts targeting unlocked apartments and standalone residences near inner business corridors.",
    z_score: 1.84,
    current_count: 15,
    baseline_mean: 8.5,
    detected_at: "2026-07-16T08:15:00Z",
    is_active: true
  },
  {
    id: "alert-4",
    district: "Dharwad",
    crime_type: "Drug Offence",
    severity: "LOW",
    message: "Slight uptick in peddling cases detected around college campuses in Hubballi-Dharwad twin city.",
    z_score: 1.15,
    current_count: 5,
    baseline_mean: 3.2,
    detected_at: "2026-07-15T12:00:00Z",
    is_active: true
  }
];

// Spatiotemporal predictions in H3-like representation with lat/lon for visual rendering
export const mockPredictions: PredictionHex[] = [
  {
    id: "hex-1",
    h3_index: "8861892cc5fffff",
    district: "Bengaluru Urban",
    risk_score: 0.94,
    confidence: 0.88,
    shap_values: {
      recent_crime_density: 0.45,
      day_of_week: 0.23,
      hour_of_day: 0.12,
      socioeconomic_index: 0.08,
      population_density: 0.06
    },
    lat: 12.9789,
    lon: 77.5917
  },
  {
    id: "hex-2",
    h3_index: "8861892c9bfffff",
    district: "Bengaluru Urban",
    risk_score: 0.82,
    confidence: 0.85,
    shap_values: {
      recent_crime_density: 0.38,
      day_of_week: 0.18,
      hour_of_day: 0.15,
      socioeconomic_index: 0.05,
      population_density: 0.06
    },
    lat: 12.9562,
    lon: 77.6144
  },
  {
    id: "hex-3",
    h3_index: "8861892cd7fffff",
    district: "Bengaluru Urban",
    risk_score: 0.76,
    confidence: 0.81,
    shap_values: {
      recent_crime_density: 0.31,
      day_of_week: 0.22,
      hour_of_day: 0.09,
      socioeconomic_index: 0.07,
      population_density: 0.07
    },
    lat: 12.9845,
    lon: 77.6411
  },
  {
    id: "hex-4",
    h3_index: "8861892f33fffff",
    district: "Mysuru",
    risk_score: 0.88,
    confidence: 0.83,
    shap_values: {
      recent_crime_density: 0.41,
      day_of_week: 0.21,
      hour_of_day: 0.14,
      socioeconomic_index: 0.06,
      population_density: 0.06
    },
    lat: 12.3086,
    lon: 76.6548
  },
  {
    id: "hex-5",
    h3_index: "8861892f35fffff",
    district: "Mysuru",
    risk_score: 0.58,
    confidence: 0.79,
    shap_values: {
      recent_crime_density: 0.22,
      day_of_week: 0.15,
      hour_of_day: 0.11,
      socioeconomic_index: 0.04,
      population_density: 0.06
    },
    lat: 12.3242,
    lon: 76.6811
  },
  {
    id: "hex-6",
    h3_index: "8861892e59fffff",
    district: "Belagavi",
    risk_score: 0.69,
    confidence: 0.82,
    shap_values: {
      recent_crime_density: 0.28,
      day_of_week: 0.16,
      hour_of_day: 0.12,
      socioeconomic_index: 0.07,
      population_density: 0.06
    },
    lat: 15.8497,
    lon: 74.5089
  },
  {
    id: "hex-7",
    h3_index: "8861892d11fffff",
    district: "Dharwad",
    risk_score: 0.65,
    confidence: 0.78,
    shap_values: {
      recent_crime_density: 0.24,
      day_of_week: 0.19,
      hour_of_day: 0.08,
      socioeconomic_index: 0.09,
      population_density: 0.05
    },
    lat: 15.3647,
    lon: 75.1242
  }
];

// Rich interactive POLE graph matching the first screenshots
export const mockNodes: POLENode[] = [
  // Persons (Accused/Suspects)
  { id: "p-1", label: "Mohammed Rafi", type: "PERSON", degree: 5, properties: { name: "Mohammed Rafi", aliases: ["Rafi", "Chhota Rafi"], role: "ACCUSED", is_accused: true, offender_score: 0.87, district: "Bengaluru Urban", address: "Laskar Lane, Koramangala, Bengaluru" } },
  { id: "p-2", label: "Kappe Ramesh", type: "PERSON", degree: 3, properties: { name: "Ramesh G.", aliases: ["Kappe Ramesh"], role: "ACCUSED", is_accused: true, offender_score: 0.92, district: "Dharwad", address: "Keshwapur, Hubballi" } },
  { id: "p-3", label: "Vikram Sen", type: "PERSON", degree: 4, properties: { name: "Vikram Sen", aliases: ["Vicky", "Mechanic Vicky"], role: "SUSPECT", is_accused: true, offender_score: 0.74, district: "Bengaluru Urban", address: "Shivajinagar slums, Bengaluru" } },
  { id: "p-4", label: "Kiran Kumar", type: "PERSON", degree: 2, properties: { name: "Kiran Kumar", aliases: ["Double Kiran"], role: "SUSPECT", is_accused: true, offender_score: 0.68, district: "Mysuru", address: "Gokulam 3rd Stage, Mysuru" } },
  { id: "p-5", label: "Shantamma R.", type: "PERSON", degree: 1, properties: { name: "Shantamma R.", role: "VICTIM", address: "Shivajinagar, Bengaluru" } },
  
  // Objects (Vehicles)
  { id: "v-1", label: "KA-05-MG-1234 (Pulsar)", type: "OBJECT", degree: 4, properties: { reg_number: "KA-05-MG-1234", make: "Bajaj", model: "Pulsar 220", color: "Black", owner_id: "p-3" } },
  { id: "v-2", label: "KA-09-EF-5532 (Activa)", type: "OBJECT", degree: 2, properties: { reg_number: "KA-09-EF-5532", make: "Honda", model: "Activa 6G", color: "Black", owner_id: "p-4" } },
  { id: "v-3", label: "KA-22-M-8890 (Swift)", type: "OBJECT", degree: 1, properties: { reg_number: "KA-22-M-8890", make: "Maruti Suzuki", model: "Swift", color: "White" } },
  
  // Locations
  { id: "l-1", label: "Shivajinagar Bus Stand", type: "LOCATION", degree: 3, properties: { name: "Shivajinagar Bus Stand, Bengaluru", lat: 12.9789, lon: 77.5917, district: "Bengaluru Urban", h3_index: "8861892cc5fffff" } },
  { id: "l-2", label: "Suburban Bus Stand, Mysuru", type: "LOCATION", degree: 2, properties: { name: "Suburban Bus Stand, Mysuru", lat: 12.3162, lon: 76.6631, district: "Mysuru", h3_index: "8861892f33fffff" } },
  { id: "l-3", label: "Devaraja Market, Mysuru", type: "LOCATION", degree: 2, properties: { name: "Devaraja Market, Mysuru Area", lat: 12.3086, lon: 76.6548, district: "Mysuru" } },
  
  // Events (FIRs)
  { id: "e-1", label: "FIR-2024-BNG-0082", type: "EVENT", degree: 3, properties: { fir_id: "FIR-2024-BNG-0082", date: "2024-06-12", crime_type: "Chain Snatching", bns_sections: ["Section 304 (BNS)"], district: "Bengaluru Urban" } },
  { id: "e-2", label: "FIR-2024-MYS-0055", type: "EVENT", degree: 3, properties: { fir_id: "FIR-2024-MYS-0055", date: "2024-06-20", crime_type: "Chain Snatching", bns_sections: ["Section 304 (BNS)"], district: "Mysuru" } },
  { id: "e-3", label: "FIR-2024-MYS-0041", type: "EVENT", degree: 2, properties: { fir_id: "FIR-2024-MYS-0041", date: "2024-06-18", crime_type: "Theft", bns_sections: ["Section 303(2) (BNS)"], district: "Mysuru" } }
];

export const mockEdges: POLEEdge[] = [
  // Real confirmed edges from FIRs
  { id: "ed-1", source: "p-3", target: "e-1", type: "ACCUSED_IN", weight: 1.0, predicted: false },
  { id: "ed-2", source: "p-5", target: "e-1", type: "VICTIM_IN", weight: 1.0, predicted: false },
  { id: "ed-3", source: "e-1", target: "l-1", type: "OCCURRED_AT", weight: 1.0, predicted: false },
  { id: "ed-4", source: "v-1", target: "e-1", type: "USED_IN", weight: 1.0, predicted: false },
  
  { id: "ed-5", source: "p-3", target: "e-2", type: "ACCUSED_IN", weight: 1.0, predicted: false },
  { id: "ed-6", source: "e-2", target: "l-2", type: "OCCURRED_AT", weight: 1.0, predicted: false },
  { id: "ed-7", source: "v-1", target: "e-2", type: "USED_IN", weight: 1.0, predicted: false },
  
  { id: "ed-8", source: "p-4", target: "e-3", type: "ACCUSED_IN", weight: 1.0, predicted: false },
  { id: "ed-9", source: "e-3", target: "l-3", type: "OCCURRED_AT", weight: 1.0, predicted: false },
  { id: "ed-10", source: "v-2", target: "e-3", type: "USED_IN", weight: 1.0, predicted: false },
  
  { id: "ed-11", source: "p-3", target: "v-1", type: "OWNS", weight: 1.0, predicted: false },
  { id: "ed-12", source: "p-4", target: "v-2", type: "OWNS", weight: 1.0, predicted: false },

  // AI-inferred associations (dashed links via CrimeGAT predictions!)
  {
    id: "ed-ai-1",
    source: "p-1",
    target: "p-3",
    type: "PROBABLE_ASSOCIATE",
    weight: 0.78,
    predicted: true,
    confidence: 0.78,
    supporting_firs: ["FIR-2024-BNG-0082", "FIR-2024-BNG-0145"]
  },
  {
    id: "ed-ai-2",
    source: "p-3",
    target: "p-4",
    type: "PROBABLE_ASSOCIATE",
    weight: 0.81,
    predicted: true,
    confidence: 0.81,
    supporting_firs: ["FIR-2024-BNG-0082", "FIR-2024-MYS-0055"]
  },
  {
    id: "ed-ai-3",
    source: "p-4",
    target: "l-1",
    type: "FREQUENTS",
    weight: 0.65,
    predicted: true,
    confidence: 0.65,
    supporting_firs: ["FIR-2024-MYS-0041"]
  }
];

// Pre-packaged Modus Operandi similar cases for semantic search results
export const moCases: MOSearchResult[] = [
  {
    fir_id: "FIR-2024-BNG-0082",
    similarity: 0.94,
    snippet: "Gold neck chain snatched from walking elderly lady near bus stand. Suspects operating in pairs on a black Pulsar motorcycle and escaping into transit corridors.",
    district: "Bengaluru Urban",
    date: "2024-06-12",
    crime_type: "Chain Snatching",
    bns_sections: ["Section 304 (BNS)"],
    narrative: "An elderly lady Shantamma R. was walking near Shivajinagar Bus Stand when two suspects on a black Pulsar motorcycle rode up from behind, snatched her gold neck chain weighing 40 grams, and fled towards Commercial Street market lane."
  },
  {
    fir_id: "FIR-2024-MYS-0055",
    similarity: 0.88,
    snippet: "Evening crime near major bus terminal. Two helmet-clad riders pulled up behind a female pedestrian, ripped a gold chain, and speeded off towards outer state boundaries.",
    district: "Mysuru",
    date: "2024-06-20",
    crime_type: "Chain Snatching",
    bns_sections: ["Section 304 (BNS)", "Section 3(5) (BNS)"],
    narrative: "A lady was intercepted near Suburban Bus Stand, Mysuru. Two riders wearing full-face helmets on a black Pulsar motorcycle snatched her gold neck chain (32 grams) and drove off towards outer ring road. Similar MO to Bengaluru Shivajinagar case."
  },
  {
    fir_id: "FIR-2024-BEL-0182",
    similarity: 0.74,
    snippet: "A lady standing in front of her gate had her chain snatched by two youths on an unidentified black sporty motorcycle. Fled into heavy traffic towards national highway.",
    district: "Belagavi",
    date: "2024-05-18",
    crime_type: "Chain Snatching",
    bns_sections: ["Section 304 (BNS)"],
    narrative: "While standing near her house gate in Belagavi, the complainant was targeted by two youths on an orange-black Pulsar motorcycle who snatched her gold chain (18 grams) and immediately speeded off toward the NH4 highway access."
  },
  {
    fir_id: "FIR-2024-BNG-0552",
    similarity: 0.68,
    snippet: "Chain snatching incident during morning walk. Two suspects on a Pulsar 220 matched the license plate sequence KA-05-MG. Accomplice coordination spotted.",
    district: "Bengaluru Urban",
    date: "2024-04-30",
    crime_type: "Chain Snatching",
    bns_sections: ["Section 304 (BNS)"],
    narrative: "Complainant states that during his morning walk in Jayanagar, a black motorcycle matching KA-05-MG plate rode close and the pillion rider forcefully pulled his gold chain. The suspect's vehicle matched the gang's standard operating Pulsar motorcycle."
  }
];
