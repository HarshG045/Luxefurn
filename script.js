// Loader Management with Counter Format and Typing Effect
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const counterDisplay = document.getElementById('counter-display');
    const loaderContent = document.querySelector('.loader-content');
    const typingText = document.getElementById('typing-text');
    
    let currentNumber = 0;
    const targetNumber = 100;
    const totalLoadingTime = 4200; // 4.2 seconds for counting (leaving 0.8s for fade out)
    const incrementSpeed = totalLoadingTime / targetNumber; // Dynamic speed to reach 100 in exactly 4.2s
    
    let typingIndex = 0;
    const welcomeWord = "Welcome";
    let typingInterval;
    let typingStarted = false;
    let typingComplete = false;
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Start counter after a short delay
    setTimeout(() => {
        const counterInterval = setInterval(() => {
            if (currentNumber < targetNumber) {
                currentNumber++;
                counterDisplay.textContent = currentNumber;
                
                // Start typing when counter reaches 25
                if (currentNumber === 25 && !typingStarted) {
                    typingStarted = true;
                    startTypingAnimation();
                }
                
                // Complete typing when counter reaches 85
                if (currentNumber === 85 && !typingComplete) {
                    completeTypingAnimation();
                }
                
                // Complete loading when counter reaches 100
                if (currentNumber === targetNumber) {
                    finalizeLoader();
                }
            } else {
                clearInterval(counterInterval);
                // Fade out all elements when reaching 100
                setTimeout(() => {
                    fadeOutAndShowContent();
                }, 100);
            }
        }, incrementSpeed);
    }, 600);
    
    function startTypingAnimation() {
        console.log('startTypingAnimation called at counter:', currentNumber);
        
        if (!typingText) {
            console.error('typing-text element not found!');
            return;
        }
        
        typingStarted = true;
        typingText.style.borderRight = '2px solid white';
        console.log('Started typing animation');
        
        // Use a fixed slower typing speed
        const typingSpeed = 300; // Fixed 300ms per character
        
        typingInterval = setInterval(() => {
            if (typingIndex < welcomeWord.length) {
                // Type "Welcome"
                const currentText = welcomeWord.substring(0, typingIndex + 1);
                typingText.textContent = currentText;
                console.log('Typing:', currentText);
                typingIndex++;
            } else {
                // Finished typing "Welcome", clear interval
                clearInterval(typingInterval);
                console.log('Welcome typing complete, waiting for counter 85');
            }
        }, typingSpeed);
    }
    
    function completeTypingAnimation() {
        // Clear the typing interval if still running
        if (typingInterval) {
            clearInterval(typingInterval);
        }
        
        // Ensure full text is displayed
        typingText.textContent = welcomeWord;
        
        // Set cursor to blink and mark as complete
        typingText.style.borderRight = '2px solid white';
        typingText.classList.add('typing-active'); // Add blinking animation
        
        typingComplete = true;
        console.log('Typing animation completed at counter 85, cursor blinking');
    }
    
    function finalizeLoader() {
        // Remove cursor when counter hits 100
        typingText.style.borderRight = 'none';
        typingText.classList.remove('typing-active');
        console.log('Loader finalized at counter 100');
    }
    
    function fadeOutAndShowContent() {
        // Apply fade out animation to loader content
        loaderContent.style.animation = 'fadeOutAll 0.8s ease-out forwards';
        
        // Show main content immediately but keep it invisible
        mainContent.style.display = 'block';
        
        setTimeout(() => {
            loader.style.display = 'none';
            
            // Add a 0.5s delay before showing main content
            setTimeout(() => {
                mainContent.classList.add('show');
                
                // Trigger entrance animations for main content
                animateOnScroll();
            }, 500);
        }, 800);
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background Change on Scroll - Apple Style
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Animate Elements on Scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Add animation class when elements come into view
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Shopping Cart Functionality
let cart = [];

function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price,
        id: Date.now()
    };
    
    cart.push(item);
    updateCartDisplay();
    showAddToCartNotification(productName);
}

function updateCartDisplay() {
    // You can implement cart display logic here
    console.log('Cart updated:', cart);
}

function showAddToCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart!`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add event listeners to add-to-cart buttons
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const priceText = productCard.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace('$', '').replace(',', ''));
                
                addToCart(productName, price);
            });
        });
    }, 6000); // Wait for main content to load
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const searchIcon = document.querySelector('.nav-icons .fa-search');
        
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                // Create search overlay
                const searchOverlay = document.createElement('div');
                searchOverlay.className = 'search-overlay';
                searchOverlay.innerHTML = `
                    <div class="search-container">
                        <input type="text" placeholder="Search for furniture..." class="search-input">
                        <button class="search-close">&times;</button>
                    </div>
                `;
                searchOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10001;
                `;
                
                const searchContainer = searchOverlay.querySelector('.search-container');
                searchContainer.style.cssText = `
                    position: relative;
                    width: 90%;
                    max-width: 500px;
                `;
                
                const searchInput = searchOverlay.querySelector('.search-input');
                searchInput.style.cssText = `
                    width: 100%;
                    padding: 20px;
                    font-size: 1.2rem;
                    border: none;
                    border-radius: 10px;
                    outline: none;
                `;
                
                const searchClose = searchOverlay.querySelector('.search-close');
                searchClose.style.cssText = `
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: #999;
                    cursor: pointer;
                `;
                
                document.body.appendChild(searchOverlay);
                searchInput.focus();
                
                // Close search
                searchClose.addEventListener('click', function() {
                    document.body.removeChild(searchOverlay);
                });
                
                searchOverlay.addEventListener('click', function(e) {
                    if (e.target === searchOverlay) {
                        document.body.removeChild(searchOverlay);
                    }
                });
            });
        }
    }, 6000);
});

// Hero CTA Button Action
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const ctaButton = document.querySelector('.cta-button');
        
        if (ctaButton) {
            ctaButton.addEventListener('click', function() {
                const productsSection = document.querySelector('#products');
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = productsSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        }
    }, 6000);
});

// Add hover effects to furniture showcase items
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const furnitureItems = document.querySelectorAll('.furniture-item');
        
        furnitureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }, 6000);
});

// Featured Products Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.featured-track');
    const prevBtn = document.querySelector('.featured-prev-btn');
    const nextBtn = document.querySelector('.featured-next-btn');
    const cards = document.querySelectorAll('.featured-card');
    
    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardsToShow = 1; // Default to 1 for mobile
    let cardWidth = 0;
    let gap = 0;
    
    function updateCarouselSettings() {
        const screenWidth = window.innerWidth;
        
        // Determine how many cards to show based on screen size
        if (screenWidth >= 1200) {
            cardsToShow = 3;
        } else if (screenWidth >= 768) {
            cardsToShow = 2;
        } else {
            cardsToShow = 1; // Mobile: show one card at a time
        }
        
        // Calculate card width and gap
        const container = track.parentElement;
        const containerWidth = container.offsetWidth;
        const padding = screenWidth <= 480 ? 120 : (screenWidth <= 768 ? 140 : 120);
        const availableWidth = containerWidth - padding;
        
        if (screenWidth <= 768) {
            // Mobile: full width minus padding for navigation buttons
            cardWidth = Math.min(320, availableWidth);
            gap = 16;
        } else {
            // Desktop: multiple cards
            gap = 32;
            cardWidth = (availableWidth - (gap * (cardsToShow - 1))) / cardsToShow;
        }
        
        // Apply card width to all cards
        cards.forEach(card => {
            if (screenWidth <= 768) {
                card.style.flex = `0 0 ${cardWidth}px`;
                card.style.maxWidth = `${cardWidth}px`;
            } else {
                card.style.flex = `0 0 ${cardWidth}px`;
                card.style.maxWidth = 'none';
            }
        });
    }
    
    function updateCarousel() {
        const translateX = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - cardsToShow;
        
        // Add visual feedback for disabled buttons
        prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '1';
    }
    
    function nextSlide() {
        if (currentIndex < cards.length - cardsToShow) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Swipe threshold
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
        
        isDragging = false;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Initialize carousel
    function initCarousel() {
        updateCarouselSettings();
        currentIndex = 0; // Reset to first slide
        updateCarousel();
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initCarousel();
        }, 250);
    });
    
    // Initialize
    setTimeout(initCarousel, 100); // Small delay to ensure elements are rendered
});

// ===== CATEGORY CAROUSEL STATE MANAGEMENT =====
let currentCarousel = 'chair'; // Default carousel
const carouselStates = {
    bed: { currentIndex: 0 },
    chair: { currentIndex: 0 },
    table: { currentIndex: 0 }
};

function getActiveCarousel() {
    return document.querySelector(`#${currentCarousel}-carousel`);
}

function getActiveTrack() {
    return document.querySelector(`#${currentCarousel}-carousel .carousel-track`);
}

function getActiveCards() {
    return document.querySelectorAll(`#${currentCarousel}-carousel .card`);
}

function updateCarousel(category = currentCarousel) {
    const track = getActiveTrack();
    const cards = getActiveCards();
    const state = carouselStates[category];
    
    if (!track || !cards.length) return;
    
    const cardWidth = cards[0].offsetWidth + 40;
    const offset = -cardWidth * state.currentIndex;
    track.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, i) => {
        card.classList.toggle("active", i === state.currentIndex);
    });
}

function nextSlide(category = currentCarousel) {
    const cards = document.querySelectorAll(`#${category}-carousel .card`);
    const state = carouselStates[category];
    
    if (state.currentIndex < cards.length - 1) {
        state.currentIndex++;
        updateCarousel(category);
    }
}

function prevSlide(category = currentCarousel) {
    const state = carouselStates[category];
    
    if (state.currentIndex > 0) {
        state.currentIndex--;
        updateCarousel(category);
    }
}

function switchCarousel(newCategory) {
    // Hide all carousels
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(carousel => {
        carousel.style.display = 'none';
        carousel.classList.add('hidden');
    });
    
    // Show selected carousel
    const targetCarousel = document.getElementById(`${newCategory}-carousel`);
    if (targetCarousel) {
        currentCarousel = newCategory;
        targetCarousel.style.display = 'flex';
        targetCarousel.classList.remove('hidden');
        
        // Update the carousel after switching
        setTimeout(() => {
            updateCarousel(newCategory);
        }, 50);
    }
}

// ===== CATEGORY SELECTION FUNCTIONALITY =====
function selectCategory(category) {
    // Remove active class from all circles
    const circles = document.querySelectorAll('.category-circle');
    circles.forEach(circle => circle.classList.remove('active'));
    
    // Add active class to clicked circle
    const selectedCircle = document.querySelector(`[data-category="${category}"]`);
    if (selectedCircle) {
        selectedCircle.classList.add('active');
    }
    
    // Switch to the corresponding carousel
    switchCarousel(category);
    
    // Log for demo purposes
    console.log(`Selected category: ${category}`);
}

// Scroll Animation Functions
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                
                // Special handling for category circles
                if (entry.target.classList.contains('category-section')) {
                    setTimeout(() => {
                        const circles = entry.target.querySelectorAll('.category-circle');
                        circles.forEach((circle, index) => {
                            setTimeout(() => {
                                circle.style.transform = 'translateY(0) scale(1.02)';
                                circle.style.opacity = '1';
                            }, index * 200);
                        });
                    }, 300);
                }

                // Special handling for carousel cards
                if (entry.target.classList.contains('carousel-wrapper')) {
                    setTimeout(() => {
                        const cards = entry.target.querySelectorAll('.card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.transform = 'scale(0.92) translateY(-5px)';
                                card.style.filter = 'brightness(1.05)';
                            }, index * 100);
                        });
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = [
        '.category-section',
        '.category-title',
        '.category-container',
        '.carousel-section',
        '.carousel-wrapper'
    ];

    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            scrollObserver.observe(element);
        });
    });

    // Add smooth scroll behavior with momentum
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            document.body.classList.add('scrolling');
            isScrolling = true;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
            isScrolling = false;
        }, 150);

        // Add parallax effect to sections
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.category-section, .carousel-section');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos * 0.2}px)`;
        });
    });
}

// Initialize category carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state after a small delay to ensure elements are loaded
    setTimeout(() => {
        // Show chair carousel by default
        switchCarousel('chair');
        
        // Set chair category as active
        const chairCircle = document.querySelector('[data-category="chair"]');
        if (chairCircle) {
            chairCircle.classList.add('active');
        }
    }, 100);
});

// Navigation functions for Shop by Room section with Torn Paper Transition
function navigateToLivingRoom() {
    // Use torn paper transition to navigate
    if (typeof createTornPaperTransition === 'function') {
        createTornPaperTransition('./01_living_room_part1/living_room.html');
    } else {
        // Fallback to direct navigation
        window.location.href = './01_living_room_part1/living_room.html';
    }
}

function navigateToDiningRoom() {
    // Use torn paper transition to navigate
    if (typeof createTornPaperTransition === 'function') {
        createTornPaperTransition('./16_dining_hall_part1/index.html');
    } else {
        // Fallback to direct navigation
        window.location.href = './16_dining_hall_part1/index.html';
    }
}

function navigateToOffice() {
    // Use torn paper transition to navigate
    if (typeof createTornPaperTransition === 'function') {
        createTornPaperTransition('./11_office_part1/index.html');
    } else {
        // Fallback to direct navigation
        window.location.href = './11_office_part1/index.html';
    }
}

function navigateToBedroom() {
    // Use torn paper transition to navigate
    if (typeof createTornPaperTransition === 'function') {
        createTornPaperTransition('./05_bed_room_part1/index.html');
    } else {
        // Fallback to direct navigation
        window.location.href = './05_bed_room_part1/index.html';
    }
}

// Add event listeners for navbar links when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Handle navbar dropdown links with torn paper transition
    const navLinks = document.querySelectorAll('.dropdown-content a');
    
    navLinks.forEach(link => {
        // Only add transition to links that navigate to other pages
        const href = link.getAttribute('href');
        if (href && href !== '#' && href !== 'javascript:void(0)' && !href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (typeof createTornPaperTransition === 'function') {
                    createTornPaperTransition(href);
                } else {
                    window.location.href = href;
                }
            });
        }
    });
});