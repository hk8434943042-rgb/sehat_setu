/**
 * Language Switcher UI Component
 * Handles the dropdown menu and language selection
 */

class LanguageSwitcher {
  constructor() {
    this.initializeUI();
    this.setupEventListeners();
  }

  /**
   * Initialize the language switcher UI
   */
  initializeUI() {
    // Find or create the switcher container
    let switcherContainer = document.querySelector('.language-switcher');

    if (!switcherContainer) {
      // Find the navigation area
      const nav = document.querySelector('.nav') || document.querySelector('nav');
      if (nav) {
        switcherContainer = document.createElement('div');
        switcherContainer.className = 'language-switcher';
        nav.appendChild(switcherContainer);
      } else {
        // Create at document body if no nav found
        switcherContainer = document.createElement('div');
        switcherContainer.className = 'language-switcher';
        document.body.insertAdjacentElement('afterbegin', switcherContainer);
      }
    }

    // Clear any existing content
    switcherContainer.innerHTML = `
      <button id="languageBtn" class="language-btn" title="Switch Language">
        <span class="flag">🌐</span>
        <span>EN</span>
      </button>
      <div class="language-menu" id="languageMenu">
        <button class="language-option" data-lang="en">
          <span class="flag">🇬🇧</span>
          English
        </button>
        <button class="language-option" data-lang="hi">
          <span class="flag">🇮🇳</span>
          हिंदी (Hindi)
        </button>
      </div>
    `;
  }

  /**
   * Setup event listeners for language switcher
   */
  setupEventListeners() {
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    const languageOptions = document.querySelectorAll('.language-option');

    if (!languageBtn || !languageMenu) return;

    // Toggle menu on button click
    languageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      languageMenu.classList.toggle('active');
      languageBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-switcher')) {
        languageMenu.classList.remove('active');
        languageBtn.classList.remove('active');
      }
    });

    // Handle language selection
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = option.getAttribute('data-lang');

        // Update active state
        languageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        // Switch language
        if (i18n) {
          i18n.switchLanguage(selectedLang);
        }

        // Close menu
        languageMenu.classList.remove('active');
        languageBtn.classList.remove('active');
      });
    });

    // Set initial active state
    this.updateActiveLanguage();
  }

  /**
   * Update which language is marked as active
   */
  updateActiveLanguage() {
    if (!i18n) return;

    const currentLang = i18n.getCurrentLanguage();
    const languageOptions = document.querySelectorAll('.language-option');

    languageOptions.forEach(option => {
      const lang = option.getAttribute('data-lang');
      if (lang === currentLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
}

// Initialize switcher when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
  });
} else {
  new LanguageSwitcher();
}
