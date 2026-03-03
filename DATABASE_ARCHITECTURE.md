# Sehat Setu AI Database Architecture Guide

## Database Requirements for AI Healthcare Chatbot

### 1. PRIMARY DATABASE - PostgreSQL (Recommended)
**Purpose**: User data, appointments, prescriptions, hospital/doctor info

**Why PostgreSQL:**
- ACID compliance for critical healthcare data
- Excellent for relational data (users, appointments, doctors, hospitals)
- JSON support for flexible healthcare records
- Full-text search for symptom/disease database

**Schema Structure:**
```sql
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(15),
  name VARCHAR(255),
  blood_type VARCHAR(5),
  allergies TEXT,
  medical_history TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Appointments Table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  doctor_id INTEGER REFERENCES doctors(id),
  hospital_id INTEGER REFERENCES hospitals(id),
  appointment_date DATE,
  appointment_time TIME,
  status VARCHAR(50), -- confirmed, cancelled, completed
  notes TEXT,
  created_at TIMESTAMP
);

-- Prescriptions Table
CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  doctor_id INTEGER REFERENCES doctors(id),
  medicines JSON, -- [{name, dosage, frequency, duration}]
  date_issued DATE,
  expiry_date DATE,
  created_at TIMESTAMP
);

-- Doctors Table
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  specialty VARCHAR(100),
  hospital_id INTEGER REFERENCES hospitals(id),
  experience_years INTEGER,
  consultation_fee DECIMAL(10,2),
  rating DECIMAL(3,2),
  phone VARCHAR(15),
  created_at TIMESTAMP
);

-- Hospitals Table
CREATE TABLE hospitals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(100),
  area VARCHAR(100),
  phone VARCHAR(15),
  website VARCHAR(255),
  specialties JSON, -- ["Cardiology", "Surgery", ...]
  insurance_accepted JSON, -- ["ICICI", "HDFC", ...]
  emergency_available BOOLEAN,
  rating DECIMAL(3,2),
  created_at TIMESTAMP
);

-- Insurance Verification Table
CREATE TABLE insurance_verification (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  provider VARCHAR(100),
  policy_number VARCHAR(100),
  coverage_limit DECIMAL(12,2),
  active BOOLEAN,
  created_at TIMESTAMP
);
```

---

### 2. CONVERSATIONAL AI DATABASE - MongoDB
**Purpose**: Conversation history, chat logs, user intents, AI training data

**Why MongoDB:**
- Flexible schema for varied conversation structures
- Excellent for time-series data (chat logs)
- Stores complex nested JSON (conversations with metadata)
- High write throughput for real-time chatting
- Easy to scale horizontally

**Collections Structure:**
```javascript
// Conversations Collection
db.conversations.insertOne({
  _id: ObjectId(),
  user_id: 123,
  user_name: "John Doe",
  messages: [
    {
      timestamp: ISODate("2026-03-02T10:30:00Z"),
      role: "user",
      content: "I have chest pain",
      intent: "symptom_check",
      entities: {
        symptom: "chest pain",
        severity: "moderate"
      }
    },
    {
      timestamp: ISODate("2026-03-02T10:30:05Z"),
      role: "assistant",
      content: "I recommend consulting a cardiologist...",
      intent: "recommendation"
    }
  ],
  conversation_summary: "User inquired about chest pain, recommended cardiology",
  user_intent_sequence: ["greeting", "symptom_check", "recommendation"],
  created_at: ISODate("2026-03-02T10:30:00Z"),
  updated_at: ISODate("2026-03-02T10:35:00Z")
});

// AI Training Data Collection
db.ai_training_data.insertOne({
  _id: ObjectId(),
  user_message: "I have chest pain",
  ai_response: "I recommend consulting a cardiologist",
  intent: "symptom_check",
  entities_extracted: {
    symptoms: ["chest pain"],
    severity: "not_specified"
  },
  feedback: "helpful", // For model improvement
  language: "en",
  created_at: ISODate()
});

// User Intents Collection
db.user_intents.insertOne({
  _id: ObjectId(),
  user_id: 123,
  intent: "book_appointment",
  frequency: 5,
  last_used: ISODate("2026-03-02"),
  preferred_times: ["morning", "afternoon"],
  preferred_doctors: [1, 5, 8],
  created_at: ISODate()
});
```

---

### 3. VECTOR DATABASE - Pinecone or Weaviate
**Purpose**: AI embeddings, semantic search, similarity matching

**Why Vector Database:**
- Stores AI embeddings for symptom similarity
- Fast semantic search (find similar health conditions)
- Powers intelligent doctor recommendations
- Enables context-aware responses

**Use Cases:**
```
Symptom Embeddings:
- "chest pain" → [0.23, -0.45, 0.89, ...] (1536 dimensions)
- "heart pain" → [0.22, -0.46, 0.88, ...] (similar vectors = same condition)

Doctor Specialties:
- "Cardiology" → [0.12, 0.56, 0.34, ...]
- "Heart diseases" → [0.13, 0.55, 0.33, ...] (semantic similarity)
```

**Implementation:**
```python
from pinecone import Pinecone

pc = Pinecone(api_key="YOUR_API_KEY")
index = pc.Index("sehat-setu-ai")

# Store embeddings
index.upsert(vectors=[
  ("symptom-chest-pain", [0.23, -0.45, 0.89, ...], {"type": "symptom"}),
  ("specialty-cardiology", [0.12, 0.56, 0.34, ...], {"type": "specialty"})
])

# Search for similar
results = index.query(
  vector=[0.23, -0.45, 0.90, ...],  # User's symptom vector
  top_k=5,
  filter={"type": "specialty"}
)
```

---

### 4. CACHE DATABASE - Redis
**Purpose**: Session management, real-time data, performance optimization

**Why Redis:**
- Sub-millisecond response times
- Session caching (avoid database hits)
- Real-time notifications
- Conversation context caching
- Rate limiting for API calls

**Use Cases:**
```
# Store user session
SET user:123:session "{user_id: 123, language: 'hi', last_intent: 'symptom_check'}"
EX 3600

# Cache appointment slots
SET hospital:1:slots:2026-03-02 "[10:00, 10:30, 11:00, 14:00]"
EX 86400

# Real-time conversation context
SET conversation:123:context "{city: 'Delhi', specialty: 'Cardiology'}"
EX 7200
```

---

### 5. TIME-SERIES DATABASE - InfluxDB (Optional)
**Purpose**: Analytics, chatbot performance metrics, user behavior tracking

**Why InfluxDB:**
- Optimized for time-series data
- Track chatbot metrics over time
- User engagement analytics
- AI model performance tracking

**Metrics to Track:**
```
- Response time by intent
- User satisfaction by doctor/hospital
- Appointment booking success rate
- Language preference trends
- Intent distribution over time
```

---

## Recommended Stack for Sehat Setu

### Option 1: Complete AI Stack (Recommended)
```
┌─────────────────────────────────────┐
│     Frontend (JavaScript/React)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Flask Backend (Python)             │
├─────────────────────────────────────┤
│ API Layer: /api/chat, /api/book, etc│
└──────────────┬──────────────────────┘
               │
     ┌─────────┼────────────┬──────────────┐
     ▼         ▼            ▼              ▼
┌────────┐ ┌──────────┐ ┌────────┐ ┌────────────┐
│ Redis  │ │PostgreSQL│ │MongoDB │ │  Pinecone  │
│(Cache) │ │(Users,   │ │(Chats, │ │(AI Vector) │
│(Real-  │ │Apps,     │ │Intents,│ │(Semantic   │
│time)   │ │Doctors)  │ │Logs)   │ │Search)     │
└────────┘ └──────────┘ └────────┘ └────────────┘
```

### Option 2: Budget-Friendly Stack
```
┌─────────────────────────────────────┐
│     Frontend (JavaScript/React)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Flask Backend (Python)             │
└──────────────┬──────────────────────┘
               │
     ┌─────────┴──────────┐
     ▼                    ▼
┌────────────┐       ┌────────────┐
│PostgreSQL  │       │  Redis     │
│(All data)  │       │(Caching)   │
│(with JSONB)│       │(Sessions)  │
└────────────┘       └────────────┘
```

---

## Installation & Setup Commands

### 1. PostgreSQL Setup
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb sehat_setu

# Create tables
psql sehat_setu < schema.sql
```

### 2. MongoDB Setup
```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connect
mongosh

# Create database
use sehat_setu
```

### 3. Redis Setup
```bash
# Install Redis
brew install redis

# Start Redis
redis-server

# Test
redis-cli ping  # Should return PONG
```

### 4. Python Drivers
```bash
pip install psycopg2-binary  # PostgreSQL
pip install pymongo          # MongoDB
pip install redis            # Redis
pip install pinecone-client  # Vector DB (optional)
```

---

## Flask Backend Integration Example

```python
from flask import Flask
import psycopg2
import redis
from pymongo import MongoClient

app = Flask(__name__)

# PostgreSQL Connection
conn = psycopg2.connect("dbname=sehat_setu user=postgres")

# MongoDB Connection
mongo_client = MongoClient('mongodb://localhost:27017/')
mongo_db = mongo_client['sehat_setu']

# Redis Connection
redis_client = redis.Redis(host='localhost', port=6379)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    user_id = request.json['user_id']
    
    # Check Redis cache for user session
    session = redis_client.get(f'user:{user_id}:session')
    
    # Get user data from PostgreSQL
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user_data = cursor.fetchone()
    
    # Store conversation in MongoDB
    mongo_db.conversations.insert_one({
        'user_id': user_id,
        'message': user_message,
        'timestamp': datetime.now()
    })
    
    # AI Processing (use Vector DB for semantic search)
    response = generate_ai_response(user_message, user_data)
    
    # Cache response in Redis
    redis_client.set(f'user:{user_id}:last_response', response)
    
    return {'response': response}
```

---

## Cost Estimation (Monthly)

| Database | Type | Cost | Notes |
|----------|------|------|-------|
| PostgreSQL | SQL | $15-100 | AWS RDS or self-hosted |
| MongoDB | NoSQL | $10-200 | Atlas cloud free tier available |
| Redis | Cache | $5-50 | AWS ElastiCache or self-hosted |
| Pinecone | Vector | $0-500 | Free tier: 100k vectors |
| **Total** | | **$30-850** | Scalable with usage |

---

## Recommendations for Your Project

1. **Start with PostgreSQL + Redis** - Perfect for MVP
2. **Add MongoDB when conversations grow** - Store chat history separately
3. **Integrate Vector DB later** - When you need semantic search
4. **Use cloud services** - AWS RDS, MongoDB Atlas, Redis Cloud

Would you like me to set up the database schema and Flask integration for your project?
