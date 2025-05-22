// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Language selection elements
    const languageModal = document.getElementById('languageModal');
    const englishBtn = document.getElementById('englishBtn');
    const polishBtn = document.getElementById('polishBtn');
    const mainContent = document.getElementById('mainContent');
    const switchToEnglish = document.getElementById('switchToEnglish');
    const switchToPolish = document.getElementById('switchToPolish');
    
    // Current language (default to English)
    let currentLanguage = 'en';
    
    // Audio elements for sound effects
    const clickSound = new Audio('sounds/click.mp3');
    const hoverSound = new Audio('sounds/hover.mp3');
    const powerSound = new Audio('sounds/power-up.mp3');
    
    // Set volume for sounds
    clickSound.volume = 0.3;
    hoverSound.volume = 0.2;
    powerSound.volume = 0.4;
    
    // Initialize the website
    initWebsite();
    
    function initWebsite() {
        // Check if language is already selected (in localStorage)
        const savedLanguage = localStorage.getItem('warhammerLanguage');
        
        if (savedLanguage) {
            // Hide modal and show content
            languageModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
            currentLanguage = savedLanguage;
            updateLanguage(savedLanguage);
            
            // Play welcome sound
            powerSound.play();
            
            // Show welcome message in selected language
            showWelcomeMessage(savedLanguage);
        } else {
            // Show language selection modal
            languageModal.classList.remove('hidden');
            mainContent.classList.add('hidden');
        }
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize scroll effects
        initScrollEffects();
        
        // Initialize interactive elements
        initInteractiveElements();
    }
    
    function setupEventListeners() {
        // Language selection buttons
        englishBtn.addEventListener('click', function() {
            clickSound.play();
            selectLanguage('en');
        });
        
        polishBtn.addEventListener('click', function() {
            clickSound.play();
            selectLanguage('pl');
        });
        
        // Language switcher in navigation
        switchToEnglish.addEventListener('click', function() {
            clickSound.play();
            switchLanguage('en');
        });
        
        switchToPolish.addEventListener('click', function() {
            clickSound.play();
            switchLanguage('pl');
        });
        
        // Add hover sound to all buttons and links
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                clickSound.play();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const nav = document.querySelector('.main-nav');
                    nav.classList.remove('mobile-open');
                }
            });
        });
    }
    
    function selectLanguage(language) {
        currentLanguage = language;
        
        // Save to localStorage
        localStorage.setItem('warhammerLanguage', language);
        
        // Hide modal and show content
        languageModal.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Update all text to selected language
        updateLanguage(language);
        
        // Play power up sound
        powerSound.play();
        
        // Show welcome message
        showWelcomeMessage(language);
    }
    
    function switchLanguage(language) {
        if (currentLanguage !== language) {
            currentLanguage = language;
            localStorage.setItem('warhammerLanguage', language);
            updateLanguage(language);
            
            // Create visual effect
            const languageChangeEffect = document.createElement('div');
            languageChangeEffect.className = 'language-change-effect';
            document.body.appendChild(languageChangeEffect);
            
            setTimeout(() => {
                languageChangeEffect.remove();
            }, 1000);
        }
    }
    
    function updateLanguage(language) {
        // Update all elements with data-en and data-pl attributes
        const elements = document.querySelectorAll('[data-en], [data-pl]');
        
        elements.forEach(element => {
            if (language === 'en') {
                if (element.hasAttribute('data-en')) {
                    element.textContent = element.getAttribute('data-en');
                }
            } else if (language === 'pl') {
                if (element.hasAttribute('data-pl')) {
                    element.textContent = element.getAttribute('data-pl');
                }
            }
        });
        
        // Update active language button style
        if (language === 'en') {
            switchToEnglish.classList.add('active-language');
            switchToPolish.classList.remove('active-language');
        } else {
            switchToPolish.classList.add('active-language');
            switchToEnglish.classList.remove('active-language');
        }
    }
    
    function showWelcomeMessage(language) {
        const welcomeMessages = {
            en: {
                title: "WELCOME, BATTLE BROTHER",
                message: "The Emperor Protects! Prepare for battle in the grim darkness of the far future."
            },
            pl: {
                title: "WITAJ, BRACIE WOJOWNIKU",
                message: "Imperator Chroni! Przygotuj się do bitwy w mrocznej ciemności dalekiej przyszłości."
            }
        };
        
        const message = welcomeMessages[language];
        
        // Create welcome overlay
        const welcomeOverlay = document.createElement('div');
        welcomeOverlay.className = 'welcome-overlay';
        
        const welcomeContent = document.createElement('div');
        welcomeContent.className = 'welcome-content';
        
        const welcomeTitle = document.createElement('h2');
        welcomeTitle.className = 'welcome-title';
        welcomeTitle.textContent = message.title;
        
        const welcomeText = document.createElement('p');
        welcomeText.className = 'welcome-text';
        welcomeText.textContent = message.message;
        
        welcomeContent.appendChild(welcomeTitle);
        welcomeContent.appendChild(welcomeText);
        welcomeOverlay.appendChild(welcomeContent);
        document.body.appendChild(welcomeOverlay);
        
        // Add animation class
        setTimeout(() => {
            welcomeOverlay.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            welcomeOverlay.classList.remove('show');
            setTimeout(() => {
                welcomeOverlay.remove();
            }, 500);
        }, 3000);
    }
    
    function initScrollEffects() {
        // Add scroll animation to sections
        const sections = document.querySelectorAll('.content-section');
        
        function checkScroll() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.75) {
                    section.classList.add('scrolled');
                }
            });
        }
        
        // Initial check
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
    }
    
    function initInteractiveElements() {
        // Add pulse animation to marine cards on hover
        const marineCards = document.querySelectorAll('.marine-card');
        
        marineCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('pulse');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('pulse');
            });
        });
        
        // Add animation to character images
        const characterImages = document.querySelectorAll('.character-image, .story-image');
        
        characterImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.6)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.4)';
            });
        });
        
        // Add typing effect to some headings
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50);
        });
    }
    
    // Create a function to handle the 40K aesthetic effects
    function createWarhammerEffects() {
        // Create occasional battle sounds in the background
        setInterval(() => {
            if (Math.random() > 0.7) {
                const battleSounds = [
                    new Audio('sounds/bolter-shot.mp3'),
                    new Audio('sounds/war-cry.mp3'),
                    new Audio('sounds/chainsword.mp3')
                ];
                const randomSound = battleSounds[Math.floor(Math.random() * battleSounds.length)];
                randomSound.volume = 0.1;
                randomSound.play();
            }
        }, 30000);
        
        // Add occasional screen shake for dramatic effect
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                if (Math.random() > 0.7) {
                    document.body.classList.add('screen-shake');
                    setTimeout(() => {
                        document.body.classList.remove('screen-shake');
                    }, 500);
                }
            }
        });
    }
    
    // Initialize the Warhammer effects
    createWarhammerEffects();
});

// Add some dynamic styles for effects
const styleElement = document.createElement('style');
styleElement.textContent = `
    /* Language change effect */
    .language-change-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(154, 0, 0, 0.3);
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        animation: languageFade 1s ease-out;
    }
    
    @keyframes languageFade {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    /* Active language button style */
    .lang-switch-btn.active-language {
        background-color: var(--primary-color) !important;
        border-color: var(--accent-color) !important;
        color: var(--accent-color) !important;
    }
    
    /* Welcome overlay styles */
    .welcome-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .welcome-overlay.show {
        opacity: 1;
    }
    
    .welcome-content {
        text-align: center;
        padding: 2rem;
        border: 3px solid var(--accent-color);
        background-color: var(--secondary-color);
        max-width: 600px;
    }
    
    .welcome-title {
        font-family: var(--font-heading);
        color: var(--accent-color);
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
    }
    
    .welcome-text {
        font-size: 1.2rem;
        color: var(--text-color);
    }
    
    /* Scroll animation for sections */
    .content-section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .content-section.scrolled {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Pulse animation for marine cards */
    .marine-card.pulse {
        animation: pulse 1s ease infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
        70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
        100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
    }
    
    /* Screen shake effect */
    .screen-shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
    
    /* Typing effect */
    @keyframes typing {
        from { width: 0 }
        to { width: 100% }
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: var(--accent-color); }
    }
`;
document.head.appendChild(styleElement);
