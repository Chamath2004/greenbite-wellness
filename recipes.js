// Recipe Data
const recipes = [
  {
    id: 1,
    title: "Avocado Toast",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    description: "Simple and nutritious breakfast with healthy fats",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "2 eggs (optional)"
    ],
    steps: [
      "Toast the bread until golden and crisp",
      "Mash the avocado with lemon juice, salt, and pepper",
      "Spread the avocado mixture on the toast",
      "Add optional toppings like eggs or red pepper flakes"
    ],
    nutrition: {
      calories: 220,
      protein: "5g",
      carbs: "20g",
      fat: "15g",
      fiber: "7g"
    }
  },
  {
    id: 2,
    title: "Quinoa Salad",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    description: "Protein-packed salad with fresh vegetables",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/4 cup feta cheese",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste"
    ],
    steps: [
      "Cook quinoa according to package instructions",
      "Chop all vegetables",
      "Combine all ingredients in a large bowl",
      "Drizzle with olive oil and lemon juice",
      "Season with salt and pepper"
    ],
    nutrition: {
      calories: 320,
      protein: "12g",
      carbs: "35g",
      fat: "18g",
      fiber: "6g"
    }
  },
  {
    id: 3,
    title: "Berry Protein Smoothie",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696",
    description: "Antioxidant-rich smoothie with plant-based protein",
    ingredients: [
      "1 cup mixed berries (strawberries, blueberries, raspberries)",
      "1 banana",
      "1 scoop vanilla protein powder",
      "1 tbsp chia seeds",
      "1 cup almond milk",
      "1/2 cup Greek yogurt",
      "1 tsp honey (optional)"
    ],
    steps: [
      "Add all ingredients to a blender",
      "Blend on high speed until smooth",
      "Add more almond milk if too thick",
      "Pour into a glass and enjoy immediately"
    ],
    nutrition: {
      calories: 280,
      protein: "24g",
      carbs: "32g",
      fat: "5g",
      fiber: "8g"
    }
  },
  {
    id: 4,
    title: "Grilled Salmon with Asparagus",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    description: "Omega-3 rich meal with seasonal vegetables",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "1 bunch asparagus (trimmed)",
      "2 tbsp olive oil",
      "1 lemon (zested and juiced)",
      "2 cloves garlic (minced)",
      "1 tsp dried dill",
      "Salt and pepper to taste"
    ],
    steps: [
      "Preheat grill or grill pan to medium-high",
      "Rub salmon and asparagus with olive oil",
      "Season with garlic, dill, salt, and pepper",
      "Grill salmon for 4-5 minutes per side",
      "Grill asparagus for 3-4 minutes, turning occasionally",
      "Serve with lemon zest and a squeeze of fresh lemon juice"
    ],
    nutrition: {
      calories: 350,
      protein: "34g",
      carbs: "8g",
      fat: "20g",
      fiber: "3g"
    }
  },
  {
    id: 5,
    title: "Crunchy Roasted Chickpeas",
    category: "snacks",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
    description: "Protein-packed crispy snack with customizable flavors",
    ingredients: [
      "1 can (15 oz) chickpeas, drained and rinsed",
      "1 tbsp olive oil",
      "1 tsp smoked paprika",
      "1/2 tsp garlic powder",
      "1/2 tsp cumin",
      "1/4 tsp cayenne pepper (optional)",
      "1/2 tsp sea salt"
    ],
    steps: [
      "Preheat oven to 400°F (200°C)",
      "Pat chickpeas dry with a clean towel (removing skins optional for extra crispiness)",
      "Toss chickpeas with olive oil and spices until evenly coated",
      "Spread in single layer on baking sheet",
      "Roast for 20 minutes, shake pan, then roast 15-20 more minutes until golden and crispy",
      "Let cool completely before storing in airtight container"
    ],
    nutrition: {
      calories: 130,
      protein: "6g",
      carbs: "18g",
      fat: "4g",
      fiber: "5g"
    },
    flavorVariations: [
      "Sweet: Cinnamon + 1 tsp maple syrup",
      "Ranch: Dill + onion powder + garlic powder",
      "BBQ: Smoked paprika + brown sugar + pinch of chili powder"
    ]
  }
];

// Get DOM elements
const recipesGrid = document.getElementById('recipes-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const modal = document.getElementById('recipe-modal');
const modalBody = document.querySelector('.modal-body');
const closeBtn = document.querySelector('.close-btn');

// Display recipes
function showRecipes(recipesToShow) {
  recipesGrid.innerHTML = '';
  
  recipesToShow.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-card-content">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <span class="category-tag">${recipe.category}</span>
      </div>
    `;
    card.addEventListener('click', () => showModal(recipe));
    recipesGrid.appendChild(card);
  });
}

// Show recipe details in modal
function showModal(recipe) {
  modalBody.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <div class="modal-info">
      <h2>${recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
      <h3>Instructions</h3>
      <ol class="steps-list">
        ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
      <h3>Nutrition Information</h3>
      <table class="nutrition-table">
        <tr><th>Calories</th><td>${recipe.nutrition.calories}</td></tr>
        <tr><th>Protein</th><td>${recipe.nutrition.protein}</td></tr>
        <tr><th>Carbs</th><td>${recipe.nutrition.carbs}</td></tr>
        <tr><th>Fat</th><td>${recipe.nutrition.fat}</td></tr>
        <tr><th>Fiber</th><td>${recipe.nutrition.fiber}</td></tr>
      </table>
    </div>
  `;
  modal.style.display = 'block';
}

// Filter recipes
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  
  const filtered = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
                         recipe.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || recipe.category === category;
    return matchesSearch && matchesCategory;
  });
  
  showRecipes(filtered);
}

// Event listeners
searchInput.addEventListener('input', filterRecipes);
categoryFilter.addEventListener('change', filterRecipes);
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Initialize
showRecipes(recipes);

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
