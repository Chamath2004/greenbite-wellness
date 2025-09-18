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



//..........................................


document.addEventListener('DOMContentLoaded', function() {
    // Form Validation and Submission
    const form = document.getElementById('feedback-form');
    const successMessage = document.getElementById('form-success');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const feedback = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                date: new Date().toISOString()
            };
            
            saveFeedback(feedback);
            showSuccessMessage();
            form.reset();
        }
    });
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate Name
        if (name === '') {
            showError('name-error', 'Please enter your name');
            isValid = false;
        } else if (name.length < 2) {
            showError('name-error', 'Name must be at least 2 characters');
            isValid = false;
        } else {
            hideError('name-error');
        }
        
        // Validate Email
        if (email === '') {
            showError('email-error', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email');
            isValid = false;
        } else {
            hideError('email-error');
        }
        
        // Validate Message
        if (message === '') {
            showError('message-error', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message-error', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            hideError('message-error');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'none';
    }
    
    function saveFeedback(feedback) {
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
    
    function showSuccessMessage() {
        successMessage.textContent = 'Thank you for your feedback! We will get back to you soon.';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    // FAQ Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');
    
    hamburger.addEventListener('click', function() {
        sideMenu.classList.add('active');
    });
    
    closeBtn.addEventListener('click', function() {
        sideMenu.classList.remove('active');
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.side-menu a').forEach(link => {
        link.addEventListener('click', function() {
            sideMenu.classList.remove('active');
        });
    });
});

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
