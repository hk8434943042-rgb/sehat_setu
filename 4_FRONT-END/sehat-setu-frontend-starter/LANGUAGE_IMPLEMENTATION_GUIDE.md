
# Language System Implementation Guide

## Overview
Complete Hindi language support has been implemented for the Sehat Setu platform with an extensible framework for adding additional languages.

## Architecture

### Core Components

#### 1. **js/i18n.js** - Translation Manager
- `LanguageManager` class handles all translation operations
- Maintains translation dictionary for each language
- Persists user language preference to localStorage
- Applies translations to DOM elements with `data-translate` attributes

**Key Methods:**
```javascript
new LanguageManager()              // Initialize on page load
i18n.get(key)                     // Get single translation
i18n.translate(key, params)       // Get translation with substitution
i18n.switchLanguage(lang)         // Change language
i18n.applyLanguage(lang)          // Update DOM with translations
i18n.getSavedLanguage()           // Get user's saved preference
i18n.saveLanguage(lang)           // Save preference to localStorage
```

#### 2. **css/language-switcher.css** - Styling
- Responsive dropdown menu design
- Smooth animations and transitions
- Dark mode support
- Mobile-optimized styling

#### 3. **js/language-switcher.js** - UI Component
- Creates language switcher button and dropdown
- Handles user interactions
- Syncs UI with current language selection
- Provides flag icons (🇬🇧 🇮🇳)

## Files Modified/Created

### New Files (3)
| File | Lines | Purpose |
|------|-------|---------|
| `js/i18n.js` | 439 | Translation manager with dictionary |
| `css/language-switcher.css` | 100+ | Dropdown styling & animations |
| `js/language-switcher.js` | 120+ | UI component & event handling |

### Modified HTML Files (5)
All pages updated with:
- CSS link: `<link rel="stylesheet" href="css/language-switcher.css" />`
- Script tags: `<script src="js/i18n.js"></script>` & `<script src="js/language-switcher.js"></script>`
- `data-translate` attributes on translatable content

Files updated:
1. `index.html` - Home page
2. `hospital-list.html` - Hospital listing
3. `hospital-detail.html` - Hospital details
4. `patient-register.html` - Registration form
5. `services.html` - Services page

## Translation Dictionary Structure

### Format
```javascript
const translations = {
  en: {
    'key.subkey': 'English Text',
    'nav.home': 'Home',
    'hospitals.title': 'Hospitals'
  },
  hi: {
    'key.subkey': 'हिंदी पाठ',
    'nav.home': 'होम',
    'hospitals.title': 'अस्पताल'
  }
}
```

### Current Keys (100+)

#### Navigation (6 keys)
- `nav.home` - Home
- `nav.about` - About
- `nav.hospitals` - Hospitals
- `nav.services` - Services
- `nav.register` - Register
- `nav.contact` - Get In Touch

#### Home Page (8 keys)
- `home.badge`
- `home.title`
- `home.subtitle`
- `home.findHospital`
- `home.registerPatient`
- `home.ourServices`
- `home.about`
- `home.contact`

#### Hospitals Page (11 keys)
- `hospitals.title`
- `hospitals.subtitle`
- `hospitals.search`
- `hospitals.allTypes`
- `hospitals.private`
- `hospitals.government`
- `hospitals.emergencyAll`
- `hospitals.emergencyYes`
- `hospitals.emergencyNo`
- `hospitals.clear`
- `hospitals.useJson`
- `hospitals.upload`

#### Services Page (6 keys)
- `services.title`
- `services.subtitle`
- `services.opd.title`
- `services.opd.desc`
- `services.emergency.title`
- `services.emergency.desc`
- `services.diagnostics.title`
- `services.diagnostics.desc`

#### Patient Register (9 keys)
- `register.newPatient`
- `register.title`
- `register.subtitle`
- `register.fullName`
- `register.email`
- `register.phone`
- `register.dob`
- `register.address`
- `register.city`
- `register.submit`

#### Status Messages (9 keys)
- `msg.success`
- `msg.error`
- `msg.noData`
- `msg.tryAgain`
- `msg.addedFavorite`
- `msg.removedFavorite`
- `msg.shared`
- `msg.linkCopied`
- `msg.callConfirm`

#### Comparison Tools (10 keys)
- `compare.selectHospitals`
- `compare.selectTwo`
- `compare.maxThree`
- `compare.compareSelected`
- `compare.type`
- `compare.rating`
- `compare.specialties`
- `compare.doctors`
- `compare.treatments`
- `compare.insurance`

#### Days of Week (7 keys)
- `day.monday`
- `day.tuesday`
- `day.wednesday`
- `day.thursday`
- `day.friday`
- `day.saturday`
- `day.sunday`

#### Status States (4 keys)
- `status.open`
- `status.closed`
- `status.available`
- `status.unavailable`

## How to Use

### For End Users

1. **Find the Language Switcher**
   - Located in the navigation bar (top-right)
   - Shows globe icon with current language flag
   - Example: 🌐 🇬🇧

2. **Switch Languages**
   - Click the language button to open dropdown
   - Select desired language:
     - 🇬🇧 English
     - 🇮🇳 हिंदी (Hindi)
   - Page content updates instantly

3. **Preference Persistence**
   - Selected language is saved automatically
   - Preference persists across page navigations
   - Uses localStorage (no account needed)

### For Developers

## Adding a New Language

### Step 1: Add Translation Dictionary
Edit `js/i18n.js` and add language code to `translations` object:

```javascript
const translations = {
  en: { /* existing English keys */ },
  hi: { /* existing Hindi keys */ },
  es: { // Add Spanish
    'nav.home': 'Inicio',
    'nav.hospitals': 'Hospitales',
    'nav.services': 'Servicios',
    'nav.register': 'Registrarse',
    'nav.contact': 'Contacto',
    
    'home.badge': '100% Salud Garantizada',
    'home.title': 'Transformar el Futuro de la Atención Médica',
    'home.subtitle': 'Conectándote con atención médica de calidad',
    
    // Add all other translation keys...
  }
}
```

### Step 2: Update Language Switcher
Edit `js/language-switcher.js` and add flag to dropdown:

```javascript
updateActiveLanguage() {
  const languages = {
    'en': { flag: '🇬🇧', name: 'English' },
    'hi': { flag: '🇮🇳', name: 'हिंदी' },
    'es': { flag: '🇪🇸', name: 'Español' }  // Add this
  };
  
  // Update menu items
  Object.entries(languages).forEach(([lang, data]) => {
    const option = document.querySelector(`[data-lang="${lang}"]`);
    if (option) {
      option.textContent = `${data.flag} ${data.name}`;
    }
  });
}
```

### Step 3: Update HTML Structure (Optional for RTL languages)
If adding a right-to-left language (Arabic, Hebrew, etc.):

```javascript
// In LanguageManager.applyLanguage() method
const rtlLanguages = ['ar', 'he', 'ur'];
if (rtlLanguages.includes(lang)) {
  document.documentElement.dir = 'rtl';
} else {
  document.documentElement.dir = 'ltr';
}
```

## Translation Keys - Best Practices

### Naming Convention
- Use dot notation: `section.subsection.key`
- All lowercase with dots for hierarchy
- Examples:
  - ✅ `nav.home`
  - ✅ `hospital.detail.address`
  - ❌ `NavHome`
  - ❌ `hospital_detail.address`

### Key Organization
```javascript
// Group related keys
'nav.home': '...',
'nav.hospitals': '...',
'nav.services': '...',

'home.title': '...',
'home.subtitle': '...',

'hospitals.title': '...',
'hospitals.search': '...'
```

### HTML Usage
```html
<!-- Simple translation -->
<h1 data-translate="home.title">Page Title</h1>

<!-- For form inputs (placeholder) -->
<input data-translate-placeholder="hospitals.search" placeholder="Search...">

<!-- For attributes (title) -->
<button data-translate-title="msg.callConfirm" title="Call Hospital?">Call</button>

<!-- For dynamic content -->
<span id="result">Loading...</span>
<script>
  document.getElementById('result').textContent = i18n.get('hospitals.title');
</script>
```

## Testing Translations

### Unit Testing (Optional)
```javascript
// Test if translation exists
const testKey = 'nav.home';
console.assert(i18n.get(testKey), `Missing translation: ${testKey}`);

// Test language switching
i18n.switchLanguage('hi');
console.assert(i18n.getCurrentLanguage() === 'hi', 'Language not switched');

// Test persistence
i18n.saveLanguage('en');
const saved = i18n.getSavedLanguage();
console.assert(saved === 'en', 'Language not saved');
```

### Manual Testing
1. Open any page
2. Click language switcher
3. Select different language
4. Verify all content translates
5. Navigate between pages
6. Check language preference persists
7. Refresh page - language should remain

## Performance Considerations

### Optimizations
- ✅ Translations loaded from single JS file
- ✅ No network requests needed
- ✅ Cached in browser memory
- ✅ localStorage for persistence (5MB limit)
- ✅ Minimal DOM operations

### Bundle Size
- `i18n.js`: ~5KB (439 lines)
- `language-switcher.js`: ~3KB (120 lines)
- `language-switcher.css`: ~2KB (100 lines)
- **Total**: ~10KB (minified & gzipped: ~2-3KB)

## Troubleshooting

### Language Not Switching
1. Check browser console for errors
2. Verify localStorage is enabled
3. Clear browser cache and refresh
4. Check if `i18n.js` is loaded (check Network tab)

### Translations Not Appearing
1. Verify `data-translate` attribute has correct key name
2. Check if key exists in `translations` object
3. Ensure `language-switcher.js` is loaded
4. Check that DOM elements exist on page load

### LocalStorage Not Working
1. Check if private/incognito browsing mode
2. Check browser localStorage quota
3. Verify cookies/storage are not blocked
4. Try different browser

## Future Enhancements

### Planned Features
- [ ] Automatic language detection based on browser settings
- [ ] Regional variants (e.g., `en-US` vs `en-GB`)
- [ ] Lazy loading for language packs
- [ ] Translation caching optimization
- [ ] Pluralization support
- [ ] Date/time localization
- [ ] Currency formatting
- [ ] Language-specific CSS (font, spacing adjustments)

### Additional Languages to Consider
- Spanish (es) - Large user base
- Gujarati (gu) - Common in India
- Tamil (ta) - Widely spoken
- Bengali (bn) - Most speakers globally
- Marathi (mr) - Growing market
- Urdu (ur) - Pakistan & India

## Resources

### Documentation Files
- `LANGUAGE_SETUP.html` - Visual setup verification
- `js/i18n.js` - Implementation details in comments
- `js/language-switcher.js` - Component documentation

### Learning Resources
- [W3C Internationalization](https://www.w3.org/International/)
- [MDN: Localization and Internationalization](https://developer.mozilla.org/en-US/docs/Glossary/Internationalization_(i18n))
- [Best Practices for i18n](https://phrase.com/blog/posts/internationalizing-web-apps/)

## Support

For issues or questions:
1. Check console for JavaScript errors
2. Review the implementation files with comments
3. Test with simple translations first
4. Verify DOM structure with devtools

---

**Version**: 1.0  
**Last Updated**: March 2, 2026  
**Status**: Production Ready ✓
