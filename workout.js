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

// Exercise database
const exercises = {
  arms: {
    none: [
      { name: "Push-ups", duration: 45, desc: "Arm strength" },
      { name: "Dips", duration: 45, desc: "Triceps exercise" }
    ],
    dumbbells: [
      { name: "Bicep Curls", duration: 60, desc: "Arm builder" }
    ],
    resistance: [
      { name: "Resistance Band Bicep Curl", duration: 40, sets: 3, reps: "12" }
    ],
    kettlebell: [
      { name: "Kettlebell Curl Press", duration: 45, sets: 3, reps: "10" }
    ]
  },
  legs: {
    none: [
      { name: "Squats", duration: 45, sets: 3, reps: "15" },
      { name: "Lunges", duration: 45, sets: 3, reps: "10 each" }
    ],
    dumbbells: [
      { name: "Dumbbell Goblet Squats", duration: 45, sets: 3, reps: "12" }
    ],
    resistance: [
      { name: "Resistance Band Glute Kickbacks", duration: 40, sets: 3, reps: "15 each" }
    ],
    kettlebell: [
      { name: "Kettlebell Deadlifts", duration: 45, sets: 3, reps: "12" }
    ]
  },
  core: {
    none: [
      { name: "Plank", duration: 30, sets: 3, reps: "30 sec" },
      { name: "Crunches", duration: 30, sets: 3, reps: "15" }
    ],
    dumbbells: [
      { name: "Dumbbell Russian Twists", duration: 30, sets: 3, reps: "20 twists" }
    ],
    resistance: [
      { name: "Resistance Band Bicycle Crunches", duration: 30, sets: 3, reps: "20" }
    ],
    kettlebell: [
      { name: "Kettlebell Sit-Ups", duration: 35, sets: 3, reps: "15" }
    ]
  },
  upper: {
    none: [
      { name: "Incline Push-ups", duration: 30, sets: 3, reps: "15" }
    ],
    dumbbells: [
      { name: "Dumbbell Shoulder Press", duration: 40, sets: 3, reps: "12" }
    ],
    resistance: [
      { name: "Resistance Band Chest Fly", duration: 40, sets: 3, reps: "12" }
    ],
    kettlebell: [
      { name: "Kettlebell Shoulder Press", duration: 45, sets: 3, reps: "10" }
    ]
  },
  full: {
    none: [
      { name: "Jumping Jacks", duration: 60, desc: "Full body warm-up" },
      { name: "Push-ups", duration: 45, desc: "Works chest and arms" },
      { name: "Squats", duration: 60, desc: "Great for legs" }
    ],
    dumbbells: [
      { name: "Dumbbell Press", duration: 60, desc: "Upper body workout" },
      { name: "Goblet Squats", duration: 60, desc: "Legs with weight" }
    ],
    resistance: [
      { name: "Resistance Band Squat Press", duration: 40, sets: 3, reps: "15" }
    ],
    kettlebell: [
      { name: "Kettlebell Swings", duration: 45, sets: 3, reps: "20" }
    ]
  }
};

// DOM elements
const form = document.getElementById('workout-form');
const workoutPlan = document.getElementById('workout-plan');
const sound = document.getElementById('timer-sound');

// Timer variables
let timer;
let currentExercise = 0;
let timeRemaining = 0;
let workout = [];

// Generate workout
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const bodyPart = document.getElementById('body-part').value;
  const equipment = document.getElementById('equipment').value;
  const duration = parseInt(document.getElementById('duration').value);
  
  if (!exercises[bodyPart]?.[equipment]) {
    alert("No exercises for this combination");
    return;
  }
  
  workout = getWorkout(exercises[bodyPart][equipment], duration);
  showWorkout(workout);
});

function getWorkout(exercises, minutes) {
  const totalSeconds = minutes * 60 * 0.8; // Use 80% of time for exercises
  const result = [];
  let timeUsed = 0;
  
  while (timeUsed < totalSeconds && exercises.length > 0) {
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const exercise = exercises[randomIndex];
    result.push(exercise);
    timeUsed += exercise.duration;
    exercises.splice(randomIndex, 1);
  }
  
  return result;
}

function showWorkout(exercises) {
  workoutPlan.innerHTML = '';
  workoutPlan.style.display = 'block';
  
  exercises.forEach((ex, i) => {
    const exerciseEl = document.createElement('div');
    exerciseEl.className = 'exercise';
    exerciseEl.innerHTML = `
      <h3>${i+1}. ${ex.name}</h3>
      <p>${ex.desc}</p>
      <p>Duration: ${ex.duration}s</p>
      <div class="timer">${ex.duration}</div>
      <div class="progress-bar"><div class="progress"></div></div>
      <button onclick="startExercise(${i}, ${ex.duration})">Start</button>
    `;
    workoutPlan.appendChild(exerciseEl);
  });
}

// Timer functions
function startExercise(index, duration) {
  clearInterval(timer);
  currentExercise = index;
  timeRemaining = duration;
  
  const timerEl = workoutPlan.children[index].querySelector('.timer');
  const progressEl = workoutPlan.children[index].querySelector('.progress');
  
  timer = setInterval(() => {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    progressEl.style.width = `${(timeRemaining/duration)*100}%`;
    
    if (timeRemaining <= 0) {
      clearInterval(timer);
      if (currentExercise < workout.length - 1) {
        startExercise(currentExercise + 1, workout[currentExercise + 1].duration);
      }
    }
  }, 1000);
}

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.add('active');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.remove('active');
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
