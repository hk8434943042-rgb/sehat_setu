# 🌍 Language Support System - Sehat Setu

Complete documentation for the multi-language support system enabling users to switch between English and Hindi (हिंदी).

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [System Architecture](#system-architecture)
3. [How It Works](#how-it-works)
4. [Adding Translations](#adding-translations)
5. [Adding New Languages](#adding-new-languages)
6. [Implementation Details](#implementation-details)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

The language system is **already fully integrated**. Users can:

1. **Click the language switcher** (globe icon 🌐 in the navigation bar)
2. **Select their preferred language** (English 🇬🇧 or Hindi 🇮🇳)
3. **Watch the page translate instantly** (page reloads with new language)
4. **Language choice is saved** automatically in browser storage

### What Gets Translated?

✅ Navigation menus
✅ Page titles and headings
✅ Form labels and placeholders
✅ Button text
✅ Helper text
✅ Section headers
✅ Descriptions

---

## 🏗️ System Architecture

### File Structure

```
4_FRONT-END/sehat-setu-frontend-starter/
├── js/
│   ├── i18n.js                  # Core translation manager (200+ lines)
│   └── language-switcher.js     # UI component for language selection (120+ lines)
├── css/
│   └── language-switcher.css    # Dropdown switcher styling (100+ lines)
├── index.html                   # Home page (updated)
├── hospital-list.html           # Hospital listing (updated)
├── hospital-detail.html         # Hospital details (updated)
├── patient-register.html        # Registration form (updated)
├── services.html                # Services page (updated)
└── LANGUAGE_SYSTEM.md          # This file
```

### Core Components

#### 1. **js/i18n.js** - Translation Engine
- **Class**: `LanguageManager`
- **Responsibility**: Manage translations, language switching, persistence
- **Features**:
  - Translation dictionary with 100+ keys per language
  - LocalStorage persistence of language preference
  - DOM translation system using data attributes
  - Automatic initialization on page load

#### 2. **js/language-switcher.js** - UI Component
- **Class**: `LanguageSwitcher`
- **Responsibility**: Create and manage the language selection dropdown
- **Features**:
  - Dropdown menu with language options
  - Flag icons (🇬🇧 English, 🇮🇳 हिंदी)
  - Event handlers for language switching
  - Active state highlighting
  - Auto-initialization on page load

#### 3. **css/language-switcher.css** - Styling
- `.language-switcher` - Container
- `.language-btn` - Main toggle button
- `.language-menu` - Dropdown menu (hidden/shown with JavaScript)
- `.language-option` - Individual language choices
- Responsive design for mobile/desktop
- Dark mode support
- Smooth animations

### HTML Integration

All HTML pages have been updated with:

```html
<!-- In <head> -->
<link rel="stylesheet" href="css/language-switcher.css" />

<!-- Before closing </body> -->
<script src="js/i18n.js"></script>
<script src="js/language-switcher.js"></script>

<!-- On translatable content -->
<h1 data-translate="home.title">...</h1>
<input data-translate-placeholder="form.email" />
```

---

## ⚙️ How It Works

### 1. Page Load Flow

```
Page Loads
    ↓
i18n.js loads → LanguageManager initializes
    ↓
Reads saved language from LocalStorage
    ↓
Applies saved language (or defaults to English)
    ↓
language-switcher.js loads → LanguageSwitcher initializes
    ↓
Creates language dropdown UI
    ↓
Translates all [data-translate] elements
    ↓
Page ready with selected language
```

### 2. Language Switching Flow

```
User clicks language button
    ↓
Menu toggles (shows/hides)
    ↓
User selects language
    ↓
LanguageManager.switchLanguage(lang) called
    ↓
Language saved to LocalStorage
    ↓
Page reloads with new language
    ↓
All content appears in selected language
```

### 3. Translation Process

Each HTML element with `data-translate` attribute gets translated:

```javascript
// Element in HTML
<h1 data-translate="home.title">Default Text</h1>

// LanguageManager has translation:
{
  en: { "home.title": "Welcome to Sehat Setu" },
  hi: { "home.title": "Sehat Setu में आपका स्वागत है" }
}

// After translation:
<h1 data-translate="home.title">Welcome to Sehat Setu</h1>  // English
<h1 data-translate="home.title">Sehat Setu में आपका स्वागत है</h1>  // Hindi
```

---

## 📝 Adding Translations

### Step 1: Identify Content to Translate

In your HTML, add the `data-translate` attribute to any element you want translated:

```html
<!-- For regular text content -->
<h1 data-translate="unique.key">Default English Text</h1>

<!-- For input placeholders -->
<input data-translate-placeholder="form.emailPlaceholder" placeholder="Enter email" />

<!-- For button text -->
<button data-translate="buttons.submit">Submit</button>
```

### Step 2: Create Translation Key

Follow this naming convention:
- `section.feature`: e.g., `home.title`, `form.email`, `buttons.submit`
- Use camelCase for multi-word keys
- Keep keys descriptive

### Step 3: Add to Translation Dictionary

Edit `js/i18n.js` and add to the translations object:

```javascript
// Find this in i18n.js:
const translations = {
  en: {
    // Existing translations...
    "myFeature.myKey": "English text here",
  },
  hi: {
    // Existing translations...
    "myFeature.myKey": "यहाँ हिंदी पाठ",
  }
};
```

### Example: Adding Hospital Rating Translation

**HTML:**
```html
<span data-translate="hospital.rating">Rating</span>
```

**Add to i18n.js:**
```javascript
const translations = {
  en: {
    "hospital.rating": "Rating",
  },
  hi: {
    "hospital.rating": "रेटिंग",
  }
};
```

### Current Translation Keys

#### Navigation (nav.*)
- `nav.home` - Home
- `nav.about` - About
- `nav.services` - Services
- `nav.hospitals` - Hospitals
- `nav.register` - Register
- `nav.contact` - Get In Touch

#### Home Page (home.*)
- `home.badge` - 100% Health Guaranteed
- `home.title` - Page title
- `home.subtitle` - Page subtitle

#### Hospital List (hospitals.*)
- `hospitals.title` - Page title
- `hospitals.subtitle` - Page subtitle
- `hospitals.search` - Search placeholder
- `hospitals.allTypes` - All Types option
- `hospitals.private` - Private option
- `hospitals.government` - Government option
- `hospitals.emergencyAll` - Emergency (All) option
- `hospitals.emergencyYes` - Emergency: Yes option
- `hospitals.emergencyNo` - Emergency: No option
- `hospitals.clear` - Clear button
- `hospitals.useJson` - Use JSON label
- `hospitals.upload` - Upload CSV button

#### Patient Register (register.*)
- `register.newPatient` - New Patient badge
- `register.title` - Page title
- `register.subtitle` - Page subtitle

#### Services (services.*)
- `services.title` - Page title
- `services.subtitle` - Page subtitle

#### Form (form.*)
- Form field labels and placeholders

#### Buttons (buttons.*)
- Common button labels

---

## 🌐 Adding New Languages

### Step 1: Add Language to UI

Edit `js/language-switcher.js`, in the `initializeUI()` method:

```javascript
// Find this section:
const languageMenu = document.createElement('div');
languageMenu.className = 'language-menu';
languageMenu.innerHTML = `
  <button class="language-option" data-lang="en">🇬🇧 English</button>
  <button class="language-option" data-lang="hi">🇮🇳 हिंदी</button>
  <!-- ADD YOUR LANGUAGE HERE -->
  <button class="language-option" data-lang="fr">🇫🇷 Français</button>
`;
```

### Step 2: Add Translation Dictionary

Edit `js/i18n.js` and add new language to translations:

```javascript
const translations = {
  en: { /* existing English translations */ },
  hi: { /* existing Hindi translations */ },
  fr: {  // NEW LANGUAGE
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    // ... add all keys
  }
};
```

### Step 3: Update Language List

In `js/i18n.js`, update the languages array:

```javascript
const LANGUAGES = ['en', 'hi', 'fr'];
```

### Step 4: Add Flag Icon (Optional)

Choose an appropriate flag emoji for your language. Update in language-switcher.js:

```javascript
// Flag emojis for each language
const flagEmojis = {
  'en': '🇬🇧',
  'hi': '🇮🇳',
  'fr': '🇫🇷'  // NEW
};
```

### Step 5: Add RTL Support (if needed)

For right-to-left languages like Arabic, add to `js/i18n.js`:

```javascript
const RTL_LANGUAGES = ['ar', 'ur', 'he'];

switchLanguage(lang) {
  // ... existing code ...
  
  // Set text direction
  if (RTL_LANGUAGES.includes(lang)) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  
  // ... rest of method ...
}
```

---

## 🔧 Implementation Details

### LocalStorage

Language preference is saved as:
```javascript
localStorage.setItem('sehat-setu-language', 'hi');
```

Retrieved on page load to show user's last selected language.

### DOM Translation

The system finds all elements with `data-translate` attributes:

```javascript
// Pseudo-code from LanguageManager.applyLanguage()
document.querySelectorAll('[data-translate]').forEach(el => {
  const key = el.getAttribute('data-translate');
  const translation = translations[currentLanguage][key];
  el.textContent = translation || key; // Fallback to key if not found
});
```

### Placeholder Translation

For form inputs, uses `data-translate-placeholder`:

```javascript
document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
  const key = el.getAttribute('data-translate-placeholder');
  const translation = translations[currentLanguage][key];
  el.placeholder = translation || '';
});
```

### Page Reload

Language switch triggers a full page reload:

```javascript
// After saving new language
location.reload();
```

This ensures:
- All JavaScript re-executes with new language
- All elements re-translate
- Consistent state across page

---

## 🐛 Troubleshooting

### Issue: Language doesn't change

**Possible causes:**
1. Scripts not loading - Check browser console for errors
2. Wrong data-translate key - Verify key exists in translation dictionary
3. LocalStorage disabled - Enable localStorage in browser settings

**Solution:**
```javascript
// Test in browser console:
console.log(window.languageManager); // Should exist
console.log(window.languageManager.get('nav.home')); // Should return translation
```

### Issue: Text shows as key instead of translation

**Example:** Instead of "Home", page shows "nav.home"

**Cause:** Key doesn't exist in translation dictionary

**Solution:**
1. Check i18n.js for the key
2. Add missing key to both language objects
3. Verify spelling matches exactly

### Issue: Switcher doesn't appear

**Possible causes:**
1. CSS file not loading - Check Network tab in DevTools
2. JavaScript error preventing initialization - Check console

**Solution:**
```html
<!-- Verify these are present in HTML head -->
<link rel="stylesheet" href="css/language-switcher.css" />

<!-- Verify these are at bottom of HTML body -->
<script src="js/i18n.js"></script>
<script src="js/language-switcher.js"></script>
```

### Issue: Language resets on page reload

**Cause:** LocalStorage not saving properly

**Solution:**
```javascript
// Check if localStorage works:
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Should print "value"
```

If disabled:
1. Browser settings → Privacy → Allow localStorage
2. Not in private/incognito mode
3. Not accessing from file:// (use local server)

---

## 📚 Best Practices

1. **Keep translations concise** - Shorter text fits better in UI
2. **Use consistent terminology** - Same terms for same concepts
3. **Test both languages** - Check layout doesn't break
4. **Add context in keys** - Use descriptive names
5. **Handle special characters** - Hindi and other scripts work fine
6. **Test on mobile** - Language switcher should be accessible
7. **Document new keys** - Update this guide when adding translations

---

## 🎯 Common Use Cases

### Adding a new form field translation

```html
<!-- HTML -->
<label for="phone" data-translate="form.phone">Phone Number</label>
<input id="phone" type="tel" data-translate-placeholder="form.phonePlaceholder" placeholder="Enter phone" />
```

```javascript
// i18n.js
"form.phone": "Phone Number",
"form.phonePlaceholder": "Enter phone",

// Hindi
"form.phone": "फोन नंबर",
"form.phonePlaceholder": "फोन दर्ज करें",
```

### Adding a dynamic translation

```javascript
// If you need translation in JavaScript:
const message = languageManager.get('messages.welcome');
console.log(message); // "Welcome!" or "स्वागत है!"
```

### Checking current language

```javascript
const currentLang = languageManager.currentLanguage;
console.log(currentLang); // 'en' or 'hi'
```

---

## 📞 Support

For issues or questions:
1. Check the **Troubleshooting** section above
2. Verify script tags are present in HTML
3. Check browser console for errors (F12 → Console tab)
4. Ensure localStorage is enabled

---

## 📄 License

This language system is part of the Sehat Setu project.

---

**Last Updated:** 2024
**System Version:** 1.0
**Languages Supported:** English (en), Hindi (hi)
**Framework:** Vanilla JavaScript
