# 🧪 Language Support - Testing Guide

Quick testing guide to verify Hindi language switching works correctly.

## ⚡ Quick Test (5 Minutes)

### Step 1: Open the Website
1. Start your local server (e.g., `python -m http.server 8000`)
2. Navigate to `http://localhost:8000/4_FRONT-END/sehat-setu-frontend-starter/index.html`

### Step 2: Look for Language Switcher
- ✅ See 🌐 icon in the top navigation bar
- ✅ Icon appears next to the theme toggle button
- ✅ Located in the right side of the navbar

### Step 3: Click and Switch Language
1. **Click the 🌐 icon**
   - A dropdown menu should appear
   - Shows "🇬🇧 English" and "🇮🇳 हिंदी" options

2. **Click on "🇮🇳 हिंदी"**
   - Page reloads
   - Content changes to Hindi
   - All visible text should be in Hindi

3. **Verify Translation**
   - Navigation: "घर", "परिचय", "सेवाएँ", "अस्पताल", "रजिस्टर करें"
   - Buttons: Text in Hindi
   - Labels: All translated
   - ✅ If this works, language system is functioning!

### Step 4: Switch Back to English
1. **Click 🇮🇳 flag icon** in navbar
2. **Click "🇬🇧 English"**
3. **Verify content switches back to English**

### Step 5: Test Persistence
1. **Select Hindi language** (if not already)
2. **Close the browser tab completely**
3. **Reopen the site**
4. **Expected:** Site loads in Hindi automatically
5. ✅ If it remembers Hindi, persistence works!

---

## 🔬 Detailed Testing

### Test Case 1: Language Switcher Visibility
**Objective:** Verify the language switcher appears on all pages

| Page | Path | Expected | Result |
|------|------|----------|--------|
| Home | index.html | 🌐 icon visible | ✅ |
| Hospitals | hospital-list.html | 🌐 icon visible | ✅ |
| Hospital Detail | hospital-detail.html | 🌐 icon visible | ✅ |
| Patient Register | patient-register.html | 🌐 icon visible | ✅ |
| Services | services.html | 🌐 icon visible | ✅ |

### Test Case 2: English Translations
**Objective:** Verify English content displays correctly

```
Navigate to: index.html
Select Language: English (if not default)
Check these elements:

□ Navigation "Home"
□ Navigation "About"
□ Navigation "Services"
□ Navigation "Hospitals"
□ Navigation "Register"
□ Navigation "Get In Touch"
□ Page title (if visible)
□ Buttons and links

All should display in English ✅
```

### Test Case 3: Hindi Translations
**Objective:** Verify Hindi content displays correctly

```
Navigate to: index.html
Select Language: Hindi (🇮🇳)

Wait for page reload

Check these elements:

□ Navigation "घर" (Home)
□ Navigation "परिचय" (About)
□ Navigation "सेवाएँ" (Services)
□ Navigation "अस्पताल" (Hospitals)
□ Navigation "रजिस्टर करें" (Register)
□ Navigation "संपर्क में आएं" (Get In Touch)
□ Page title (if visible)
□ Buttons and links

All should display in Hindi with proper Unicode characters ✅
```

### Test Case 4: Language Persistence
**Objective:** Verify selected language is saved

```
Step 1: Select Hindi
- Click language switcher
- Select 🇮🇳 हिंदी
- Wait for page reload

Step 2: Verify in Browser Storage
- Open DevTools (F12)
- Go to Application → LocalStorage
- Look for key: 'sehat-setu-language'
- Value should be: 'hi'
✅ Key and value exist

Step 3: Hard Refresh
- Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Clear cache
- Page reloads

Step 4: Verify
- Page should load in Hindi
✅ Language persisted and loaded

Step 5: Close and Reopen
- Close browser completely
- Reopen site in new browser window
- Page should still be in Hindi
✅ Persistence survived browser restart
```

### Test Case 5: Dropdown Menu Behavior
**Objective:** Verify menu opens/closes correctly

```
Click language button:
□ Menu appears below button
□ Shows English and Hindi options
□ Menu has smooth slide-down animation

Click English:
□ Menu closes
□ Page reloads

Click language button again:
□ Menu appears again (properly)

Click Hindi:
□ Menu closes
□ Page reloads in Hindi

Click outside menu:
□ Menu closes (if this feature added)
```

### Test Case 6: Mobile Responsiveness
**Objective:** Verify language switcher works on mobile

```
Using DevTools Device Emulation:

□ Open DevTools (F12)
□ Toggle Device Toolbar (Ctrl+Shift+M)
□ Select mobile device (iPhone 12, Pixel 5, etc.)
□ Language switcher visible
□ Click switcher - menu appears
□ Select language - works correctly
□ Text is readable (not cut off)
□ Layout doesn't break

Test on different screens:
□ iPhone (375px)
□ iPad (768px)
□ Desktop (1920px)

All should work without horizontal scrolling ✅
```

### Test Case 7: Dark Mode Compatibility
**Objective:** Verify language switcher works with dark theme

```
Step 1: Switch to Dark Mode
- Click theme toggle button (🌙)
- Page should switch to dark theme

Step 2: Language Switcher in Dark Mode
□ Switcher button visible
□ Colors readable (good contrast)
□ Dropdown menu visible
□ Menu items readable

Step 3: Switch Language in Dark Mode
- Click language switcher
- Select language
- Works correctly in dark theme ✅

Step 4: Switch Back to Light Mode
- Click theme toggle
- Switch to light theme
- Language switcher still works ✅
```

### Test Case 8: All Pages - Hindi Support
**Objective:** Verify Hindi works on every page

| Page | Action | Expected | Result |
|------|--------|----------|--------|
| index.html | Select Hindi | Content in Hindi | ✅ |
| hospital-list.html | Select Hindi | Content in Hindi | ✅ |
| hospital-detail.html | Select Hindi | Content in Hindi | ✅ |
| patient-register.html | Select Hindi | Content in Hindi | ✅ |
| services.html | Select Hindi | Content in Hindi | ✅ |

### Test Case 9: Form Labels & Placeholders
**Objective:** Verify form elements translate

```
Navigate to: patient-register.html
Select Language: Hindi

Check these form elements:
□ Field labels appear in Hindi
□ Input placeholders in Hindi (if implemented)
□ Form validation messages in Hindi
□ Button labels in Hindi

Repeat for: hospital-list.html filters
```

### Test Case 10: Browser Compatibility
**Objective:** Test on different browsers

```
Test on:
□ Chrome/Chromium
□ Firefox
□ Safari
□ Edge

For each browser:
✓ Language switcher visible
✓ Menu opens/closes
✓ Languages switch correctly
✓ Persistence works
✓ No JavaScript errors in console
```

---

## 🐛 Common Issues & Solutions

### Issue: Language Switcher Not Visible

**Symptom:** No 🌐 icon in navigation

**Diagnosis:**
```javascript
// Open DevTools Console (F12 → Console)
console.log(window.languageManager); // Should not be undefined
console.log(window.languageSwitcher); // Should not be undefined
```

**Solutions:**
1. Check if scripts are loading:
   ```html
   <!-- View Page Source (Ctrl+U) and look for: -->
   <script src="js/i18n.js"></script>
   <script src="js/language-switcher.js"></script>
   ```

2. Check browser console for errors:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages
   - Fix any syntax errors

3. Verify file paths:
   - Ensure files exist at `js/i18n.js` and `js/language-switcher.js`
   - Check relative paths are correct

### Issue: Language Switcher Shows But Doesn't Work

**Symptom:** Click does nothing or page doesn't reload

**Diagnosis:**
```javascript
// In Console:
window.languageManager.switchLanguage('hi');
// Should log: "Language switched to: hi"
```

**Solutions:**
1. Check for JavaScript errors in console
2. Verify LocalStorage is enabled
3. Try in a private/incognito window (no tracking prevention)
4. Clear browser cache and reload

### Issue: Hindi Text Shows as Boxes or ? Marks

**Symptom:** Hindi shows as □□□□ or ????

**Cause:** Font doesn't support Hindi characters

**Solutions:**
1. Check CSS has proper font:
   ```css
   body {
     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
   }
   ```

2. Google Fonts includes Indian scripts:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" rel="stylesheet">
   ```

3. Add fallback for Indian scripts:
   ```css
   [lang="hi"], [data-lang="hi"] {
     font-family: 'Noto Sans Devanagari', sans-serif;
   }
   ```

### Issue: Missing Translations

**Symptom:** Text shows as "nav.home" instead of "Home"

**Cause:** Translation key not in dictionary

**Solution:**
1. Check key exists in `js/i18n.js`:
   ```javascript
   // Look for this in translations object:
   "nav.home": "Home",
   ```

2. If missing, add it:
   ```javascript
   en: {
     "nav.home": "Home",
   },
   hi: {
     "nav.home": "घर",
   }
   ```

### Issue: Language Doesn't Persist

**Symptom:** Language resets when closing browser

**Diagnosis:**
```javascript
// In Console:
localStorage.getItem('sehat-setu-language');
// Should return: 'en' or 'hi'
```

**Solutions:**
1. Check if in private/incognito mode (localStorage disabled)
2. Browser settings may have storage disabled
3. Try clearing cache: DevTools → Network → "Disable cache" unchecked

### Issue: Page Takes Long to Translate

**Symptom:** Language switches but translation is slow

**Cause:** Large DOM or too many translatable elements

**Solutions:**
1. Check number of [data-translate] elements
2. Optimize translation dictionary (remove unused keys)
3. Profile in DevTools Performance tab

---

## ✅ Final Validation Checklist

Before considering the feature complete, verify:

- [ ] Language switcher visible on all 5 pages
- [ ] Can switch from English to Hindi and back
- [ ] All navigation items translate
- [ ] Page titles and headings translate
- [ ] Form labels translate
- [ ] Buttons translate
- [ ] Selected language persists after page refresh
- [ ] Selected language persists after browser restart
- [ ] Works on mobile devices
- [ ] Works in dark mode
- [ ] No JavaScript errors in console
- [ ] No missing translations (no keys showing in UI)
- [ ] Text is readable (proper font, contrast)
- [ ] Responsive on all screen sizes

**All checkboxes passing?** ✅ **Language system is production-ready!**

---

## 📊 Performance Benchmarks

Expected performance metrics:

```
Language Switch Time: < 1 second (includes page reload)
Translation Apply Time: < 100ms
Memory Usage: < 100KB
LocalStorage Usage: < 1KB
```

Test with DevTools:
1. Open Network tab (F12 → Network)
2. Toggle language
3. Check "page reload" time
4. Should be fast (same as normal page load)

---

## 🎯 Test Automation (Optional)

For automated testing, you can add Selenium/Cypress tests:

```javascript
// Example Cypress test
describe('Language Switcher', () => {
  it('Should switch to Hindi', () => {
    cy.visit('index.html');
    cy.get('[data-lang="hi"]').click();
    cy.get('h1[data-translate="home.title"]')
      .should('contain', 'Sehat Setu');
  });

  it('Should persist language', () => {
    cy.visit('index.html');
    cy.get('[data-lang="hi"]').click();
    cy.reload();
    cy.window().then(win => {
      expect(win.languageManager.currentLanguage).to.equal('hi');
    });
  });
});
```

---

## 📞 Test Report Template

Use this when reporting issues:

```
TEST REPORT
============

Date: [Date]
Page: [index.html / hospital-list.html / etc]
Browser: [Chrome / Firefox / Safari]
OS: [Windows / Mac / Linux / iOS / Android]

Issue: [What's not working?]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected: [What should happen?]

Actual: [What actually happened?]

Screenshots: [If applicable]

Console Errors: [Any errors from F12 → Console?]

LocalStorage: [Check if 'sehat-setu-language' exists?]

Resolution: [What fixed it, if found?]
```

---

**Happy Testing! 🎉**

If all tests pass, the language support system is ready for production use!
