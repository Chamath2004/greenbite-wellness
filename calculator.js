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


document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityFactor = parseFloat(document.getElementById('activity').value);
    
    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE
    const tdee = bmr * activityFactor;
    
    // Calculate Macros
    const carbs = (tdee * 0.50) / 4;
    const protein = (tdee * 0.20) / 4;
    const fat = (tdee * 0.30) / 9;
    
    // Display results
    document.getElementById('results').innerHTML = `
        <h2>Your Results</h2>
        
        <div class="result-item">
            <h3>Basal Metabolic Rate (BMR)</h3>
            <div class="counter" id="bmr-counter">${Math.round(bmr)}</div>
            <p>Calories your body needs at complete rest</p>
        </div>
        
        <div class="result-item">
            <h3>Total Daily Energy Expenditure (TDEE)</h3>
            <div class="counter" id="tdee-counter">${Math.round(tdee)}</div>
            <p>Calories you need based on your activity level</p>
            <div class="progress-container">
                <div class="progress-bar" id="tdee-bar" style="width: 100%"></div>
            </div>
        </div>
        
        <div class="result-item">
            <h3>Macronutrient Breakdown</h3>
            <div class="macros">
                <div class="macro-item">
                    <h4>Carbohydrates</h4>
                    <div class="counter">${Math.round(carbs)}</div>
                    <p>grams (50% of calories)</p>
                </div>
                <div class="macro-item">
                    <h4>Protein</h4>
                    <div class="counter">${Math.round(protein)}</div>
                    <p>grams (20% of calories)</p>
                </div>
                <div class="macro-item">
                    <h4>Fat</h4>
                    <div class="counter">${Math.round(fat)}</div>
                    <p>grams (30% of calories)</p>
                </div>
            </div>
        </div>
    `;
    
    // Show results
    document.getElementById('results').style.display = 'block';
    
    // Animate counters
    animateValue('bmr-counter', 0, Math.round(bmr), 1000);
    animateValue('tdee-counter', 0, Math.round(tdee), 1000);
});

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
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
