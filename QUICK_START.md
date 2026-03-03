# Sehat Setu - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Option 1: Quick Setup (Recommended)

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Start the backend:**
   ```bash
   cd 3_BACK_END
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   python -m flask_app.app
   ```

3. **Start the frontend** (in a new terminal):
   ```bash
   cd 4_FRONT-END/sehat-setu-frontend-starter
   python -m http.server 8000
   ```

4. **Open in browser:**
   - Frontend: http://localhost:8000
   - Backend API: http://localhost:5000

### Option 2: Docker (Easiest)

```bash
docker-compose up -d
```

Access at http://localhost:8080

## 📋 Features Overview

### ✅ What's Implemented

#### Backend (Flask REST API)
- ✅ Hospital listing and search
- ✅ Hospital detail views with doctors, treatments, insurance
- ✅ Patient registration and management
- ✅ Appointment booking system
- ✅ Admin routes for hospital management
- ✅ CORS enabled for frontend integration
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ SQLite database with seed data
- ✅ Unit and integration tests

#### Frontend (HTML/CSS/JavaScript)
- ✅ Responsive landing page
- ✅ Hospital listing with search and filters
- ✅ Hospital detail pages
- ✅ Patient registration form
- ✅ Services page
- ✅ Dark/Light theme toggle
- ✅ Mobile-responsive design
- ✅ Dynamic data loading from API
- ✅ Form validation
- ✅ Error handling and user feedback

#### Database
- ✅ 10+ hospitals with real data (AIIMS, IGIMS, Paras, etc.)
- ✅ 20+ doctors across specializations
- ✅ 40+ treatments with cost estimates
- ✅ Insurance provider information
- ✅ Hospital facilities and ratings

#### DevOps
- ✅ Docker containerization
- ✅ Docker Compose setup
- ✅ Nginx configuration
- ✅ Environment configuration
- ✅ Setup automation scripts
- ✅ Comprehensive documentation

## 🎯 Key API Endpoints

### Public
```
GET  /                     - Health check
GET  /hospitals            - List hospitals (?q=search&area=location)
GET  /hospital/<id>        - Hospital details
GET  /search?q=<query>     - Search hospitals/treatments
```

### Patients
```
POST /api/patients/         - Register patient
GET  /api/patients/<id>     - Get patient
PUT  /api/patients/<id>     - Update patient
GET  /api/patients/<id>/appointments - Get appointments
```

### Appointments
```
POST /api/appointments/              - Create appointment
GET  /api/appointments/<id>          - Get appointment
PUT  /api/appointments/<id>          - Update appointment
DELETE /api/appointments/<id>        - Cancel appointment
GET  /api/appointments/hospital/<id> - Hospital appointments
GET  /api/appointments/doctor/<id>   - Doctor appointments
```

### Admin
```
POST   /admin/hospital     - Create hospital
PUT    /admin/hospital/<id> - Update hospital
DELETE /admin/hospital/<id> - Delete hospital
```

## 🧪 Testing

```bash
cd 3_BACK_END
pytest tests/ -v
```

### Test Coverage
- ✅ Public routes (hospitals, search)
- ✅ Patient registration and management
- ✅ Appointment booking and cancellation
- ✅ Admin operations
- ✅ Input validation
- ✅ Error handling

## 📁 Project Structure

```
SEHAT_SETU_Project/
├── 3_BACK_END/
│   ├── flask_app/
│   │   ├── __init__.py          # App factory
│   │   ├── app.py               # Entry point
│   │   ├── config.py            # Config
│   │   ├── db.py                # Database
│   │   ├── errors.py            # Error handling
│   │   ├── public/routes.py     # Public API
│   │   ├── admin/routes.py      # Admin API
│   │   ├── patient/routes.py    # Patient API
│   │   └── appointment/routes.py # Appointment API
│   ├── database/
│   │   ├── schema.sql           # DB schema
│   │   └── seeds.sql            # Seed data
│   ├── tests/
│   │   ├── test_api.py          # API tests
│   │   └── test_basic.py        # Basic tests
│   └── requirements.txt
│
└── 4_FRONT-END/
    └── sehat-setu-frontend-starter/
        ├── index.html               # Landing page
        ├── hospital-list.html       # Hospital listing
        ├── hospital-detail.html     # Hospital details
        ├── patient-register.html    # Patient registration
        ├── services.html            # Services
        ├── styles.css               # Main styles
        ├── js/
        │   ├── api.js               # API client
        │   ├── hospital-list.js     # Listing logic
        │   ├── hospital-detail.js   # Detail logic
        │   └── patient-register.js  # Registration logic
        └── css/
            └── hospital-cards.css   # Card styles
```

## 🎨 Frontend Pages

1. **index.html** - Landing page with hero section, features, and navigation
2. **hospital-list.html** - Browse hospitals with search and filters
3. **hospital-detail.html** - Detailed hospital view with doctors, treatments, insurance
4. **patient-register.html** - Patient registration form
5. **services.html** - Services and features overview

## 🔧 Configuration

### Backend Environment (.env)
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_PATH=database/sehat_setu.db
HOST=127.0.0.1
PORT=5000
DEBUG=True
```

### Frontend API Configuration
Edit `js/api.js`:
```javascript
const API_BASE_URL = 'http://127.0.0.1:5000';
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python3 --version  # Should be 3.8+

# Reinstall dependencies
cd 3_BACK_END
pip install -r requirements.txt

# Check if port 5000 is available
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

### CORS errors
- Ensure backend is running
- Check API_BASE_URL in `js/api.js`
- Verify CORS origins in backend `__init__.py`

### Database errors
```bash
# Reset database
cd 3_BACK_END
rm -f database/sehat_setu.db
python -m flask_app.app  # Will recreate
```

## 📚 Next Steps

### Potential Enhancements
1. **User Authentication** - Add login/signup for patients
2. **Payment Integration** - Online payment for appointments
3. **Real-time Chat** - Patient-doctor communication
4. **Notifications** - Email/SMS appointment reminders
5. **Analytics Dashboard** - For hospitals and admins
6. **Mobile App** - React Native/Flutter app
7. **AI Features** - Symptom checker, hospital recommendations
8. **Reviews & Ratings** - Patient feedback system

### Deployment
1. **Production Database** - Migrate to PostgreSQL/MySQL
2. **Cloud Hosting** - AWS, GCP, or Azure
3. **CDN** - CloudFlare for static assets
4. **Monitoring** - Sentry, New Relic
5. **CI/CD** - GitHub Actions, Jenkins

## 📞 Support

For questions or issues:
- Check documentation: `README.md`
- Review API endpoints above
- Check backend logs: `3_BACK_END/logs/`
- Run tests: `pytest tests/ -v`

## ✨ Achievements

- ✅ Full-stack application with REST API
- ✅ 10+ hospitals with comprehensive data
- ✅ Patient registration system
- ✅ Appointment booking functionality
- ✅ Responsive, modern UI
- ✅ Dark mode support
- ✅ Production-ready Docker setup
- ✅ Comprehensive test coverage
- ✅ Complete documentation

---

**Ready to use! Start both backend and frontend, then visit http://localhost:8000**
