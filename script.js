document.addEventListener('DOMContentLoaded', function() {
    // Determine the current page type
    const currentPage = window.location.pathname.split('/').pop();
    const isHomePage = currentPage === '' || currentPage === 'index.html' || !currentPage.includes('.html');
    const isDetailPage = !isHomePage; // veg.html, nonveg.html, dess.html

    // ===== COMMON FUNCTIONALITY (FOR ALL PAGES) =====
    
    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            if (isHomePage) {
                // Home page behavior - toggle sections
                const targetElement = document.getElementById(targetPage);
                
                if (targetElement) {
                    // Update active class on nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Hide all pages and show the target page
                    const pages = document.querySelectorAll('.page');
                    pages.forEach(page => page.classList.remove('active'));
                    targetElement.classList.add('active');
                    
                    // Scroll to top for better UX
                    window.scrollTo(0, 0);
                } else {
                    // If target doesn't exist on home page, navigate to specific page
                    navigateToTargetPage(targetPage);
                }
            } else {
                // Detail page behavior - navigate between pages
                navigateToTargetPage(targetPage);
            }
        });
    });
    
    // Helper function to navigate to specific pages
    function navigateToTargetPage(targetPage) {
        switch (targetPage) {
            case 'home':
                window.location.href = 'index.html';
                break;
                case 'vegetarian':
                    if (isHomePage) {
                        showHomeSection('vegetarian');
                    } else {
                        window.location.href = 'index.html#vegetarian';
                    }
              break;

            case 'non-vegetarian':
                  if (isHomePage) {
                        showHomeSection('non-vegetarian');
                    } else {
                        window.location.href = 'index.html#non-vegetarian';
                    }
                break;
            case 'dessert':
                      if (isHomePage) {
                        showHomeSection('dessert');
                    } else {
                        window.location.href = 'index.html#dessert';
                    }
                break;
            case 'meal-planner':
                if (isHomePage) {
                    // If we're already on home, just show the section
                    showHomeSection('meal-planner');
                } else {
                    // Otherwise navigate to home with anchor
                    window.location.href = 'index.html#meal-planner';
                }
                break;
            case 'leftover':
                if (isHomePage) {
                    showHomeSection('leftover');
                } else {
                    window.location.href = 'index.html#leftover';
                }
                break;
            default:
                window.location.href = 'index.html';
                break;
        }
    }
    
    // Helper function to show a specific section on home page
    function showHomeSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            targetElement.classList.add('active');
            
            // Update active class on nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Update active state based on current page
    function updateActiveNavLink() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const targetPage = link.getAttribute('data-page');
            
            if (isHomePage) {
                // On home page, check for hash in URL
                if (window.location.hash) {
                    const hash = window.location.hash.substring(1);
                    if (targetPage === hash) {
                        link.classList.add('active');
                    } else if (!hash && targetPage === 'home') {
                        link.classList.add('active');
                    }
                } else if (targetPage === 'home') {
                    link.classList.add('active');
                }
            } else {
                // On detail pages, match by file name
                if ((currentPage === 'veg.html' && targetPage === 'vegetarian') ||
                    (currentPage === 'nonveg.html' && targetPage === 'non-vegetarian') ||
                    (currentPage === 'dess.html' && targetPage === 'dessert')) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Initial active state
    updateActiveNavLink();
    
    // Handle hash changes on home page
    if (isHomePage && window.location.hash) {
        const hash = window.location.hash.substring(1);
        showHomeSection(hash);
    }
    
    // ===== HOME PAGE SPECIFIC FUNCTIONALITY =====
    if (isHomePage) {
        // Recipe Card Click Navigation
        const recipecards = document.querySelectorAll('.recipe-card');
        
        recipecards.forEach(card => {
            card.addEventListener('click', function() {
                const category = card.getAttribute('data-category');
                const pageType = card.getAttribute('data-page'); // Identify page type
                
                // If the card is from the home page, navigate to the category page
                if (pageType === 'home') {
                    // Update active class on nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-page') === category) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Show the corresponding page
                    const pages = document.querySelectorAll('.page');
                    pages.forEach(page => page.classList.remove('active'));
                    const targetPage = document.getElementById(category);
                    if (targetPage) {
                        targetPage.classList.add('active');
                    }
                    
                    // Scroll to the top for better UX
                    window.scrollTo(0, 0);
                } else {
                    // If the card is from a category page, redirect to the corresponding detail page
                    let fileName;
                    switch (category) {
                        case 'vegetarian':
                            fileName = 'veg.html';
                            break;
                        case 'non-vegetarian':
                            fileName = 'nonveg.html';
                            break;
                        case 'dessert':
                            fileName = 'dess.html';
                            break;
                        default:
                            fileName = 'index.html';
                            break;
                    }
                    window.location.href = fileName;
                }
            });
        });
        
        // Footer navigation links
        const footerLinks = document.querySelectorAll('.footer-column a[data-page]');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetPage = this.getAttribute('data-page');
                
                // Update active class on nav links
                navLinks.forEach(link => {
                    if (link.getAttribute('data-page') === targetPage) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // Show the target page
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => page.classList.remove('active'));
                const targetElement = document.getElementById(targetPage);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });
        
        // Recipe Filtering
        const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
        const timeButtons = document.querySelectorAll('.filter-btn[data-time]');
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        // Category filter
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter recipes
                recipeCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Time filter
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const timeFilter = this.getAttribute('data-time');
                
                // Update active class
                timeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter recipes
                recipeCards.forEach(card => {
                    if (timeFilter === 'all' || card.getAttribute('data-time') === timeFilter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Meal Planner
        const mealSlots = document.querySelectorAll('.meal-slot');
        
        // Handle meal slot clicks
        mealSlots.forEach(slot => {
            slot.addEventListener('click', function () {
                const day = this.parentElement.querySelector('.day-header').textContent;
                const mealType = this.getAttribute('data-meal');
                
                const recipeName = prompt(`Enter a recipe for ${mealType} on ${day}:`);
                
                if (recipeName && recipeName.trim() !== '') {
                    this.querySelector('.meal-name').textContent = recipeName;
                    this.classList.add('filled');
                }
            });
        });
        
        // Reset Button
        const resetButton = document.querySelector('.btn.btn-secondary');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                mealSlots.forEach(slot => {
                    slot.querySelector('.meal-name').textContent = 'Click to add meal';
                    slot.classList.remove('filled');
                });
                alert('Meal plan has been reset!');
            });
        }
        
        // Save Button
        const saveButton = document.querySelector('.btn:nth-child(3)');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                const mealPlan = {};
                
                document.querySelectorAll('.day-column').forEach(dayColumn => {
                    const day = dayColumn.querySelector('.day-header').textContent;
                    mealPlan[day] = {};
                    
                    dayColumn.querySelectorAll('.meal-slot').forEach(slot => {
                        const mealType = slot.getAttribute('data-meal');
                        const mealName = slot.querySelector('.meal-name').textContent;
                        mealPlan[day][mealType] = mealName !== 'Click to add meal' ? mealName : '';
                    });
                });
                
                console.log('Saved Meal Plan:', mealPlan);
                alert('Meal plan saved! (Check console for details)');
                
                // Optional: Save to localStorage
                // localStorage.setItem('weeklyMealPlan', JSON.stringify(mealPlan));
            });
        }
        
        // Auto-fill Planner Button
        const autoFillBtn = document.querySelector('.meal-buttons .btn');
        
        if (autoFillBtn) {
            autoFillBtn.addEventListener('click', function() {
                const sampleMeals = {
                    breakfast: ['Avocado Toast', 'Oatmeal with Berries', 'Greek Yogurt Parfait', 'Scrambled Eggs', 'Pancakes', 'Breakfast Burrito', 'Smoothie Bowl'],
                    lunch: ['Chicken Salad', 'Vegetable Soup', 'Turkey Sandwich', 'Quinoa Bowl', 'Caesar Salad', 'Tuna Wrap', 'Pasta Salad'],
                    dinner: ['Grilled Salmon', 'Chicken Stir Fry', 'Vegetable Lasagna', 'Beef Tacos', 'Eggplant Parmesan', 'Shrimp Pasta', 'Pizza']
                };
                
                mealSlots.forEach(slot => {
                    const mealType = slot.getAttribute('data-meal');
                    const randomIndex = Math.floor(Math.random() * sampleMeals[mealType].length);
                    const randomMeal = sampleMeals[mealType][randomIndex];
                    
                    slot.querySelector('.meal-name').textContent = randomMeal;
                    slot.classList.add('filled');
                });
            });
        }
        
        // Leftover Ingredients
        const ingredientItems = document.querySelectorAll('.ingredient-item');
        
        ingredientItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
        });
        
        // Find Recipes Button
        const findRecipesBtn = document.querySelector('.leftover-ingredients .btn');
        
        if (findRecipesBtn) {
            findRecipesBtn.addEventListener('click', function() {
                const selectedIngredients = document.querySelectorAll('.ingredient-item.selected');
                
                if (selectedIngredients.length === 0) {
                    alert('Please select at least one ingredient.');
                    return;
                }
                
                // Get selected ingredients
                const ingredients = [];
                selectedIngredients.forEach(item => {
                    ingredients.push(item.textContent);
                });
                
                // Mock API call (in a real app, this would fetch from a backend)
                findRecipesWithIngredients(ingredients);
            });
        }
        
        // Mock function to find recipes with ingredients
        function findRecipesWithIngredients(ingredients) {
            // These would normally come from an API
            const recipeDatabase = [
                {
                    title: 'Vegetable Stir Fry',
                    category: 'vegetarian',
                    time: 'quick',
                    ingredients: ['Bell Peppers', 'Broccoli', 'Carrots', 'Rice', 'Garlic', 'Onions'],
                    difficulty: 'Easy',
                    rating: 4
                },
                {
                    title: 'Chicken Pasta',
                    category: 'non-vegetarian',
                    time: 'medium',
                    ingredients: ['Chicken', 'Pasta', 'Tomatoes', 'Garlic', 'Onions'],
                    difficulty: 'Medium',
                    rating: 5
                },
                {
                    title: 'Beef Tacos',
                    category: 'non-vegetarian',
                    time: 'quick',
                    ingredients: ['Beef', 'Tomatoes', 'Onions', 'Cheese'],
                    difficulty: 'Easy',
                    rating: 4
                },
                {
                    title: 'Mushroom Risotto',
                    category: 'vegetarian',
                    time: 'medium',
                    ingredients: ['Mushrooms', 'Rice', 'Garlic', 'Onions'],
                    difficulty: 'Medium',
                    rating: 4
                },
                {
                    title: 'Potato & Egg Breakfast',
                    category: 'vegetarian',
                    time: 'quick',
                    ingredients: ['Potatoes', 'Eggs', 'Bell Peppers', 'Onions'],
                    difficulty: 'Easy',
                    rating: 3
                },
                {
                    title: 'Spinach & Chicken Salad',
                    category: 'non-vegetarian',
                    time: 'quick',
                    ingredients: ['Chicken', 'Spinach', 'Tomatoes', 'Eggs'],
                    difficulty: 'Easy',
                    rating: 4
                }
            ];
            
            // Filter recipes that contain at least one of the selected ingredients
            const matchedRecipes = recipeDatabase.filter(recipe => {
                return ingredients.some(ingredient => recipe.ingredients.includes(ingredient));
            });
            
            // Sort by number of matching ingredients (most matches first)
            matchedRecipes.sort((a, b) => {
                const aMatches = a.ingredients.filter(ingredient => ingredients.includes(ingredient)).length;
                const bMatches = b.ingredients.filter(ingredient => ingredients.includes(ingredient)).length;
                return bMatches - aMatches;
            });
            
            // Display results
            const resultsContainer = document.querySelector('.search-results .recipes-grid');
            resultsContainer.innerHTML = '';
            
            if (matchedRecipes.length === 0) {
                resultsContainer.innerHTML = '<p>No recipes found with those ingredients. Try selecting different ingredients.</p>';
                return;
            }
            
            matchedRecipes.forEach(recipe => {
                const matchedIngredients = recipe.ingredients.filter(ingredient => ingredients.includes(ingredient));
                const matchCount = matchedIngredients.length;
                const matchText = matchCount === 1 ? '1 ingredient match' : `${matchCount} ingredient matches`;
                
                // Create recipe card
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.setAttribute('data-category', recipe.category);
                card.setAttribute('data-time', recipe.time);
                
                const ratingStars = '★'.repeat(recipe.rating) + '☆'.repeat(5 - recipe.rating);
                
                card.innerHTML = `
                  <div class="recipe-content">
                        <span class="recipe-category">${recipe.category}</span>
                        <h3 class="recipe-title">${recipe.title}</h3>
                        <p class="recipe-desc"><strong>${matchText}:</strong> ${matchedIngredients.join(', ')}</p>
                        <div class="recipe-time">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            30-45 mins
                        </div>
                        <div class="recipe-meta">
                            <div class="recipe-rating">
                                ${ratingStars}
                            </div>
                            <div class="recipe-difficulty">${recipe.difficulty}</div>
                        </div>
                    </div>
                `;
                
                resultsContainer.appendChild(card);
            });
        }
    }
    
    // ===== DETAIL PAGE SPECIFIC FUNCTIONALITY =====
    if (goBackBtn) {
    goBackBtn.addEventListener('click', function() {
        let targetSection = 'home'; // Default to home

        // Determine the correct section based on the current page
        if (currentPage === 'veg.html') {
            targetSection = 'vegetarian';
        } else if (currentPage === 'nonveg.html') {
            targetSection = 'non-vegetarian';
        } else if (currentPage === 'dess.html') {
            targetSection = 'dessert';
        }

        // Navigate to the home page with the corresponding section
        window.location.href = `index.html#${targetSection}`;
           });
      }

        
        // Any other detail page specific functionality can go here
    
});