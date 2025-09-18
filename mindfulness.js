// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const closebtn = document.getElementById('closeBtn');
const menuLinks = document.querySelectorAll('.side-menu a');

function toggleMenu() {
    sideMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', sideMenu.classList.contains('active'));
}

hamburger.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// DOM Elements

// DOM Elements
const breathingCircle = document.getElementById('breathing-circle');
const breathingText = breathingCircle.querySelector('.breathing-text');
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');

const timerDisplay = document.getElementById('meditation-timer');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const durationSelect = document.getElementById('duration');

const soundBtns = document.querySelectorAll('.sound-btn');
const rainSound = document.getElementById('rain-sound');
const forestSound = document.getElementById('forest-sound');
const wavesSound = document.getElementById('waves-sound');

const totalSessionsEl = document.getElementById('total-sessions');
const totalMinutesEl = document.getElementById('total-minutes');
const resetStatsBtn = document.getElementById('reset-stats');

// Breathing Exercise Variables
let breathingInterval;
let isBreathing = false;
let inhale = true;
let breathHold = false;
let cycleCount = 0;
const breathDuration = 4000; // 4 seconds per phase

// Timer Variables
let timerInterval;
let timerRunning = false;
let timerPaused = false;
let timeLeft = 5 * 60; // Default 5 minutes in seconds

// Session Tracking
let sessionsCompleted = localStorage.getItem('mindfulnessSessions') || 0;
let totalMinutes = localStorage.getItem('mindfulnessMinutes') || 0;

// Initialize the page
function init() {
    updateSessionStats();
    setupEventListeners();
    updateTimerDisplay();
}

function setupEventListeners() {
    // Breathing Exercise
    startBreathingBtn.addEventListener('click', startBreathingExercise);
    stopBreathingBtn.addEventListener('click', stopBreathingExercise);
    
    // Meditation Timer
    startTimerBtn.addEventListener('click', startMeditationTimer);
    pauseTimerBtn.addEventListener('click', togglePauseTimer);
    resetTimerBtn.addEventListener('click', resetMeditationTimer);
    durationSelect.addEventListener('change', updateTimerDuration);
    
    // Ambient Sounds
    soundBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleAmbientSound(btn.dataset.sound));
    });
    
    // Session Tracker
    resetStatsBtn.addEventListener('click', resetProgressStats);
    
    // Mobile Menu
    document.getElementById('hamburger').addEventListener('click', () => {
        document.getElementById('sideMenu').classList.add('active');
    });
    
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.getElementById('sideMenu').classList.remove('active');
    });
}

// Breathing Exercise Functions
function startBreathingExercise() {
    if (isBreathing) return;
    
    isBreathing = true;
    startBreathingBtn.disabled = true;
    stopBreathingBtn.disabled = false;
    
    breathingText.textContent = "Breathe In";
    breathingCircle.style.transform = "scale(1.2)";
    breathingCircle.style.backgroundColor = "#c8e6c9";
    
    breathingInterval = setInterval(breathingCycle, breathDuration);
}

function breathingCycle() {
    if (inhale) {
        breathingText.textContent = "Hold";
        breathHold = true;
    } else if (breathHold) {
        breathingText.textContent = "Breathe Out";
        breathingCircle.style.transform = "scale(1)";
        breathingCircle.style.backgroundColor = "#e3f2fd";
        breathHold = false;
    } else {
        breathingText.textContent = "Breathe In";
        breathingCircle.style.transform = "scale(1.2)";
        breathingCircle.style.backgroundColor = "#c8e6c9";
        cycleCount++;
    }
    inhale = !inhale;
}

function stopBreathingExercise() {
    clearInterval(breathingInterval);
    isBreathing = false;
    inhale = true;
    breathHold = false;
    
    breathingText.textContent = "Breathe In";
    breathingCircle.style.transform = "scale(1)";
    breathingCircle.style.backgroundColor = "#e3f2fd";
    
    startBreathingBtn.disabled = false;
    stopBreathingBtn.disabled = true;
}

// Meditation Timer Functions
function startMeditationTimer() {
    if (timerRunning && !timerPaused) return;
    
    if (timerPaused) {
        timerPaused = false;
        pauseTimerBtn.textContent = "Pause";
    } else {
        timeLeft = parseInt(durationSelect.value) * 60;
        sessionsCompleted++;
        localStorage.setItem('mindfulnessSessions', sessionsCompleted);
        updateSessionStats();
    }
    
    timerRunning = true;
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    resetTimerBtn.disabled = true;
    
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
        resetTimerBtn.disabled = false;
        
        // Update total minutes
        const minutesCompleted = parseInt(durationSelect.value);
        totalMinutes += minutesCompleted;
        localStorage.setItem('mindfulnessMinutes', totalMinutes);
        updateSessionStats();
    }
}

function togglePauseTimer() {
    timerPaused = !timerPaused;
    pauseTimerBtn.textContent = timerPaused ? "Resume" : "Pause";
    
    if (timerPaused) {
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function resetMeditationTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = false;
    timeLeft = parseInt(durationSelect.value) * 60;
    
    updateTimerDisplay();
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = false;
    pauseTimerBtn.textContent = "Pause";
}

function updateTimerDuration() {
    if (!timerRunning) {
        timeLeft = parseInt(this.value) * 60;
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Ambient Sounds Functions
function toggleAmbientSound(soundType) {
    // Stop all sounds first
    rainSound.pause();
    forestSound.pause();
    wavesSound.pause();
    
    // Remove active class from all buttons
    soundBtns.forEach(btn => btn.classList.remove('active'));
    
    // Play selected sound if not already playing
    const soundElement = document.getElementById(`${soundType}-sound`);
    if (soundElement.paused) {
        soundElement.currentTime = 0;
        soundElement.play();
        document.querySelector(`.sound-btn[data-sound="${soundType}"]`).classList.add('active');
    }
}

// Session Tracker Functions
function updateSessionStats() {
    totalSessionsEl.textContent = sessionsCompleted;
    totalMinutesEl.textContent = totalMinutes;
}

function resetProgressStats() {
    if (confirm("Are you sure you want to reset your progress?")) {
        sessionsCompleted = 0;
        totalMinutes = 0;
        localStorage.setItem('mindfulnessSessions', 0);
        localStorage.setItem('mindfulnessMinutes', 0);
        updateSessionStats();
    }
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', init);

// ===== FOOTER-SPECIFIC JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    // Footer Newsletter Form Handling
    const footerNewsletterForm = document.querySelector('.footer-newsletter .newsletter-form');
    const footerEmailInput = document.querySelector('.footer-newsletter input[type="email"]');
    const footerSubscriptionMessage = document.createElement('p');
    // Add at the top with other DOM elements
    const emailInput = document.getElementById('newsletter-email');
    footerSubscriptionMessage.className = 'subscription-message';
    footerNewsletterForm.appendChild(footerSubscriptionMessage);

    footerNewsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = footerEmailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Save to localStorage
            let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
            subscriptions.push({
                email: email,
                date: new Date().toISOString(),
                source: 'footer'
            });
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            
            // Show success message
            footerSubscriptionMessage.textContent = "Thank you for subscribing!";
            footerSubscriptionMessage.style.color = "#27ae60";
            footerEmailInput.value = '';
            
            // Clear message after 3 seconds
            setTimeout(() => {
                footerSubscriptionMessage.textContent = '';
            }, 3000);
        } else {
            footerSubscriptionMessage.textContent = "Please enter a valid email address";
            footerSubscriptionMessage.style.color = "#e53935";
        }
    });

    // Smooth scrolling for footer "Back to Top" link
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Social media link tracking (optional)
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Social link clicked:', this.href);
            // Add analytics tracking here if needed
        });
    });
});

// Shared validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// On page load
document.addEventListener('DOMContentLoaded', function() {
  showDailyTip();
  
  const savedEmail = localStorage.getItem('newsletterEmail');
  if (savedEmail) {
    emailInput.value = savedEmail;
  }
});
