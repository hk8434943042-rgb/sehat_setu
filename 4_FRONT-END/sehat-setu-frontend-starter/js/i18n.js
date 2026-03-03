// Language Translations - English & Hindi
// Support for multiple languages with easy switching

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.hospitals': 'Hospitals',
    'nav.services': 'Services',
    'nav.register': 'Register',
    'nav.contact': 'Get In Touch',
    'nav.language': 'Language',

    // Home Page
        // Home
        'home.badge': '100% Health Guaranteed',
        'home.title': 'Transforming the Future of Healthcare with Sehat Setu',
        'home.subtitle': 'Connect with verified hospitals, experienced doctors, and trusted healthcare services.',
        'home.startFreeTrial': 'Start Free Trial',
        'home.watchDemo': 'Watch Demo',
    'home.registerPatient': 'Register as Patient',
    'home.ourServices': 'Our Services',
    'home.about': 'About Us',
    'home.contact': 'Contact Us',

    // Hospitals Page
    'hospitals.title': 'Hospitals',
    'hospitals.subtitle': 'Browse hospitals, check services, and book appointments.',
    'hospitals.search': 'Search by name or area…',
    'hospitals.allTypes': 'All Types',
    'hospitals.private': 'Private',
    'hospitals.government': 'Government',
    'hospitals.emergencyAll': 'Emergency (All)',
    'hospitals.emergencyYes': 'Emergency: Yes',
    'hospitals.emergencyNo': 'Emergency: No',
    'hospitals.clear': 'Clear',
    'hospitals.useJson': 'Use JSON',
    'hospitals.upload': 'Upload CSV',

    // Hospital Card
    'hospital.rating': 'Rating',
    'hospital.doctors': 'Doctors',
    'hospital.treatments': 'Treatments',
    'hospital.insurance': 'Insurance',
    'hospital.verified': 'Verified',
    'hospital.emergency': '24/7 Emergency',
    'hospital.surgery': 'Surgery',
    'hospital.viewDetails': 'View Details',
    'hospital.call': 'Call',
    'hospital.directions': 'Directions',
    'hospital.book': 'Book',
    'hospital.share': 'Share',
    'hospital.save': 'Save',
    'hospital.compare': 'Compare',

    // Hospital Detail
    'detail.contact': 'Contact Information',
    'detail.address': 'Address',
    'detail.area': 'Area',
    'detail.city': 'City',
    'detail.pincode': 'Pincode',
    'detail.phone': 'Phone',
    'detail.email': 'Email',
    'detail.website': 'Website',
    'detail.facilities': 'Facilities',
    'detail.doctors': 'Expert Doctors',
    'detail.treatments': 'Treatments',
    'detail.insurance': 'Insurance & Payment',
    'detail.reviews': 'Patient Reviews',
    'detail.location': 'Location & Directions',
    'detail.hours': 'Working Hours',
    'detail.departments': 'Departments & Specialties',
    'detail.bookAppointment': 'Book Appointment',

    // Buttons
    'btn.callNow': 'Call Now',
    'btn.getDirections': 'Get Directions',
    'btn.bookAppointment': 'Book Appointment',
    'btn.share': 'Share',
    'btn.addFavorite': 'Add to Favorites',
    'btn.emergency': 'Emergency',
    'btn.compare': 'Compare',
    'btn.viewDetails': 'View Details',
    'btn.writeReview': 'Write a Review',
    'btn.submit': 'Submit',
    'btn.cancel': 'Cancel',
    'btn.close': 'Close',

    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.age': 'Age',
    'form.gender': 'Gender',
    'form.address': 'Address',
    'form.city': 'City',
    'form.pincode': 'Pincode',
    'form.insurance': 'Insurance Provider',
    'form.policy': 'Policy Number',
    'form.submit': 'Submit',
    'form.required': 'This field is required',

    // Additional home page content
    'home.startFreeTrial': 'Start Free Trial',
    'home.watchDemo': 'Watch Demo',
    'home.ratedReviews': 'Rated 4.9/5 from over 950 reviews',
    'home.about': 'About Sehat Setu',
    'home.aboutDesc': 'We believe that health should never be complicated',
    'home.features': 'Why Choose Us',
    'home.trustedHospitals': 'Trusted Hospitals',
    'home.expertDoctors': 'Expert Doctors',
    'home.seamlessBooking': 'Seamless Booking',
    'home.securePayment': 'Secure Payment',
    'home.footer': 'Footer Content',
    'home.copyright': '© 2026 Sehat Setu. All rights reserved.',

    // Hospital list page
    'hospitals.loaded': 'hospitals loaded',
    'hospitals.noHospitals': 'No hospitals found',
    'hospitals.tryAdjusting': 'Try adjusting your search or filters',

    // Service cards
    'service.opdConsultation': 'OPD Consultation',
    'service.opdDesc': 'Expert consultation with specialists',
    'service.emergency': '24/7 Emergency',
    'service.emergencyDesc': 'Rapid emergency response team',
    'service.diagnostics': 'Diagnostics & Lab',
    'service.diagnosticsDesc': 'Advanced testing facilities',
    'service.surgery': 'Surgery & OT',
    'service.surgeryDesc': 'State-of-the-art operation theaters',
    'service.pharmacy': 'Pharmacy',
    'service.pharmacyDesc': 'Complete medicine inventory',
    'service.icu': 'ICU & Critical Care',
    'service.icuDesc': 'Intensive care units',
    'service.pediatrics': 'Pediatrics',
    'service.pediatricsDesc': 'Child healthcare specialists',
    'service.maternity': 'Maternity & OB-GYN',
    'service.maternityDesc': 'Pregnancy and childbirth care',

    // Messages & Notifications
    'msg.success': 'Success!',
    'msg.error': 'Error occurred',
    'msg.noData': 'No data available',
    'msg.tryAgain': 'Please try again',
    'msg.addedFavorite': 'Added to favorites ❤️',
    'msg.removedFavorite': 'Removed from favorites',
    'msg.shared': 'Shared successfully',
    'msg.linkCopied': 'Link copied to clipboard',
    'msg.callConfirm': 'This will call the hospital. Continue?',
    'msg.loading': 'Loading...',
    'msg.pleaseWait': 'Please wait',

    // Chatbot
    'chatbot.title': 'Sehat Setu Assistant',
    'chatbot.online': '🟢 Online',
    'chatbot.greeting': 'Hello! How can I help you?',
    'chatbot.placeholder': 'Ask me anything...',
    'chatbot.findHospitals': '🏥 Find Hospitals',
    'chatbot.bookAppointment': '📅 Book Appointment',
    'chatbot.emergency': '🚨 Emergency',
    'chatbot.healthTips': '💡 Health Tips',
    
    // Enhanced Features
    'feature.appointment': '📅 Book Appointment',
    'feature.hospital': '🏥 Find Hospital',
    'feature.symptom': '🩺 Symptom Check',
    'feature.profile': '👤 My Profile',
    'feature.myAppointments': '📋 My Appointments',
    'feature.prescriptions': '💊 My Prescriptions',
    'feature.insurance': '🛡️ Insurance Check',
    'feature.emergency': '🚨 Emergency',
    'feature.faq': '❓ FAQ',
    'feature.reviews': '⭐ Reviews',
    
    // Appointment Booking
    'appointment.book': 'Book an Appointment',
    'appointment.selectDoctor': 'Select a Doctor',
    'appointment.selectDate': 'Select Date',
    'appointment.selectTime': 'Select Time',
    'appointment.confirm': 'Confirm Booking',
    'appointment.confirmed': 'Appointment Confirmed!',
    'appointment.cancelled': 'Appointment Cancelled',
    
    // Hospital Search
    'hospital.search': 'Search Hospitals',
    'hospital.searchCity': 'Search by city or speciality',
    'hospital.inCity': 'in',
    'hospital.rating': 'Rating',
    'hospital.insurance': 'Insurance Accepted',
    'hospital.emergency24': '24/7 Emergency',
    'hospital.noResults': 'No hospitals found',
    
    // Doctor Search
    'doctor.search': 'Search Doctors',
    'doctor.bySpecialty': 'Find by Specialty',
    'doctor.experience': 'Experience',
    'doctor.consultation': 'Consultation Fee',
    'doctor.reviews': 'Reviews',
    
    // Symptom Checker
    'symptom.describe': 'Describe your symptoms',
    'symptom.recommended': 'Recommended Doctors',
    'symptom.specialists': 'Specialists for your condition',
    
    // Insurance
    'insurance.verify': 'Verify Insurance',
    'insurance.provider': 'Insurance Provider',
    'insurance.accepted': 'Accepted at these hospitals',
    'insurance.notFound': 'Insurance not found in our database',
    
    // User Profile
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.dob': 'Date of Birth',
    'profile.bloodType': 'Blood Type',
    'profile.allergies': 'Allergies',
    'profile.update': 'Update Profile',
    
    // Prescriptions
    'prescription.view': 'View Prescriptions',
    'prescription.doctor': 'Doctor',
    'prescription.date': 'Date',
    'prescription.medicines': 'Medicines',
    'prescription.dosage': 'Dosage',
    'prescription.noPrescriptions': 'No prescriptions found',
    
    // Emergency
    'emergency.nearest': 'Nearest Emergency Hospital',
    'emergency.call': 'Call Emergency',
    'emergency.directions': 'Get Directions',
    'emergency.ambulance': 'Call Ambulance',
    
    // Reviews & Ratings
    'review.hospitalReviews': 'Hospital Reviews',
    'review.doctorReviews': 'Doctor Reviews',
    'review.rating': 'Rating',
    'review.totalReviews': 'Reviews',
    'review.writeReview': 'Write a Review',

    // Patient Register page extended
    'register.patientDetails': 'Patient Details',
    'register.fullNameLabel': 'Full Name *',
    'register.fullNameHint': 'Enter your legal name.',
    'register.dobLabel': 'Date of Birth *',
    'register.genderLabel': 'Gender *',
    'register.select': 'Select',
    'register.genderFemale': 'Female',
    'register.genderMale': 'Male',
    'register.genderNonBinary': 'Non-binary',
    'register.genderPreferNot': 'Prefer not to say',
    'register.genderOther': 'Other',
    'register.bloodGroup': 'Blood Group',
    'register.unknown': 'Unknown',
    'register.phoneLabel': 'Mobile Number *',
    'register.phonePlaceholder': '10-digit Indian number',
    'register.phoneHint': 'Example: 9876543210',
    'register.streetAddress': 'Street Address',
    'register.state': 'State',
    'register.medicalInfo': 'Medical Information',
    'register.existingConditions': 'Existing Conditions',
    'register.conditionsPlaceholder': 'e.g., Diabetes, Hypertension',
    'register.allergiesPlaceholder': 'e.g., Penicillin, Peanuts',
    'register.height': 'Height (cm)',
    'register.weight': 'Weight (kg)',
    'register.emergencyContact': 'Emergency Contact',
    'register.relationship': 'Relationship',
    'register.relationshipPlaceholder': 'e.g., Father, Spouse',
    'register.preferences': 'Preferences',
    'register.deptGeneralMedicine': 'General Medicine',
    'register.deptCardiology': 'Cardiology',
    'register.deptOrthopedics': 'Orthopedics',
    'register.deptPediatrics': 'Pediatrics',
    'register.deptGynecology': 'Gynecology',
    'register.deptDermatology': 'Dermatology',
    'register.preferredDoctor': 'Preferred Doctor',
    'register.optional': 'Optional',
    'register.preferredDate': 'Preferred Date',
    'register.preferredTime': 'Preferred Time',
    'register.consent': 'I confirm the above information is accurate and I agree to be contacted about my care.',
    'register.submitRegistration': 'Submit Registration',
    'register.backHome': 'Back to Home',
    'register.toastSuccess': '✅ Registration submitted. We’ll get back to you shortly.',
    'register.requiredFields': 'Please fill in all required fields',
    'register.registering': 'Registering...',
    'register.registrationFailed': 'Registration failed',
    'register.registrationSuccessWithId': 'Registration successful! Your Patient ID is:',
    'register.invalidPincode': 'Please enter a valid 6-digit pincode',
    'register.futureDob': 'Date of birth cannot be in the future',
    'register.invalidDob': 'Please enter a valid date of birth',
  },

  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.hospitals': 'अस्पताल',
    'nav.services': 'सेवाएं',
    'nav.register': 'रजिस्टर करें',
    'nav.contact': 'हमसे संपर्क करें',
    'nav.language': 'भाषा',

    // Home Page
    'home.badge': '100% स्वास्थ्य गारंटीड',
    'home.title': 'सेहत सेतु के साथ स्वास्थ्यसेवा का भविष्य बदलना',
    'home.subtitle': 'सत्यापित अस्पतालों, अनुभवी डॉक्टरों और विश्वसनीय स्वास्थ्यसेवा के साथ जुड़ें। आपका स्वास्थ्य, सरलीकृत।',
    'home.findHospital': 'अस्पताल खोजें',
    'home.registerPatient': 'रोगी के रूप में रजिस्टर करें',
    'home.ourServices': 'हमारी सेवाएं',
    'home.about': 'हमारे बारे में',
    'home.contact': 'संपर्क करें',
    'home.startFreeTrial': 'निःशुल्क परीक्षण शुरू करें',
    'home.watchDemo': 'डेमो देखें',
    'home.ratedReviews': '950 से अधिक समीक्षाओं से 4.9/5 रेटेड',
    'home.aboutDesc': 'हमें विश्वास है कि स्वास्थ्य कभी जटिल नहीं होना चाहिए',
    'home.features': 'हमें क्यों चुनें',
    'home.trustedHospitals': 'विश्वसनीय अस्पताल',
    'home.expertDoctors': 'विशेषज्ञ डॉक्टर',
    'home.seamlessBooking': 'निर्बाध बुकिंग',
    'home.securePayment': 'सुरक्षित भुगतान',
    'home.footer': 'पाद सामग्री',
    'home.copyright': '© 2026 सेहत सेतु। सर्वाधिकार सुरक्षित।',

    // Hospitals Page
    'hospitals.title': 'अस्पताल',
    'hospitals.subtitle': 'अस्पतालों को ब्राउज़ करें, सेवाओं की जांच करें और नियुक्तियां बुक करें।',
    'hospitals.search': 'नाम या क्षेत्र से खोजें…',
    'hospitals.allTypes': 'सभी प्रकार',
    'hospitals.private': 'निजी',
    'hospitals.government': 'सरकारी',
    'hospitals.emergencyAll': 'आपातकालीन (सभी)',
    'hospitals.emergencyYes': 'आपातकालीन: हां',
    'hospitals.emergencyNo': 'आपातकालीन: नहीं',
    'hospitals.clear': 'साफ़ करें',
    'hospitals.useJson': 'JSON का उपयोग करें',
    'hospitals.upload': 'CSV अपलोड करें',

    // Hospital Card
    'hospital.rating': 'रेटिंग',
    'hospital.doctors': 'डॉक्टर',
    'hospital.treatments': 'उपचार',
    'hospital.insurance': 'बीमा',
    'hospital.verified': 'सत्यापित',
    'hospital.emergency': '24/7 आपातकालीन',
    'hospital.surgery': 'सर्जरी',
    'hospital.viewDetails': 'विवरण देखें',
    'hospital.call': 'कॉल करें',
    'hospital.directions': 'दिशाएं',
    'hospital.book': 'बुक करें',
    'hospital.share': 'साझा करें',
    'hospital.save': 'सहेजें',
    'hospital.compare': 'तुलना करें',

    // Hospital Detail
    'detail.contact': 'संपर्क जानकारी',
    'detail.address': 'पता',
    'detail.area': 'क्षेत्र',
    'detail.city': 'शहर',
    'detail.pincode': 'पिन कोड',
    'detail.phone': 'फोन',
    'detail.email': 'ईमेल',
    'detail.website': 'वेबसाइट',
    'detail.facilities': 'सुविधाएं',
    'detail.doctors': 'विशेषज्ञ डॉक्टर',
    'detail.treatments': 'उपचार',
    'detail.insurance': 'बीमा और भुगतान',
    'detail.reviews': 'रोगी समीक्षाएं',
    'detail.location': 'स्थान और दिशाएं',
    'detail.hours': 'कार्य समय',
    'detail.departments': 'विभाग और विशेषताएं',
    'detail.bookAppointment': 'नियुक्ति बुक करें',

    // Buttons
    'btn.callNow': 'अभी कॉल करें',
    'btn.getDirections': 'दिशाएं प्राप्त करें',
    'btn.bookAppointment': 'नियुक्ति बुक करें',
    'btn.share': 'साझा करें',
    'btn.addFavorite': 'पसंद में जोड़ें',
    'btn.emergency': 'आपातकालीन',
    'btn.compare': 'तुलना करें',
    'btn.viewDetails': 'विवरण देखें',
    'btn.writeReview': 'समीक्षा लिखें',
    'btn.submit': 'जमा करें',
    'btn.cancel': 'रद्द करें',
    'btn.close': 'बंद करें',

    // Forms
    'form.name': 'नाम',
    'form.email': 'ईमेल',
    'form.phone': 'फोन',
    'form.age': 'आयु',
    'form.gender': 'लिंग',
    'form.address': 'पता',
    'form.city': 'शहर',
    'form.pincode': 'पिन कोड',
    'form.insurance': 'बीमा प्रदाता',
    'form.policy': 'पॉलिसी संख्या',
    'form.submit': 'जमा करें',
    'form.required': 'यह फील्ड आवश्यक है',

    // Additional home page content
    'home.startFreeTrial': 'निःशुल्क परीक्षण शुरू करें',
    'home.watchDemo': 'डेमो देखें',
    'home.ratedReviews': '950 से अधिक समीक्षाओं से 4.9/5 रेटेड',
    'home.about': 'सेहत सेतु के बारे में',
    'home.aboutDesc': 'हमें विश्वास है कि स्वास्थ्य कभी जटिल नहीं होना चाहिए',
    'home.features': 'हमें क्यों चुनें',
    'home.trustedHospitals': 'विश्वसनीय अस्पताल',
    'home.expertDoctors': 'विशेषज्ञ डॉक्टर',
    'home.seamlessBooking': 'निर्बाध बुकिंग',
    'home.securePayment': 'सुरक्षित भुगतान',
    'home.footer': 'पाद सामग्री',
    'home.copyright': '© 2026 सेहत सेतु। सर्वाधिकार सुरक्षित।',

    // Hospital list page
    'hospitals.loaded': 'अस्पताल लोड हुए',
    'hospitals.noHospitals': 'कोई अस्पताल नहीं मिला',
    'hospitals.tryAdjusting': 'अपनी खोज या फ़िल्टर को समायोजित करने का प्रयास करें',

    // Service cards
    'service.opdConsultation': 'ओपीडी परामर्श',
    'service.opdDesc': 'विशेषज्ञों के साथ परामर्श',
    'service.emergency': '24/7 आपातकालीन',
    'service.emergencyDesc': 'तेजी से आपातकालीन प्रतिक्रिया टीम',
    'service.diagnostics': 'नैदानिकी और प्रयोगशाला',
    'service.diagnosticsDesc': 'उन्नत परीक्षण सुविधाएं',
    'service.surgery': 'सर्जरी और ओटी',
    'service.surgeryDesc': 'अत्याधुनिक ऑपरेशन थिएटर',
    'service.pharmacy': 'फार्मेसी',
    'service.pharmacyDesc': 'संपूर्ण दवा सूची',
    'service.icu': 'आईसीयू और गंभीर देखभाल',
    'service.icuDesc': 'गहन देखभाल इकाइयां',
    'service.pediatrics': 'बाल चिकित्सा',
    'service.pediatricsDesc': 'बाल स्वास्थ्य सेवा विशेषज्ञ',
    'service.maternity': 'प्रसूति और स्त्री रोग',
    'service.maternityDesc': 'गर्भावस्था और प्रसव देखभाल',

    // Messages & Notifications
    'msg.success': 'सफल!',
    'msg.error': 'त्रुटि हुई',
    'msg.noData': 'कोई डेटा उपलब्ध नहीं',
    'msg.tryAgain': 'कृपया दोबारा प्रयास करें',
    'msg.addedFavorite': 'पसंद में जोड़ा गया ❤️',
    'msg.removedFavorite': 'पसंद से हटाया गया',
    'msg.shared': 'सफलतापूर्वक साझा किया गया',
    'msg.linkCopied': 'लिंक क्लिपबोर्ड पर कॉपी हुआ',
    'msg.callConfirm': 'यह अस्पताल को कॉल करेगा। जारी रखें?',
    'msg.loading': 'लोड हो रहा है...',
    'msg.pleaseWait': 'कृपया प्रतीक्षा करें',
    'form.invalidEmail': 'Please enter a valid email',
    'form.invalidPhone': 'Please enter a valid phone number',

    // Messages
    'msg.loading': 'Loading...',
    'msg.success': 'Success!',
    'msg.error': 'Error',
    'msg.noData': 'No data available',
    'msg.tryAgain': 'Please try again',
    'msg.addedFavorite': 'Added to favorites ❤️',
    'msg.removedFavorite': 'Removed from favorites',
    'msg.shared': 'Shared successfully',
    'msg.linkCopied': 'Link copied to clipboard',
    'msg.callConfirm': 'This will call the hospital. Continue?',

    // Comparison
    'compare.selectHospitals': 'Select hospitals to compare',
    'compare.selectTwo': 'Please select at least 2 hospitals',
    'compare.maxThree': 'You can compare up to 3 hospitals',
    'compare.compareSelected': 'Compare Selected',
    'compare.type': 'Type',
    'compare.rating': 'Rating',
    'compare.specialties': 'Specialties',
    'compare.doctors': 'Number of Doctors',
    'compare.treatments': 'Number of Treatments',
    'compare.insurance': 'Insurance Partners',
    'compare.cashless': 'Cashless Available',
    'compare.emergency': 'Emergency Available',

    // Footer
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.copyright': '© 2026 Sehat Setu. All rights reserved.',

    // Days
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wednesday': 'Wednesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    'day.sunday': 'Sunday',

    // Status

    // Services Page
    'services.title': 'Our Healthcare Services',
    'services.subtitle': 'Trusted care, modern facilities, and expert treatment — all under one platform.',
    'services.opd.title': 'OPD Consultation',
    'services.opd.desc': 'Meet specialized doctors for routine checkups, diagnosis, and medical advice.',
    'services.emergency.title': '24×7 Emergency',
    'services.emergency.desc': 'Rapid-response emergency care with trained medical staff and ambulance support.',
    'services.diagnostics.title': 'Diagnostics & Lab',
    'servabout': 'हमारे बारे में',
    'nav.hospitals': 'अस्पताल',
    'nav.services': 'सेवाएं',
    'nav.register': 'रजिस्टर',
    'nav.contact': 'हमसे संपर्क करें',
    'nav.language': 'भाषा',

    // Home Page
    'home.badge': '100% स्वास्थ्य गारंटीड',
    'home.title': 'सेहत सेतु के साथ स्वास्थ्यसेवा का भविष्य बदलना',
    'home.subtitle': 'सत्यापित अस्पतालों, अनुभवी डॉक्टरों और विश्वसनीय स्वास्थ्यसेवा के साथ जुड़ें। आपका स्वास्थ्य, सरलीकृत।',
    'register.dob': 'Date of Birth',
    'register.address': 'Address',
    'register.city': 'City',
    'register.submit': 'Register',
    'status.open': 'Open',
    'status.closed': 'Closed',
    'status.available': 'Available',
    'status.unavailable': 'Unavailable',
  },

  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.hospitals': 'अस्पताल',
    'nav.services': 'सेवाएं',
    'nav.register': 'रजिस्टर',
    'nav.language': 'भाषा',

    // Home Page
    'home.title': 'सेहत सेतु',
    'home.tagline': 'आपका स्वास्थ्य साथी',
    'home.subtitle': 'आपको गुणवत्तापूर्ण स्वास्थ्यसेवा से जोड़ना',
    'home.findHospital': 'अस्पताल खोजें',
    'home.registerPatient': 'रोगी के रूप में रजिस्टर करें',
    'home.ourServices': 'हमारी सेवाएं',
    'home.about': 'हमारे बारे में',
    'home.contact': 'संपर्क करें',
    'hospitals.title': 'अस्पताल',
    'hospitals.subtitle': 'अस्पतालों को ब्राउज़ करें, सेवाओं की जांच करें और नियुक्तियां बुक करें।',
    'hospitals.search': 'नाम या क्षेत्र से खोजें…',
    'hospitals.allTypes': 'सभी प्रकार',
    'hospitals.private': 'निजी',
    'hospitals.government': 'सरकारी',
    'hospitals.emergencyAll': 'आपातकालीन (सभी)',
    'hospitals.emergencyYes': 'आपातकालीन: हां',
    'hospitals.emergencyNo': 'आपातकालीन: नहीं',
    'hospitals.clear': 'साफ़ करें',
    'hospitals.useJson': 'JSON का उपयोग करें',
    'hospitals.upload': 'CSV अपलोड',
    'hospital.noResults': 'कोई अस्पताल नहीं मिला',
    'hospital.tryAdjusting': 'अपने फ़िल्टर या खोज शर्तों को समायोजित करने का प्रयास करें',

    // Hospital Card
    'hospital.rating': 'रेटिंग',
    'hospital.doctors': 'डॉक्टर',
    'hospital.treatments': 'उपचार',
    'hospital.insurance': 'बीमा',
    'hospital.verified': 'सत्यापित',
    'hospital.emergency': '24/7 आपातकालीन',
    'hospital.surgery': 'सर्जरी',
    'hospital.viewDetails': 'विवरण देखें',
    'hospital.call': 'कॉल करें',
    'hospital.directions': 'दिशाएं',
    'hospital.book': 'बुक करें',
    'hospital.share': 'साझा करें',
    'hospital.save': 'सहेजें',
    'hospital.compare': 'तुलना करें',

    // Hospital Detail
    'detail.contact': 'संपर्क जानकारी',
    'detail.address': 'पता',
    'detail.area': 'क्षेत्र',
    'detail.city': 'शहर',
    'detail.pincode': 'पिन कोड',
    'detail.phone': 'फोन',
    'detail.email': 'ईमेल',
    'detail.website': 'वेबसाइट',
    'detail.facilities': 'सुविधाएं',
    'detail.doctors': 'विशेषज्ञ डॉक्टर',
    'detail.treatments': 'उपचार',
    'detail.insurance': 'बीमा और भुगतान',
    'detail.reviews': 'रोगी समीक्षाएं',
    'detail.location': 'स्थान और दिशाएं',
    'detail.hours': 'कार्य के घंटे',
    'detail.departments': 'विभाग और विशेषताएं',
    'detail.bookAppointment': 'नियुक्ति बुक करें',

    // Buttons
    'btn.callNow': 'अभी कॉल करें',
    'btn.getDirections': 'दिशाएं प्राप्त करें',
    'btn.bookAppointment': 'नियुक्ति बुक करें',
    'btn.share': 'साझा करें',
    'btn.addFavorite': 'पसंदीदा में जोड़ें',
    'btn.emergency': 'आपातकालीन',
    'btn.compare': 'तुलना करें',
    'btn.viewDetails': 'विवरण देखें',
    'btn.writeReview': 'समीक्षा लिखें',
    'btn.submit': 'जमा करें',
    'btn.cancel': 'रद्द करें',
    'btn.close': 'बंद करें',

    // Forms
    'form.name': 'नाम',
    'form.email': 'ईमेल',
    'form.phone': 'फोन',
    'form.age': 'उम्र',
    'form.gender': 'लिंग',
    'form.address': 'पता',
    'form.city': 'शहर',
    'form.pincode': 'पिन कोड',
    'form.insurance': 'बीमा प्रदाता',
    'form.policy': 'पॉलिसी नंबर',
    'form.submit': 'जमा करें',
    'form.required': 'यह फील्ड आवश्यक है',
    'form.invalidEmail': 'कृपया एक वैध ईमेल दर्ज करें',
    'form.invalidPhone': 'कृपया एक वैध फोन नंबर दर्ज करें',

    // Messages
    'msg.loading': 'लोड हो रहा है...',
    'msg.success': 'सफल!',
    'msg.error': 'त्रुटि',
    'msg.noData': 'कोई डेटा उपलब्ध नहीं',
    'msg.tryAgain': 'कृपया फिर से प्रयास करें',
    'msg.addedFavorite': 'पसंदीदा में जोड़ा गया ❤️',
    'msg.removedFavorite': 'पसंदीदा से हटाया गया',
    'msg.shared': 'सफलतापूर्वक साझा किया गया',
    'msg.linkCopied': 'लिंक क्लिपबोर्ड में कॉपी किया गया',
    'msg.callConfirm': 'यह अस्पताल को कॉल करेगा। जारी रखें?',

    // Comparison
    'compare.selectHospitals': 'तुलना करने के लिए अस्पताल चुनें',
    'compare.selectTwo': 'कृपया कम से कम 2 अस्पताल चुनें',
    'compare.maxThree': 'आप एक बार में 3 अस्पतालों की तुलना कर सकते हैं',
    'compare.compareSelected': 'चयनित की तुलना करें',
    'compare.type': 'प्रकार',
    'compare.rating': 'रेटिंग',
    'compare.specialties': 'विशेषताएं',
    'compare.doctors': 'डॉक्टरों की संख्या',
    'compare.treatments': 'उपचारों की संख्या',
    'compare.insurance': 'बीमा भागीदार',
    'compare.cashless': 'कैशलेस उपलब्ध',
    'compare.emergency': 'आपातकालीन उपलब्ध',

    // Footer
    'footer.about': 'हमारे बारे में',
    'footer.contact': 'संपर्क',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'शर्तें और शर्तें',
    'footer.copyright': '© 2026 सेहत सेतु। सर्वाधिकार सुरक्षित।',

    // Days
    'day.monday': 'सोमवार',
    'day.tuesday': 'मंगलवार',
    'day.wednesday': 'बुधवार',
    'day.thursday': 'गुरुवार',
    'day.friday': 'शुक्रवार',
    'day.saturday': 'शनिवार',
    'day.sunday': 'रविवार',
    // Services Page
    'services.title': 'हमारी स्वास्थ्यसेवा',
    'services.subtitle': 'विश्वसनीय देखभाल, आधुनिक सुविधाएं, और विशेषज्ञ उपचार — सब एक ही प्लेटफॉर्म पर।',
    'services.opd.title': 'ओपीडी परामर्श',
    'services.opd.desc': 'नियमित जांच, निदान और चिकित्सा सलाह के लिए विशेषज्ञ डॉक्टरों से मिलें।',
    'services.emergency.title': '24×7 आपातकालीन',
    'services.emergency.desc': 'प्रशिक्षित चिकित्सा कर्मचारियों और एम्बुलेंस सहायता के साथ तेजी से आपातकालीन देखभाल।',
    'services.diagnostics.title': 'नैदानिकी और प्रयोगशाला',
    'services.diagnostics.desc': 'रक्त परीक्षण, इमेजिंग और डिजिटल रिपोर्ट सटीक और तेजी से।',

    // Patient Register Page
    'register.newPatient': 'नया रोगी',
    'register.title': 'रोगी पंजीकरण',
    'register.subtitle': 'अपनी रोगी प्रोफाइल बनाएं ताकि आप तेजी से नियुक्तियां बुक कर सकें और एक स्थान पर रिकॉर्ड प्रबंधित कर सकें।',
    'register.fullName': 'पूरा नाम',
    'register.email': 'ईमेल',
    'register.phone': 'फोन',
    'register.dob': 'जन्म तिथि',
    'register.address': 'पता',
    'register.city': 'शहर',
    'register.submit': 'रजिस्टर करें',
    // Status
    'status.open': 'खुला',
    'status.closed': 'बंद',
    'status.available': 'उपलब्ध',
    'status.unavailable': 'उपलब्ध नहीं',

    // Chatbot
    'chatbot.title': 'सेहत सेतु सहायक',
    'chatbot.online': '🟢 ऑनलाइन',
    'chatbot.greeting': 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?',
    'chatbot.placeholder': 'मुझसे कुछ भी पूछें...',
    'chatbot.findHospitals': '🏥 अस्पताल खोजें',
    'chatbot.bookAppointment': '📅 नियुक्ति बुक करें',
    'chatbot.emergency': '🚨 आपातकालीन',
    'chatbot.healthTips': '💡 स्वास्थ्य सुझाव',
    
    // Enhanced Features
    'feature.appointment': '📅 नियुक्ति बुक करें',
    'feature.hospital': '🏥 अस्पताल खोजें',
    'feature.symptom': '🩺 लक्षण जांच',
    'feature.profile': '👤 मेरी प्रोफ़ाइल',
    'feature.myAppointments': '📋 मेरी नियुक्तियाँ',
    'feature.prescriptions': '💊 मेरे नुस्खे',
    'feature.insurance': '🛡️ बीमा जांच',
    'feature.emergency': '🚨 आपातकालीन',
    'feature.faq': '❓ FAQ',
    'feature.reviews': '⭐ समीक्षाएं',
    
    // Appointment Booking
    'appointment.book': 'नियुक्ति बुक करें',
    'appointment.selectDoctor': 'डॉक्टर चुनें',
    'appointment.selectDate': 'तारीख चुनें',
    'appointment.selectTime': 'समय चुनें',
    'appointment.confirm': 'बुकिंग की पुष्टि करें',
    'appointment.confirmed': 'नियुक्ति की पुष्टि हुई!',
    'appointment.cancelled': 'नियुक्ति रद्द की गई',
    
    // Hospital Search
    'hospital.search': 'अस्पताल खोजें',
    'hospital.searchCity': 'शहर या विशेषता से खोजें',
    'hospital.inCity': 'में',
    'hospital.rating': 'रेटिंग',
    'hospital.insurance': 'स्वीकार किया गया बीमा',
    'hospital.emergency24': '24/7 आपातकालीन',
    'hospital.noResults': 'कोई अस्पताल नहीं मिला',
    
    // Doctor Search
    'doctor.search': 'डॉक्टर खोजें',
    'doctor.bySpecialty': 'विशेषता के अनुसार खोजें',
    'doctor.experience': 'अनुभव',
    'doctor.consultation': 'परामर्श शुल्क',
    'doctor.reviews': 'समीक्षाएं',
    
    // Symptom Checker
    'symptom.describe': 'अपने लक्षणों का वर्णन करें',
    'symptom.recommended': 'अनुशंसित डॉक्टर',
    'symptom.specialists': 'आपकी स्थिति के लिए विशेषज्ञ',
    
    // Insurance
    'insurance.verify': 'बीमा सत्यापित करें',
    'insurance.provider': 'बीमा प्रदाता',
    'insurance.accepted': 'इन अस्पतालों में स्वीकार किया गया',
    'insurance.notFound': 'बीमा हमारे डेटाबेस में नहीं मिला',
    
    // User Profile
    'profile.name': 'नाम',
    'profile.email': 'ईमेल',
    'profile.phone': 'फोन',
    'profile.dob': 'जन्म की तारीख',
    'profile.bloodType': 'रक्त प्रकार',
    'profile.allergies': 'एलर्जी',
    'profile.update': 'प्रोफ़ाइल अपडेट करें',
    
    // Prescriptions
    'prescription.view': 'नुस्खे देखें',
    'prescription.doctor': 'डॉक्टर',
    'prescription.date': 'तारीख',
    'prescription.medicines': 'दवाएं',
    'prescription.dosage': 'खुराक',
    'prescription.noPrescriptions': 'कोई नुस्खे नहीं मिले',
    
    // Emergency
    'emergency.nearest': 'निकटतम आपातकालीन अस्पताल',
    'emergency.call': 'आपातकालीन कॉल करें',
    'emergency.directions': 'दिशाएं प्राप्त करें',
    'emergency.ambulance': 'एम्बुलेंस बुलाएं',
    
    // Reviews & Ratings
    'review.hospitalReviews': 'अस्पताल समीक्षाएं',
    'review.doctorReviews': 'डॉक्टर समीक्षाएं',
    'review.rating': 'रेटिंग',
    'review.totalReviews': 'समीक्षाएं',
    'review.writeReview': 'समीक्षा लिखें',

    // Login Page Translations
    'topBar': 'भारत के लिए एकीकृत स्वास्थ्य आईडी पोर्टल',
    'govMinistry': 'भारत सरकार',
    'govDept': 'स्वास्थ्य और परिवार कल्याण मंत्रालय',
    'portalName': 'राष्ट्रीय स्वास्थ्यसेवा प्रबंधन प्रणाली',
    'home': 'होम',
    'findHospitals': 'अस्पताल खोजें',
    'services': 'सेवाएं',
    'newsUpdates': 'समाचार और अपडेट',
    'faq': 'सामान्य प्रश्न',
    'contactUs': 'हमसे संपर्क करें',
    'latestUpdates': '🔔 नवीनतम अपडेट और सुविधाएं',
    'digitalHealthId': 'डिजिटल स्वास्थ्य आईडी',
    'digitalHealthIdDesc': 'निर्बाध स्वास्थ्यसेवा पहुंच के लिए अपनी अद्वितीय स्वास्थ्य पहचान प्राप्त करें',
    'hospitalNetwork': 'अस्पताल नेटवर्क',
    'hospitalNetworkDesc': 'भारत भर में 1000+ अस्पतालों तक पहुंच सत्यापित जानकारी के साथ',
    'medicalRecords': 'चिकित्सा रिकॉर्ड',
    'medicalRecordsDesc': 'आपके चिकित्सा इतिहास का सुरक्षित भंडारण और आसान पहुंच',
    'appointmentBooking': 'नियुक्ति बुकिंग',
    'appointmentBookingDesc': 'डॉक्टरों और अस्पतालों के साथ ऑनलाइन नियुक्तियां बुक करें',
    'totalHospitalsLabel': 'कुल अस्पताल',
    'totalDoctorsLabel': 'कुल डॉक्टर',
    'adminLogin': '🔐 एडमिन लॉगिन',
    'usernameLabel': 'उपयोगकर्ता नाम या ईमेल *',
    'passwordLabel': 'पासवर्ड *',
    'rememberMe': 'मुझे याद रखें',
    'forgotPassword': 'पासवर्ड भूल गए?',
    'loginNow': 'अभी लॉगिन करें',
    'newUser': 'नए उपयोगकर्ता?',
    'registerHere': 'यहां रजिस्टर करें',
    'importantLinks': '📋 महत्वपूर्ण लिंक',
    'termsConditions': 'शर्तें और शर्तें',
    'privacyPolicy': 'गोपनीयता नीति',
    'securityGuidelines': 'सुरक्षा दिशानिर्देश',
    'helpSupport': 'सहायता और समर्थन',
    'contactAdmin': 'एडमिन से संपर्क करें',
    'systemStatus': '✅ सिस्टम स्थिति',
    'allServicesOperational': 'सभी सेवाएं चल रही हैं',
    'databaseConnected': 'डेटाबेस कनेक्ट किया गया',
    'lastUpdated': 'अंतिम अपडेट: आज',
    'about': 'सेहत सेतु के बारे में',
    'aboutDesc': 'हमारे बारे में',
    'missionVision': 'मिशन और दृष्टिकोण',
    'achievements': 'उपलब्धियां',
    'mediaCenter': 'मीडिया केंद्र',
    'bookAppointment': 'नियुक्ति बुक करें',
    'healthId': 'स्वास्थ्य आईडी',

    // Patient Register page extended
    'register.patientDetails': 'रोगी विवरण',
    'register.fullNameLabel': 'पूरा नाम *',
    'register.fullNameHint': 'अपना कानूनी नाम दर्ज करें।',
    'register.dobLabel': 'जन्म तिथि *',
    'register.genderLabel': 'लिंग *',
    'register.select': 'चुनें',
    'register.genderFemale': 'महिला',
    'register.genderMale': 'पुरुष',
    'register.genderNonBinary': 'नॉन-बाइनरी',
    'register.genderPreferNot': 'बताना नहीं चाहते',
    'register.genderOther': 'अन्य',
    'register.bloodGroup': 'रक्त समूह',
    'register.unknown': 'अज्ञात',
    'register.phoneLabel': 'मोबाइल नंबर *',
    'register.phonePlaceholder': '10 अंकों का भारतीय नंबर',
    'register.phoneHint': 'उदाहरण: 9876543210',
    'register.streetAddress': 'गली का पता',
    'register.state': 'राज्य',
    'register.medicalInfo': 'चिकित्सीय जानकारी',
    'register.existingConditions': 'मौजूदा बीमारियां',
    'register.conditionsPlaceholder': 'जैसे: डायबिटीज, हाईपरटेंशन',
    'register.allergiesPlaceholder': 'जैसे: पेनिसिलिन, मूंगफली',
    'register.height': 'ऊंचाई (सेमी)',
    'register.weight': 'वजन (किग्रा)',
    'register.emergencyContact': 'आपातकालीन संपर्क',
    'register.relationship': 'संबंध',
    'register.relationshipPlaceholder': 'जैसे: पिता, जीवनसाथी',
    'register.preferences': 'प्राथमिकताएं',
    'register.deptGeneralMedicine': 'सामान्य चिकित्सा',
    'register.deptCardiology': 'हृदय रोग',
    'register.deptOrthopedics': 'हड्डी रोग',
    'register.deptPediatrics': 'बाल रोग',
    'register.deptGynecology': 'स्त्री रोग',
    'register.deptDermatology': 'त्वचा रोग',
    'register.preferredDoctor': 'पसंदीदा डॉक्टर',
    'register.optional': 'वैकल्पिक',
    'register.preferredDate': 'पसंदीदा तारीख',
    'register.preferredTime': 'पसंदीदा समय',
    'register.consent': 'मैं पुष्टि करता/करती हूं कि ऊपर दी गई जानकारी सही है और मेरी देखभाल के लिए मुझसे संपर्क किया जा सकता है।',
    'register.submitRegistration': 'पंजीकरण जमा करें',
    'register.backHome': 'होम पर वापस जाएं',
    'register.toastSuccess': '✅ पंजीकरण सफलतापूर्वक जमा हुआ। हम शीघ्र ही आपसे संपर्क करेंगे।',
    'register.requiredFields': 'कृपया सभी आवश्यक फ़ील्ड भरें',
    'register.registering': 'पंजीकरण हो रहा है...',
    'register.registrationFailed': 'पंजीकरण विफल',
    'register.registrationSuccessWithId': 'पंजीकरण सफल! आपका रोगी आईडी है:',
    'register.invalidPincode': 'कृपया वैध 6-अंकीय पिनकोड दर्ज करें',
    'register.futureDob': 'जन्म तिथि भविष्य की नहीं हो सकती',
    'register.invalidDob': 'कृपया वैध जन्म तिथि दर्ज करें',
  }
};

/**
 * Language Manager - Handle language switching and translations
 */
class LanguageManager {
  constructor() {
    this.currentLanguage = this.getSavedLanguage() || 'en';
    this.initializeLanguage();
  }

  /**
   * Get saved language from localStorage
   */
  getSavedLanguage() {
    return localStorage.getItem('sehatSetu_language');
  }

  /**
   * Save language to localStorage
   */
  saveLanguage(lang) {
    localStorage.setItem('sehatSetu_language', lang);
  }

  /**
   * Initialize language on page load
   */
  initializeLanguage() {
    this.applyLanguage(this.currentLanguage);
    this.updateLanguageButton();
  }

  /**
   * Get translation for a key
   */
  get(key, defaultValue = key) {
    const flatValue = translations[this.currentLanguage]?.[key];
    if (flatValue !== undefined) return flatValue;

    const keys = key.split('.');
    let value = translations[this.currentLanguage];

    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return value || defaultValue;
  }

  /**
   * Translate with placeholders
   * Example: translate('msg.count', {count: 5}) -> 'Showing 5 items'
   */
  translate(key, params = {}) {
    let text = this.get(key);

    for (let [paramKey, paramValue] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
    }

    return text;
  }

  /**
   * Switch language
   */
  switchLanguage(lang) {
    if (translations[lang]) {
      this.currentLanguage = lang;
      this.saveLanguage(lang);
      this.applyLanguage(lang);
      this.updateLanguageButton();
      location.reload(); // Reload to apply translations to all elements
    }
  }

  /**
   * Apply language to all translatable elements
   */
  applyLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      const translated = this.get(key);
      element.textContent = translated;
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.getAttribute('data-translate-placeholder');
      const translated = this.get(key);
      element.placeholder = translated;
    });

    document.querySelectorAll('[data-translate-title]').forEach(element => {
      const key = element.getAttribute('data-translate-title');
      const translated = this.get(key);
      element.title = translated;
    });

    // Set document language attribute
    document.documentElement.lang = lang;

    // Set RTL if needed (future enhancement for languages like Arabic)
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  /**
   * Update language button display
   */
  updateLanguageButton() {
    const langBtn = document.getElementById('languageBtn');
    if (langBtn) {
      langBtn.textContent = this.currentLanguage.toUpperCase();
      langBtn.setAttribute('data-current-lang', this.currentLanguage);
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages() {
    return Object.keys(translations);
  }
}

// Initialize on page load
let i18n;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n = new LanguageManager();
  });
} else {
  i18n = new LanguageManager();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LanguageManager, translations };
}
