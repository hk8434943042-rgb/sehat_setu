# Hospital Admin - Database Auto-Save Setup

## Changes Made

### 1. **Database Schema Updated** (`database/schema.sql`)
- Added `photo TEXT` column to the `hospitals` table
- Stores hospital images as Base64 encoded strings

### 2. **Backend API Updated** (`flask_app/admin/routes.py`)
- Modified `POST /admin/hospital` to accept and save photo data
- Modified `PUT/PATCH /admin/hospital/<id>` to support photo updates
- All hospital data is automatically committed to database

### 3. **Frontend Form** (`admin-add-hospital.html`)
- Image upload with preview and validation
- Form submission automatically converts image to Base64
- All data (including photo) is sent to backend API
- Backend automatically saves everything to database

## How It Works

1. User fills hospital form (name, type, location, contact, facilities, image)
2. User clicks "Add Hospital" button
3. Frontend validates form fields
4. Image is converted to Base64 string
5. All data is sent to backend API `/admin/hospital`
6. Backend automatically inserts into database with validation
7. Database stores:
   - Hospital name, type, address, area, city, pincode
   - Contact phone & email
   - Website URL
   - Facilities (JSON)
   - Photo (Base64 string)
   - Timestamp (last_verified_on)

## Auto-Migration for Existing Databases

If your database was created before these changes, run the migration script:

```bash
cd 3_BACK_END
python scripts/migrate_add_photo.py instance/sehat_setu.db
```

This automatically adds the `photo` column to your existing hospitals table.

## Data Flow

```
Frontend Form
    ↓
Image Upload (JPG/PNG, max 5MB)
    ↓
Base64 Encoding
    ↓
API Request to /admin/hospital (POST)
    ↓
Backend Validation
    ↓
Database INSERT
    ↓
Success Response → Redirect to Hospital List
```

## Quick Start

1. **Add Hospital**: Click "➕ Add Hospital" button on hospital list page
2. **Fill Form**: Enter all hospital details
3. **Upload Image**: Click "📸 Upload Hospital Image" and select file
4. **Submit**: Click "Add Hospital" button
5. **Auto-Save**: Everything is automatically saved to database
6. **Verify**: Hospital appears in list immediately

## API Endpoint

**POST** `/admin/hospital`

**Request Body**:
```json
{
  "name": "Apollo Hospital",
  "type": "Private",
  "address": "123 Main Street",
  "area": "Boring Road",
  "city": "Patna",
  "pincode": "800001",
  "contact_phone": "+91 6200000000",
  "contact_email": "contact@apollo.com",
  "website": "https://apollo.com",
  "facilities_json": {"Emergency": true, "ICU": true},
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
}
```

**Response** (201 Created):
```json
{"status": "ok"}
```

## Notes

- Photos are stored as Base64 (text field in database)
- For large deployments, consider moving images to file storage (S3, etc.)
- Maximum file size: 5MB
- Supported formats: JPG, PNG
- All fields except name and type are optional
