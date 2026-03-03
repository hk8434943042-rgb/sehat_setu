-- Sehat Setu (MVP) SQLite schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS hospitals (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    address TEXT,
    area TEXT,
    city TEXT,
    pincode TEXT,
    latitude REAL,
    longitude REAL,
    contact_phone TEXT,
    contact_email TEXT,
    website TEXT,
    facilities_json TEXT,
    rating_avg REAL,
    photo TEXT,
    last_verified_on TEXT
);

CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY,
    hospital_id INTEGER,
    name TEXT,
    specialization TEXT,
    experience_years INTEGER,
    qualifications TEXT,
    op_timings TEXT,
    days_available TEXT,
    contact_ext TEXT,
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE IF NOT EXISTS treatments (
    id INTEGER PRIMARY KEY,
    hospital_id INTEGER,
    treatment_name TEXT,
    cost_min REAL,
    cost_max REAL,
    notes TEXT,
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE IF NOT EXISTS insurance (
    id INTEGER PRIMARY KEY,
    hospital_id INTEGER,
    insurer_name TEXT,
    cashless_available TEXT,
    tpa_details TEXT,
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE IF NOT EXISTS discounts (
    id INTEGER PRIMARY KEY,
    hospital_id INTEGER,
    title TEXT,
    description TEXT,
    discount_pct REAL,
    valid_from TEXT,
    valid_till TEXT,
    terms TEXT,
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    date_of_birth TEXT,
    gender TEXT,
    blood_group TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    city TEXT,
    pincode TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    medical_history TEXT,
    allergies TEXT,
    current_medications TEXT,
    insurance_provider TEXT,
    insurance_number TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    hospital_id INTEGER NOT NULL,
    doctor_id INTEGER,
    appointment_date TEXT NOT NULL,
    appointment_time TEXT NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(patient_id) REFERENCES patients(id),
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id),
    FOREIGN KEY(doctor_id) REFERENCES doctors(id)
);

CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_hospital ON appointments(hospital_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
-- AI & CHATBOT TABLES FOR ENHANCED FEATURES

CREATE TABLE IF NOT EXISTS ai_conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    user_name TEXT,
    conversation_summary TEXT,
    user_intent_sequence TEXT,
    language TEXT DEFAULT 'en',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS conversation_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    intent TEXT,
    entities_json TEXT,
    timestamp TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(conversation_id) REFERENCES ai_conversations(id)
);

CREATE TABLE IF NOT EXISTS user_intents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    intent TEXT NOT NULL,
    frequency INTEGER DEFAULT 1,
    last_used TEXT,
    preferred_times TEXT,
    preferred_doctors TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER,
    hospital_id INTEGER,
    medicines_json TEXT,
    date_issued TEXT,
    expiry_date TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(patient_id) REFERENCES patients(id),
    FOREIGN KEY(doctor_id) REFERENCES doctors(id),
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE IF NOT EXISTS insurance_verification (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    provider TEXT,
    policy_number TEXT,
    coverage_limit REAL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS ratings_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    hospital_id INTEGER,
    doctor_id INTEGER,
    rating REAL CHECK(rating >= 1 AND rating <= 5),
    review_text TEXT,
    visit_date TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(patient_id) REFERENCES patients(id),
    FOREIGN KEY(hospital_id) REFERENCES hospitals(id),
    FOREIGN KEY(doctor_id) REFERENCES doctors(id)
);

CREATE TABLE IF NOT EXISTS ai_training_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_message TEXT,
    ai_response TEXT,
    intent TEXT,
    entities_json TEXT,
    feedback TEXT,
    language TEXT DEFAULT 'en',
    created_at TEXT DEFAULT (datetime('now'))
);

-- INDEXES FOR PERFORMANCE

CREATE INDEX IF NOT EXISTS idx_conversations_patient ON ai_conversations(patient_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created ON ai_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_intent ON conversation_messages(intent);
CREATE INDEX IF NOT EXISTS idx_user_intents_patient ON user_intents(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_insurance_patient ON insurance_verification(patient_id);
CREATE INDEX IF NOT EXISTS idx_ratings_hospital ON ratings_reviews(hospital_id);
CREATE INDEX IF NOT EXISTS idx_ratings_doctor ON ratings_reviews(doctor_id);
CREATE INDEX IF NOT EXISTS idx_training_intent ON ai_training_data(intent);