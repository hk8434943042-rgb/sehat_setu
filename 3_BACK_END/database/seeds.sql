-- Comprehensive seed data for Sehat Setu

-- Hospitals
INSERT INTO hospitals (name, type, address, area, city, pincode, contact_phone, contact_email, website, facilities_json, rating_avg, last_verified_on)
VALUES
('AIIMS Patna', 'Government', 'Phulwarisharif', 'Phulwarisharif', 'Patna', '801507', '0612-2451070', 'director@aiimspatna.edu.in', 'https://aiimspatna.edu.in', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "MRI": true, "CT Scan": true, "NICU": true, "Dialysis": true, "Blood Bank": true}', 4.7, date('now')),

('Indira Gandhi Institute of Medical Sciences (IGIMS)', 'Government', 'Sheikhpura', 'Sheikhpura', 'Patna', '800014', '0612-2297072', 'igims.patna@gmail.com', 'https://igimspatna.org', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "MRI": true, "NICU": true, "Dialysis": true, "Blood Bank": true}', 4.5, date('now')),

('Patna Medical College Hospital (PMCH)', 'Government', 'Ashok Raj Path', 'Banka More', 'Patna', '800004', '0612-2302100', 'pmch.patna@gmail.com', 'http://pmch.org.in', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "Blood Bank": true}', 4.3, date('now')),

('Paras HMRI Hospital', 'Private', 'NH 30', 'Bailey Road', 'Patna', '800014', '0612-3540100', 'info@parashmrihospital.com', 'https://parashmrihospital.com', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "MRI": true, "CT Scan": true, "NICU": true, "Dialysis": true, "Blood Bank": true, "Operation Theatre": true}', 4.8, date('now')),

('Ruban Memorial Hospital', 'Private', 'Mangal Talab Road', 'Kankarbagh', 'Patna', '800020', '0612-2350309', 'info@rubanmemorialhospital.com', 'https://rubanmemorialhospital.com', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "CT Scan": true, "Dialysis": true}', 4.6, date('now')),

('Apollo Clinic', 'Private', 'Exhibition Road', 'Gandhi Maidan', 'Patna', '800001', '0612-2227766', 'patna@apolloclinic.com', 'https://apolloclinic.com', '{"OPD": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "Teleconsultation": true}', 4.4, date('now')),

('City Care Hospital', 'Private', 'Sector 2', 'Patliputra Colony', 'Patna', '800013', '0612-2354321', 'info@citycarehospital.com', NULL, '{"ICU": true, "Ambulance": true, "Pharmacy": true, "Lab": true}', 4.2, date('now')),

('Ford Hospital', 'Private', 'Jakkanpur', 'Kankarbagh', 'Patna', '800020', '0612-2234567', 'info@fordhospital.com', 'https://fordhospital.com', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "MRI": true}', 4.5, date('now')),

('Brahmaputra Hospital', 'Private', 'Saguna More', 'Danapur', 'Patna', '801503', '06115-246800', 'contact@brahmaputrahospital.com', NULL, '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true}', 4.3, date('now')),

('Anugrah Narayan Magadh Medical College', 'Government', 'Shekhpura Road', 'Gaya', 'Gaya', '823001', '0631-2222722', 'anmmch.gaya@gmail.com', 'http://anmmch.org', '{"ICU": true, "Emergency": true, "Ambulance": true, "Pharmacy": true, "Lab": true, "X-Ray": true, "Blood Bank": true}', 4.1, date('now'));

-- Doctors
INSERT INTO doctors (hospital_id, name, specialization, experience_years, qualifications, op_timings, days_available, contact_ext)
VALUES
-- AIIMS Patna
(1, 'Dr. Rajesh Kumar Singh', 'Cardiology', 15, 'MD, DM (Cardiology)', '9:00 AM - 2:00 PM', 'Mon, Wed, Fri', 'Ext 201'),
(1, 'Dr. Priya Sharma', 'Neurology', 12, 'MD, DM (Neurology)', '10:00 AM - 3:00 PM', 'Tue, Thu, Sat', 'Ext 202'),
(1, 'Dr. Anil Kumar Jha', 'Orthopedics', 18, 'MS (Orthopedics)', '8:00 AM - 1:00 PM', 'Mon-Sat', 'Ext 203'),
(1, 'Dr. Sunita Kumari', 'Pediatrics', 10, 'MD (Pediatrics)', '9:00 AM - 4:00 PM', 'Mon-Fri', 'Ext 204'),

-- IGIMS
(2, 'Dr. Ramesh Prasad', 'General Surgery', 20, 'MS (Surgery)', '8:00 AM - 12:00 PM', 'Mon-Sat', 'Ext 101'),
(2, 'Dr. Anjali Verma', 'Gynecology', 14, 'MD (OBS/GYN)', '10:00 AM - 2:00 PM', 'Mon, Wed, Fri', 'Ext 102'),
(2, 'Dr. Sunil Kumar', 'Medicine', 16, 'MD (Medicine)', '9:00 AM - 3:00 PM', 'Tue, Thu, Sat', 'Ext 103'),

-- PMCH
(3, 'Dr. Vijay Kumar', 'ENT', 13, 'MS (ENT)', '8:30 AM - 1:30 PM', 'Mon-Fri', 'Ext 301'),
(3, 'Dr. Meena Devi', 'Dermatology', 11, 'MD (Dermatology)', '10:00 AM - 2:00 PM', 'Mon, Wed, Fri', 'Ext 302'),

-- Paras HMRI
(4, 'Dr. Santosh Kumar', 'Cardiothoracic Surgery', 22, 'MCh (CTVS)', '9:00 AM - 1:00 PM', 'Mon-Fri', 'Ext 401'),
(4, 'Dr. Ritu Singh', 'Oncology', 15, 'MD, DM (Oncology)', '10:00 AM - 3:00 PM', 'Mon, Wed, Fri', 'Ext 402'),
(4, 'Dr. Manoj Pathak', 'Neurosurgery', 18, 'MCh (Neurosurgery)', '8:00 AM - 12:00 PM', 'Tue, Thu, Sat', 'Ext 403'),
(4, 'Dr. Kavita Mishra', 'Nephrology', 12, 'MD, DM (Nephrology)', '9:00 AM - 2:00 PM', 'Mon-Sat', 'Ext 404'),

-- Ruban Memorial
(5, 'Dr. Ashok Kumar', 'Orthopedics', 16, 'MS (Orthopedics)', '9:00 AM - 2:00 PM', 'Mon-Sat', 'Ext 501'),
(5, 'Dr. Nisha Kumari', 'Obstetrics', 10, 'MD (OBS/GYN)', '10:00 AM - 3:00 PM', 'Mon, Wed, Fri', 'Ext 502'),

-- Apollo Clinic
(6, 'Dr. Rakesh Sharma', 'General Medicine', 14, 'MD (Medicine)', '9:00 AM - 5:00 PM', 'Mon-Sat', 'Ext 601'),
(6, 'Dr. Pooja Singh', 'Dermatology', 8, 'MD (Dermatology)', '10:00 AM - 4:00 PM', 'Tue, Thu, Sat', 'Ext 602'),

-- City Care
(7, 'Dr. Ajay Gupta', 'General Surgery', 12, 'MS (Surgery)', '8:00 AM - 1:00 PM', 'Mon-Fri', 'Ext 701'),

-- Ford Hospital
(8, 'Dr. Ramakant Dubey', 'Cardiology', 17, 'MD, DM (Cardiology)', '9:00 AM - 2:00 PM', 'Mon, Wed, Fri', 'Ext 801'),
(8, 'Dr. Seema Yadav', 'Pediatrics', 11, 'MD (Pediatrics)', '10:00 AM - 3:00 PM', 'Mon-Sat', 'Ext 802');

-- Treatments with costs
INSERT INTO treatments (hospital_id, treatment_name, cost_min, cost_max, notes)
VALUES
-- AIIMS (Government rates - lower)
(1, 'General Consultation', 20, 50, 'OPD'),
(1, 'Appendectomy', 5000, 15000, 'Ward to semi-private room'),
(1, 'Cesarean Section', 3000, 10000, 'Government hospital rates'),
(1, 'Heart Bypass Surgery', 50000, 150000, 'CTVS department'),
(1, 'Knee Replacement', 40000, 100000, 'Orthopedics'),

-- IGIMS
(2, 'General Consultation', 20, 50, 'OPD'),
(2, 'Appendectomy', 5000, 20000, 'Ward to private room'),
(2, 'Normal Delivery', 2000, 8000, 'Government rates'),
(2, 'Cataract Surgery', 5000, 15000, 'Per eye'),
(2, 'Dialysis', 800, 1500, 'Per session'),

-- PMCH
(3, 'General Consultation', 10, 30, 'OPD'),
(3, 'Appendectomy', 8000, 25000, 'Basic ward to private'),
(3, 'Fracture Treatment', 5000, 30000, 'Depends on complexity'),

-- Paras HMRI (Private - higher rates)
(4, 'General Consultation', 500, 1000, 'Specialist OPD'),
(4, 'Appendectomy', 35000, 60000, 'Laparoscopic surgery'),
(4, 'Cesarean Section', 45000, 90000, 'Private room with AC'),
(4, 'Heart Bypass Surgery', 250000, 500000, 'CTVS with ICU'),
(4, 'Knee Replacement', 180000, 350000, 'Complete package'),
(4, 'Cancer Chemotherapy', 50000, 200000, 'Per cycle, varies by type'),
(4, 'Brain Surgery', 200000, 500000, 'Neurosurgery'),
(4, 'Dialysis', 2000, 3500, 'Per session with monitoring'),

-- Ruban Memorial
(5, 'General Consultation', 300, 600, 'OPD'),
(5, 'Appendectomy', 25000, 50000, 'Laparoscopic'),
(5, 'Normal Delivery', 15000, 35000, 'Standard to deluxe room'),
(5, 'Cesarean Section', 35000, 70000, 'Complete package'),
(5, 'Cataract Surgery', 15000, 35000, 'Per eye with IOL'),
(5, 'Dialysis', 1800, 2800, 'Per session'),

-- Apollo Clinic
(6, 'General Consultation', 400, 800, 'Specialist consultation'),
(6, 'Health Checkup', 2000, 8000, 'Basic to comprehensive'),
(6, 'Skin Treatment', 1000, 5000, 'Per session'),
(6, 'Vaccination', 500, 3000, 'Various vaccines'),

-- City Care
(7, 'General Consultation', 200, 400, 'OPD'),
(7, 'Appendectomy', 20000, 45000, 'Standard surgery'),
(7, 'Cataract Surgery', 12000, 30000, 'Per eye'),

-- Ford Hospital
(8, 'General Consultation', 400, 700, 'OPD'),
(8, 'Appendectomy', 30000, 55000, 'Laparoscopic'),
(8, 'Heart Angioplasty', 150000, 300000, 'With stent'),
(8, 'Pediatric Care', 300, 600, 'Per consultation');

-- Insurance providers
INSERT INTO insurance (hospital_id, insurer_name, cashless_available, tpa_details)
VALUES
-- AIIMS
(1, 'CGHS', 'Y', 'Direct billing'),
(1, 'ECHS', 'Y', 'Direct billing'),
(1, 'Ayushman Bharat (PMJAY)', 'Y', 'State Health Agency'),

-- IGIMS
(2, 'CGHS', 'Y', 'Direct billing'),
(2, 'Ayushman Bharat (PMJAY)', 'Y', 'State Health Agency'),
(2, 'Bihar State Health Insurance', 'Y', 'Direct'),

-- PMCH
(3, 'Ayushman Bharat (PMJAY)', 'Y', 'State Health Agency'),
(3, 'Bihar State Health Insurance', 'Y', 'Direct'),

-- Paras HMRI
(4, 'Star Health Insurance', 'Y', 'Medi Assist TPA'),
(4, 'HDFC Ergo', 'Y', 'HDFC TPA'),
(4, 'ICICI Lombard', 'Y', 'ICICI TPA'),
(4, 'Max Bupa', 'Y', 'Max Bupa TPA'),
(4, 'Care Health Insurance', 'Y', 'Paramount TPA'),
(4, 'CGHS', 'Y', 'Medi Assist TPA'),
(4, 'Ayushman Bharat (PMJAY)', 'Y', 'State Health Agency'),

-- Ruban Memorial
(5, 'Star Health Insurance', 'Y', 'Medi Assist TPA'),
(5, 'HDFC Ergo', 'Y', 'HDFC TPA'),
(5, 'ICICI Lombard', 'Y', 'ICICI TPA'),
(5, 'CGHS', 'Y', 'Medi Assist TPA'),
(5, 'Ayushman Bharat (PMJAY)', 'N', 'Reimbursement only'),

-- Apollo Clinic
(6, 'Most Major Insurance', 'N', 'Reimbursement basis'),

-- City Care
(7, 'Star Health Insurance', 'Y', 'Medi Assist TPA'),
(7, 'HDFC Ergo', 'N', 'Reimbursement only'),
(7, 'Ayushman Bharat (PMJAY)', 'Y', 'State Health Agency'),

-- Ford Hospital
(8, 'Star Health Insurance', 'Y', 'Medi Assist TPA'),
(8, 'ICICI Lombard', 'Y', 'ICICI TPA'),
(8, 'Max Bupa', 'Y', 'Max Bupa TPA'),
(8, 'CGHS', 'Y', 'Medi Assist TPA');

-- Discounts and offers
INSERT INTO discounts (hospital_id, title, description, discount_pct, valid_from, valid_till, terms)
VALUES
(4, 'Senior Citizen Discount', '10% off on all OPD consultations for citizens above 60', 10.0, '2026-01-01', '2026-12-31', 'Valid ID proof required'),
(4, 'Health Checkup Package', 'Comprehensive health checkup at discounted rates', 20.0, '2026-01-01', '2026-06-30', 'Advance booking required'),
(5, 'Maternity Package', 'Special package for normal and cesarean deliveries', 15.0, '2026-01-01', '2026-12-31', 'Pre-registration required'),
(6, 'New Patient Offer', 'First consultation free for new patients', 100.0, '2026-01-01', '2026-12-31', 'One-time offer per family'),
(7, 'Cataract Surgery Camp', 'Special rates for cataract surgery during eye care camp', 25.0, '2026-03-01', '2026-03-31', 'Limited slots available');
