# Sehat Setu API Documentation

Base URL: `http://127.0.0.1:5000`

## Authentication
Currently, the API is open. Authentication will be added in future versions for admin and patient-specific operations.

---

## Public Endpoints

### Health Check
Check if the API is running.

**Request:**
```http
GET /
```

**Response:**
```
200 OK
"Sehat Setu Backend Running Successfully!"
```

---

### List Hospitals
Get a list of all hospitals with optional filtering.

**Request:**
```http
GET /hospitals?q={search}&area={area}
```

**Query Parameters:**
- `q` (optional): Search term for hospital name or area
- `area` (optional): Filter by area/location

**Example:**
```http
GET /hospitals?q=AIIMS&area=Patna
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "AIIMS Patna",
    "type": "Government",
    "address": "Phulwarisharif",
    "area": "Phulwarisharif",
    "city": "Patna",
    "pincode": "801507",
    "contact_phone": "0612-2451070",
    "website": "https://aiimspatna.edu.in",
    "last_verified_on": "2026-03-02"
  }
]
```

---

### Get Hospital Details
Get detailed information about a specific hospital including doctors, treatments, and insurance.

**Request:**
```http
GET /hospital/{id}
```

**Path Parameters:**
- `id`: Hospital ID (integer)

**Example:**
```http
GET /hospital/1
```

**Response:**
```json
{
  "id": 1,
  "name": "AIIMS Patna",
  "type": "Government",
  "address": "Phulwarisharif",
  "area": "Phulwarisharif",
  "city": "Patna",
  "pincode": "801507",
  "contact_phone": "0612-2451070",
  "contact_email": "director@aiimspatna.edu.in",
  "website": "https://aiimspatna.edu.in",
  "facilities_json": "{\"ICU\": true, \"Emergency\": true}",
  "rating_avg": 4.7,
  "last_verified_on": "2026-03-02",
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Rajesh Kumar Singh",
      "specialization": "Cardiology",
      "experience_years": 15,
      "op_timings": "9:00 AM - 2:00 PM",
      "days_available": "Mon, Wed, Fri"
    }
  ],
  "treatments": [
    {
      "id": 1,
      "treatment_name": "General Consultation",
      "cost_min": 20,
      "cost_max": 50,
      "notes": "OPD"
    }
  ],
  "insurance": [
    {
      "id": 1,
      "insurer_name": "CGHS",
      "cashless_available": "Y",
      "tpa_details": "Direct billing"
    }
  ]
}
```

**Error Response:**
```json
404 Not Found
{
  "error": "Not Found",
  "message": "Hospital not found"
}
```

---

### Search
Search across hospitals and treatments.

**Request:**
```http
GET /search?q={query}
```

**Query Parameters:**
- `q` (required): Search query

**Example:**
```http
GET /search?q=heart surgery
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "AIIMS Patna",
    "area": "Phulwarisharif",
    "city": "Patna",
    "contact_phone": "0612-2451070"
  }
]
```

**Error Response:**
```json
400 Bad Request
{
  "error": "q is required"
}
```

---

## Patient Endpoints

### Register Patient
Create a new patient registration.

**Request:**
```http
POST /api/patients/
Content-Type: application/json

{
  "full_name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "blood_group": "O+",
  "address": "123 Main Street",
  "city": "Patna",
  "pincode": "800001",
  "emergency_contact_name": "Jane Doe",
  "emergency_contact_phone": "9876543211",
  "medical_history": "No major illnesses",
  "allergies": "None",
  "current_medications": "None",
  "insurance_provider": "Star Health",
  "insurance_number": "SH123456789"
}
```

**Required Fields:**
- `full_name`
- `phone`

**Response:**
```json
201 Created
{
  "status": "ok",
  "patient_id": 1
}
```

**Error Responses:**
```json
400 Bad Request
{
  "error": "full_name is required"
}

400 Bad Request
{
  "error": "invalid phone number"
}

409 Conflict
{
  "error": "Patient with this phone number already exists",
  "patient_id": 1
}
```

---

### Get Patient Details
Get patient information.

**Request:**
```http
GET /api/patients/{id}
```

**Response:**
```json
200 OK
{
  "id": 1,
  "full_name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "blood_group": "O+",
  "created_at": "2026-03-02 10:30:00"
}
```

---

### Update Patient
Update patient information.

**Request:**
```http
PUT /api/patients/{id}
Content-Type: application/json

{
  "email": "newemail@example.com",
  "address": "New Address"
}
```

**Response:**
```json
200 OK
{
  "status": "ok"
}
```

---

### Get Patient Appointments
Get all appointments for a patient.

**Request:**
```http
GET /api/patients/{id}/appointments
```

**Response:**
```json
200 OK
[
  {
    "id": 1,
    "patient_id": 1,
    "hospital_id": 1,
    "hospital_name": "AIIMS Patna",
    "doctor_id": 1,
    "doctor_name": "Dr. Rajesh Kumar Singh",
    "specialization": "Cardiology",
    "appointment_date": "2026-04-15",
    "appointment_time": "10:00",
    "status": "pending",
    "created_at": "2026-03-02 11:00:00"
  }
]
```

---

## Appointment Endpoints

### Create Appointment
Book a new appointment.

**Request:**
```http
POST /api/appointments/
Content-Type: application/json

{
  "patient_id": 1,
  "hospital_id": 1,
  "doctor_id": 1,
  "appointment_date": "2026-04-15",
  "appointment_time": "10:00",
  "reason": "Regular checkup",
  "notes": "First visit"
}
```

**Required Fields:**
- `hospital_id`
- `appointment_date` (format: YYYY-MM-DD)
- `appointment_time` (format: HH:MM)

**Optional Fields:**
- `patient_id`
- `doctor_id`
- `reason`
- `notes`

**Response:**
```json
201 Created
{
  "status": "ok",
  "appointment_id": 1
}
```

**Error Responses:**
```json
400 Bad Request
{
  "error": "appointment_date cannot be in the past"
}

404 Not Found
{
  "error": "hospital not found"
}
```

---

### Get Appointment Details
Get details of a specific appointment.

**Request:**
```http
GET /api/appointments/{id}
```

**Response:**
```json
200 OK
{
  "id": 1,
  "patient_id": 1,
  "patient_name": "John Doe",
  "patient_phone": "9876543210",
  "hospital_id": 1,
  "hospital_name": "AIIMS Patna",
  "hospital_address": "Phulwarisharif",
  "hospital_phone": "0612-2451070",
  "doctor_id": 1,
  "doctor_name": "Dr. Rajesh Kumar Singh",
  "specialization": "Cardiology",
  "appointment_date": "2026-04-15",
  "appointment_time": "10:00",
  "reason": "Regular checkup",
  "status": "pending",
  "notes": "First visit",
  "created_at": "2026-03-02 11:00:00",
  "updated_at": "2026-03-02 11:00:00"
}
```

---

### Update Appointment
Update appointment details.

**Request:**
```http
PUT /api/appointments/{id}
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Patient confirmed availability"
}
```

**Updatable Fields:**
- `appointment_date`
- `appointment_time`
- `doctor_id`
- `reason`
- `status` (pending, confirmed, completed, cancelled)
- `notes`

**Response:**
```json
200 OK
{
  "status": "ok"
}
```

---

### Cancel Appointment
Cancel an appointment.

**Request:**
```http
DELETE /api/appointments/{id}
```

**Response:**
```json
200 OK
{
  "status": "ok",
  "message": "Appointment cancelled"
}
```

---

### Get Hospital Appointments
Get all appointments for a hospital.

**Request:**
```http
GET /api/appointments/hospital/{hospital_id}?status={status}&date={date}
```

**Query Parameters:**
- `status` (optional): Filter by status
- `date` (optional): Filter by date (YYYY-MM-DD)

**Response:**
```json
200 OK
[
  {
    "id": 1,
    "patient_name": "John Doe",
    "patient_phone": "9876543210",
    "doctor_name": "Dr. Rajesh Kumar Singh",
    "appointment_date": "2026-04-15",
    "appointment_time": "10:00",
    "status": "pending"
  }
]
```

---

### Get Doctor Appointments
Get all appointments for a doctor.

**Request:**
```http
GET /api/appointments/doctor/{doctor_id}?status={status}&date={date}
```

**Response:** Same as hospital appointments

---

## Admin Endpoints

### Create Hospital
Add a new hospital to the system.

**Request:**
```http
POST /admin/hospital
Content-Type: application/json

{
  "name": "New Hospital",
  "type": "Private",
  "address": "123 Hospital Road",
  "area": "Gandhi Maidan",
  "city": "Patna",
  "pincode": "800001",
  "contact_phone": "9876543210",
  "contact_email": "info@newhospital.com",
  "website": "https://newhospital.com"
}
```

**Required Fields:**
- `name`

**Response:**
```json
201 Created
{
  "status": "ok"
}
```

---

### Update Hospital
Update hospital information.

**Request:**
```http
PUT /admin/hospital/{id}
Content-Type: application/json

{
  "name": "Updated Hospital Name",
  "contact_phone": "9876543211"
}
```

**Response:**
```json
200 OK
{
  "status": "ok"
}
```

---

### Delete Hospital
Remove a hospital from the system.

**Request:**
```http
DELETE /admin/hospital/{id}
```

**Response:**
```json
200 OK
{
  "status": "ok"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
Invalid input data or missing required fields.

### 404 Not Found
Requested resource not found.

### 409 Conflict
Resource already exists (e.g., duplicate patient registration).

### 500 Internal Server Error
Unexpected server error.

**Example Error Response:**
```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict
- `500 Internal Server Error` - Server error

---

## Rate Limiting
Currently no rate limiting is implemented. This will be added in production.

## CORS
CORS is enabled for:
- `http://127.0.0.1:*`
- `http://localhost:*`
- `file://*`

---

## Testing the API

### Using cURL
```bash
# Get hospitals
curl http://127.0.0.1:5000/hospitals

# Get hospital details
curl http://127.0.0.1:5000/hospital/1

# Create patient
curl -X POST http://127.0.0.1:5000/api/patients/ \
  -H "Content-Type: application/json" \
  -d '{"full_name": "Test Patient", "phone": "9876543210"}'

# Create appointment
curl -X POST http://127.0.0.1:5000/api/appointments/ \
  -H "Content-Type: application/json" \
  -d '{"hospital_id": 1, "appointment_date": "2026-04-15", "appointment_time": "10:00"}'
```

### Using Postman
Import the collection: `3_BACK_END/postman/SehatSetu.postman_collection.json`

---

For more information, see the [README.md](README.md) and [QUICK_START.md](QUICK_START.md) files.
