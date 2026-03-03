# Sehat Setu - Complete Healthcare Platform

![Sehat Setu](./5_LOGO%20&%20BRANDING/logo.jpeg)

**Sehat Setu** is a comprehensive healthcare management platform that connects patients with hospitals, doctors, and healthcare services. It provides features for hospital search, appointment booking, patient registration, and healthcare information management.

## 🌟 Features

### Patient Features
- **Hospital Search & Discovery** - Find hospitals by name, location, type, and services
- **Detailed Hospital Information** - View doctors, treatments, costs, insurance, and facilities
- **Patient Registration** - Create and manage patient profiles
- **Appointment Booking** - Schedule appointments with doctors at hospitals
- **Insurance Information** - Check insurance coverage and cashless facilities
- **Treatment Costs** - View estimated costs for various medical procedures

### Hospital Features
- **Hospital Profiles** - Comprehensive information about facilities, services, and doctors
- **Doctor Listings** - Detailed doctor profiles with specializations and availability
- **Treatment Information** - Cost ranges and procedure details
- **Insurance Partnerships** - List of accepted insurance providers

### Admin Features
- **Hospital Management** - Create, update, and delete hospital records
- **Data Verification** - Track last verification dates for data accuracy

## 🏗️ Project Structure

```
SEHAT_SETU_Project/
├── 3_BACK_END/              # Flask Backend API
│   ├── flask_app/
│   │   ├── __init__.py      # App factory
│   │   ├── app.py           # Entry point
│   │   ├── config.py        # Configuration
│   │   ├── db.py            # Database utilities
│   │   ├── errors.py        # Error handlers
│   │   ├── public/          # Public API routes
│   │   ├── admin/           # Admin API routes
│   │   ├── patient/         # Patient API routes
│   │   └── appointment/     # Appointment API routes
│   ├── database/
│   │   ├── schema.sql       # Database schema
│   │   └── seeds.sql        # Seed data
│   ├── tests/               # Test suite
│   ├── requirements.txt
│   └── Dockerfile
│
├── 4_FRONT-END/             # Frontend Application
│   └── sehat-setu-frontend-starter/
│       ├── index.html       # Landing page
│       ├── hospital-list.html      # Hospital listing
│       ├── hospital-detail.html    # Hospital details
│       ├── patient-register.html   # Patient registration
│       ├── services.html    # Services page
│       ├── styles.css       # Main styles
│       └── js/
│           ├── api.js       # API client
│           ├── hospital-list.js
│           ├── hospital-detail.js
│           └── patient-register.js
│
├── 2_DATA-BASE/             # Database files
├── 1_DATA/                  # Data resources
├── docker-compose.yml       # Docker composition
└── nginx.conf              # Nginx configuration
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip
- (Optional) Docker & Docker Compose

### Quick Start - Backend

1. **Navigate to backend directory:**
   ```bash
   cd 3_BACK_END
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server:**
   ```bash
   python -m flask_app.app
   ```

   The API will be available at `http://127.0.0.1:5000`

### Quick Start - Frontend

1. **Open frontend directory:**
   ```bash
   cd 4_FRONT-END/sehat-setu-frontend-starter
   ```

2. **Serve with a local server:**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Or using VS Code Live Server extension

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### Using Docker Compose

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:5000`

3. **Stop services:**
   ```bash
   docker-compose down
   ```

## 📡 API Endpoints

### Public Endpoints

#### Hospitals
- `GET /` - Health check
- `GET /hospitals` - List all hospitals (supports filters: `?q=search&area=location`)
- `GET /hospital/<id>` - Get hospital details with doctors, treatments, insurance
- `GET /search?q=query` - Search hospitals and treatments

#### Patients
- `POST /api/patients/` - Register a new patient
- `GET /api/patients/<id>` - Get patient details
- `PUT /api/patients/<id>` - Update patient information
- `GET /api/patients/<id>/appointments` - Get patient's appointments

#### Appointments
- `POST /api/appointments/` - Create a new appointment
- `GET /api/appointments/<id>` - Get appointment details
- `PUT /api/appointments/<id>` - Update appointment
- `DELETE /api/appointments/<id>` - Cancel appointment
- `GET /api/appointments/hospital/<id>` - Get hospital's appointments
- `GET /api/appointments/doctor/<id>` - Get doctor's appointments

### Admin Endpoints
- `POST /admin/hospital` - Create a new hospital
- `PUT /admin/hospital/<id>` - Update hospital
- `DELETE /admin/hospital/<id>` - Delete hospital

## 🧪 Testing

### Run Backend Tests
```bash
cd 3_BACK_END
pytest tests/ -v
```

### Run Tests with Coverage
```bash
pytest tests/ --cov=flask_app --cov-report=html
```

## 🗄️ Database Schema

### Tables
- **hospitals** - Hospital information, location, contact details
- **doctors** - Doctor profiles, specializations, availability
- **treatments** - Medical procedures and cost estimates
- **insurance** - Insurance providers and coverage details
- **discounts** - Special offers and discount programs
- **patients** - Patient registration and medical history
- **appointments** - Appointment bookings and scheduling

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `3_BACK_END` directory:

```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_PATH=database/sehat_setu.db
HOST=127.0.0.1
PORT=5000
DEBUG=True
```

## 📝 Development

### Adding New Features

1. **Backend Route:**
   - Create route in appropriate blueprint (`public`, `admin`, `patient`, `appointment`)
   - Add validation using validators in `services/validators.py`
   - Update tests in `tests/`

2. **Frontend Feature:**
   - Add HTML page or update existing
   - Create JavaScript module in `js/`
   - Update API calls in `js/api.js` if needed

### Code Style
- Backend: Follow PEP 8 guidelines
- Frontend: Use ES6+ features, consistent naming
- Comments: Document complex logic and API contracts

## 🚢 Deployment

### Production Checklist
- [ ] Set strong `SECRET_KEY` in environment
- [ ] Disable `DEBUG` mode
- [ ] Use production database (PostgreSQL/MySQL)
- [ ] Configure CORS for production domains
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure logging and monitoring
- [ ] Set up automated backups
- [ ] Configure firewall rules

### Deployment Options

#### 1. Docker Deployment
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### 2. Traditional Server
- Deploy Flask app with Gunicorn/uWSGI
- Serve frontend with Nginx
- Use supervisor for process management

#### 3. Cloud Platforms
- AWS (EC2, RDS, S3)
- Google Cloud Platform
- Heroku
- DigitalOcean

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is developed for educational and healthcare accessibility purposes.

## 👥 Team

- Healthcare Platform Development Team
- IITP Project Initiative

## 📧 Contact

For questions or support:
- Email: support@sehatsetu.in
- Website: https://sehatsetu.in

## 🙏 Acknowledgments

- Flask framework
- SQLite database
- All healthcare professionals who provide data
- Open source community

---

**Made with ❤️ for better healthcare accessibility in India**
