# 🌍 AI Training Template - Add More Cities

Now that Patna is trained, you can add any other city using this template!

---

## 📋 Quick Reference: How to Train AI for Any City

### Step 1: Create Training Script

Copy this template and customize for your city:

```python
#!/usr/bin/env python3
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from flask_app import create_app
from flask_app.models import AITrainingData
import json

def seed_city_hospitals():
    app = create_app()
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        
        hospitals = [
            {
                'name': 'Hospital Name',
                'city': 'City Name',
                'area': 'Area/Zone',
                'contact_phone': '+91-XXX-XXXX-XXXX',
                'website': 'www.hospital.com',
                'facilities': ['Specialty1', 'Specialty2', ...],
                'insurance': ['ICICI', 'HDFC', ...],
                'rating': 4.5
            },
            # Add more hospitals...
        ]
        # Insert hospitals...

def train_ai_for_city():
    # Add training conversations...

def main():
    seed_city_hospitals()
    train_ai_for_city()
```

---

## 🏥 Cities Ready to Add

### Tier 1 (Major Cities)
- [ ] Delhi
- [ ] Mumbai
- [ ] Bangalore
- [ ] Hyderabad
- [ ] Pune

### Tier 2 (Metro Cities)
- [ ] Kolkata
- [ ] Chennai
- [ ] Ahmedabad
- [ ] Jaipur
- [ ] Lucknow

### Tier 3 (Other Important Cities)
- [ ] Chandigarh
- [ ] Surat
- [ ] Vadodara
- [ ] Nagpur
- [ ] Indore

---

## 📝 Hospital Data Template

For each hospital, collect:

```python
{
    'name': 'Full Hospital Name',              # e.g., "Max Hospital Delhi"
    'city': 'City Name',                       # e.g., "Delhi"
    'area': 'Area/Zone',                       # e.g., "New Delhi"
    'contact_phone': '+91-XXX-XXXX-XXXX',     # Main phone number
    'website': 'www.hospital.com',             # Website URL
    'facilities': [                            # List of specialties
        'Cardiology',
        'Orthopedics',
        'Neurology',
        'Gynecology',
        'Pediatrics',
        'General Surgery',
        'Emergency',
        'ICU'
    ],
    'insurance': [                             # Accepted insurance
        'ICICI',
        'HDFC',
        'Aetna',
        'Bajaj',
        'Star'
    ],
    'rating': 4.5                              # 1-5 stars
}
```

---

## 🧠 Training Conversations Template

Add 10-15 conversations per city covering:

```python
training_data = [
    # 1. General query
    {
        'user': 'Find me best hospitals in [CITY]',
        'ai': '🏥 Top hospitals in [CITY]:\n1. Hospital A (4.8⭐)\n2. Hospital B (4.7⭐)...',
        'intent': 'hospital_search'
    },
    
    # 2. Insurance query
    {
        'user': 'Which hospitals in [CITY] accept [INSURANCE]?',
        'ai': '✅ Hospitals accepting [INSURANCE]:\n• Hospital A\n• Hospital B...',
        'intent': 'insurance_query'
    },
    
    # 3. Specialty query
    {
        'user': 'Best [SPECIALTY] hospital in [CITY]',
        'ai': '[EMOJI] Top [SPECIALTY] specialists in [CITY]:\n1. Hospital A...',
        'intent': 'hospital_search'
    },
    
    # 4. Emergency
    {
        'user': 'Emergency hospital [CITY]',
        'ai': '🚨 24/7 Emergency hospitals in [CITY]:\n• Hospital A - [PHONE]...',
        'intent': 'emergency'
    },
    
    # 5. Hindi query
    {
        'user': '[CITY] में सर्वश्रेष्ठ अस्पताल',
        'ai': '[CITY] के सर्वश्रेष्ठ अस्पताल:\n1. Hospital A (4.8⭐)...',
        'intent': 'hospital_search'
    },
    
    # Add 10-15 more variations...
]
```

---

## 🔧 Implementation Steps

### 1. Update AI Service
```python
# In flask_app/services/ai_conversation_service.py
cities = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 
          'patna', 'kolkata', 'chennai', 'NEW_CITY']
```

### 2. Create Training Script
```bash
# Create scripts/train_[city]_hospitals.py
# Follow the Patna template
```

### 3. Run Training
```bash
python3 scripts/train_[city]_hospitals.py
```

### 4. Test
```bash
curl -X POST http://localhost:5000/api/ai/conversation/1/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Find me best hospitals in [CITY]"}'
```

---

## 📊 Data Sources

Find hospital data from:

1. **Government**
   - State Health Department
   - NRHM Database
   - NABH Accredited Hospitals

2. **Online**
   - Google Maps (Ratings)
   - Practo.com
   - HealthGrades
   - Apollo/Max websites

3. **Direct**
   - Hospital websites
   - Phone calls for verification
   - Local networks

---

## 🎯 Quality Checklist

Before running training, verify:

- [x] Hospital names are current
- [x] Phone numbers are active
- [x] Websites are correct
- [x] Specialties are accurate
- [x] Insurance providers listed
- [x] Ratings are fair (based on research)
- [x] At least 8 hospitals per city
- [x] 10+ training conversations
- [x] Both English and Hindi patterns
- [x] Emergency services verified

---

## 📈 Scaling Strategy

### Phase 1 (Done)
- ✅ Patna - 8 hospitals

### Phase 2 (Next Week)
- [ ] Add 3-4 more cities (Delhi, Mumbai, Bangalore)
- [ ] ~30 more hospitals
- [ ] ~40 training conversations

### Phase 3 (Later)
- [ ] All major Indian cities
- [ ] 200+ hospitals
- [ ] 500+ training conversations
- [ ] Regional language support

---

## 💡 Pro Tips

### 1. Automate Data Collection
```python
# Use Practo API or scraping
import requests
response = requests.get('api.practo.com/hospitals?city=Delhi')
hospitals = response.json()['data']
```

### 2. Batch Training
```bash
# Create master script
python3 scripts/batch_train_all_cities.py
```

### 3. Quality Assurance
```bash
# Test all cities
python3 test_city_hospital_queries.py
```

### 4. Monitor Performance
```python
# Track which queries get best responses
analytics = db.query('ai_training_data WHERE feedback = "helpful"')
```

---

## 🚀 Ready-to-Use Cities List

### Copy-Paste Hospital Names for:

**Delhi:**
- Max Healthcare
- Apollo Delhi
- Fortis Delhi
- AIIMS Delhi
- Ganga Ram Hospital

**Mumbai:**
- HN Reliance Foundation
- Apollo Mumbai
- Breach Candy Hospital
- Lilavati Hospital
- Hinduja Hospital

**Bangalore:**
- Columbia Asia
- Fortis Bangalore
- Apollo Bangalore
- SPARSH Hospital
- Manipal Hospital

**Hyderabad:**
- Apollo Hyderabad
- CARE Hospitals
- Yashoda Hospitals
- Continental Hospitals
- Aster Hospital

---

## ❓ FAQ

**Q: How long does training take?**
A: ~5 minutes per city (database + training data)

**Q: Can I train multiple cities at once?**
A: Yes! Create a batch script that runs all training scripts

**Q: How often should I update?**
A: Quarterly - to refresh ratings, contact info, specialties

**Q: Can I use duplicate hospital names?**
A: No - use SQL `INSERT OR IGNORE` to prevent duplicates

**Q: How do I measure AI quality?**
A: Track user feedback and satisfaction scores in database

---

## 📞 Support

If you want to train more cities:

1. Copy `scripts/train_patna_hospitals.py` template
2. Replace city name, hospitals, and conversations
3. Run the script
4. Test queries in chatbot

That's it! AI learns automatically! 🎉

---

## 🎯 Goal: Pan-India Coverage

**Current:** ✅ Patna (8 hospitals)  
**Next:** Delhi, Mumbai, Bangalore  
**Future:** All 200+ Indian cities  

Let's build India's best healthcare AI! 🇮🇳💚
