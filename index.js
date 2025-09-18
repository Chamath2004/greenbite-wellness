// Slogan Rotator
const slogans = [
    "Eat well, live well.",
    "Your health is your wealth.",
    "Balance is the key to wellness.",
    "Healthy habits, happy life.",
    "Nourish your body, fuel your soul."
];

let currentSloganIndex = 0;
const sloganElement = document.getElementById('slogan');
let rotationInterval;

function rotateSlogans() {
    sloganElement.style.opacity = 0;
    setTimeout(() => {
        currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
        sloganElement.textContent = slogans[currentSloganIndex];
        sloganElement.style.opacity = 1;
    }, 500);
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const menuLinks = document.querySelectorAll('.side-menu a');

function toggleMenu() {
    sideMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', sideMenu.classList.contains('active'));
}

hamburger.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Pause slogan rotation when tab is inactive
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(rotationInterval);
    } else {
        rotationInterval = setInterval(rotateSlogans, 4000);
    }
});

// Initialize
rotationInterval = setInterval(rotateSlogans, 4000);

// Daily Tips
const tips = [
  "Drink water daily",
  "Walk 30 minutes",
  "Eat leafy greens",
  "Practice deep breathing",
  "Get enough sleep",
  "Reduce sugar",
  "Stretch daily"
];

function showDailyTip() {
  const day = new Date().getDate();
  const tipIndex = day % tips.length;
  document.getElementById('daily-tip').textContent = tips[tipIndex];
}

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



