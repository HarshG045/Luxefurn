// ===== GLOBAL VARIABLES =====
let cartCount = 0;
const cartBtn = document.querySelector('.cart-btn');
const cartCountElement = document.querySelector('.cart-count');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// ===== PRODUCT DATA =====
const productsData = {
    beds: [
        {
            id: 1,
            name: "LunaForm Luxury Platform Bed",
            price: "₹2,299",
            originalPrice: "₹2,899",
            image: "./bed/LunaForm, a luxurious platform bed that blends….jpeg",
            badge: "Best Seller"
        },
        {
            id: 2,
            name: "Modern Wooden Designer Bed",
            price: "₹1,899",
            originalPrice: "₹2,399",
            image: "./bed/Bed Furniture Design Modern.jpeg",
            badge: "New"
        },
        {
            id: 3,
            name: "Illuminated Contemporary Bed",
            price: "₹3,199",
            originalPrice: "₹3,799",
            image: "./bed/bed with lightning.jpeg",
            badge: "Premium"
        },
        {
            id: 4,
            name: "Albero Bratislava Collection",
            price: "₹2,799",
            originalPrice: "₹3,299",
            image: "./bed/albero-furniture-bratislava-u88zDvr5V6g-unsplash.jpg",
            badge: "Featured"
        },
        {
            id: 5,
            name: "Spacejoy Elegant Bedroom Set",
            price: "₹2,599",
            originalPrice: "₹3,099",
            image: "./bed/spacejoy-eyEy5YZhSvU-unsplash.jpg",
            badge: "Popular"
        },
        {
            id: 6,
            name: "Clay Banks Minimalist Bed",
            price: "₹1,799",
            originalPrice: "₹2,199",
            image: "./bed/clay-banks-r8i3RwrVcRk-unsplash.jpg",
            badge: "Sale"
        },
        {
            id: 7,
            name: "Christopher Jolly Modern Frame",
            price: "₹2,199",
            originalPrice: "₹2,699",
            image: "./bed/christopher-jolly-GqbU78bdJFM-unsplash.jpg",
            badge: "Trending"
        },
        {
            id: 8,
            name: "Kenny Eliason Designer Bed",
            price: "₹2,999",
            originalPrice: "₹3,599",
            image: "./bed/kenny-eliason-iAftdIcgpFc-unsplash.jpg",
            badge: "Luxury"
        }
    ],
    wardrobes: [
        {
            id: 9,
            name: "AIWO Lisette Compact Wardrobe",
            price: "₹1,599",
            originalPrice: "₹1,999",
            image: "./wardrobe/AIWO Lisette Compact Cream Sliding Door Wardrobe….jpeg",
            badge: "Compact"
        },
        {
            id: 10,
            name: "Art Deco Walnut Wardrobe",
            price: "₹3,299",
            originalPrice: "₹3,899",
            image: "./wardrobe/Elevate your storage with our Art Deco Walnut….jpeg",
            badge: "Premium"
        },
        {
            id: 11,
            name: "Modern Illuminated Wardrobe",
            price: "₹2,899",
            originalPrice: "₹3,399",
            image: "./wardrobe/Современный шкаф с подсветкой для уюта в спальне.jpeg",
            badge: "LED"
        },
        {
            id: 12,
            name: "Kingv Custom Antique Wardrobe",
            price: "₹4,199",
            originalPrice: "₹4,999",
            image: "./wardrobe/Kingv حسب الطلب العتيقة خزانة خزانة خشب متين تصميم….jpeg",
            badge: "Custom"
        },
        {
            id: 13,
            name: "Rumman Amin Collection",
            price: "₹2,199",
            originalPrice: "₹2,699",
            image: "./wardrobe/rumman-amin-3fFBoEHee28-unsplash.jpg",
            badge: "Featured"
        },
        {
            id: 14,
            name: "Sanibell Contemporary Design",
            price: "₹2,599",
            originalPrice: "₹3,099",
            image: "./wardrobe/sanibell-bv-g01h0WtY22s-unsplash.jpg",
            badge: "Modern"
        },
        {
            id: 15,
            name: "Stylish Hinged Door Wardrobe",
            price: "₹1,899",
            originalPrice: "₹2,299",
            image: "./wardrobe/Discover our curated list of 25 stylish hinged….jpeg",
            badge: "Classic"
        },
        {
            id: 16,
            name: "Wooden Cupboard Small Space",
            price: "₹1,299",
            originalPrice: "₹1,599",
            image: "./wardrobe/Modern Wooden Cupboard Design Ideas For Small….jpeg",
            badge: "Space Saver"
        }
    ],
    sideTables: [
        // Using some bed images as side table representations since we don't have dedicated side table images
        {
            id: 17,
            name: "Melissa Contemporary Side Table",
            price: "₹399",
            originalPrice: "₹499",
            image: "./bed/melissa-mbeNdhbXWME-unsplash.jpg",
            badge: "Bestseller"
        },
        {
            id: 18,
            name: "Minh Pham Designer Table",
            price: "₹599",
            originalPrice: "₹749",
            image: "./bed/minh-pham-7pCFUybP_P8-unsplash.jpg",
            badge: "Designer"
        },
        {
            id: 19,
            name: "Mustafa Fatemi Luxury Table",
            price: "₹899",
            originalPrice: "₹1,199",
            image: "./bed/mustafa-fatemi-wvuaIBxKAAE-unsplash.jpg",
            badge: "Luxury"
        },
        {
            id: 20,
            name: "Francesca Tosolini Modern Table",
            price: "₹499",
            originalPrice: "₹649",
            image: "./bed/francesca-tosolini-hCU4fimRW-c-unsplash.jpg",
            badge: "Modern"
        },
        {
            id: 21,
            name: "Darren Richardson Side Table",
            price: "₹699",
            originalPrice: "₹899",
            image: "./bed/darren-richardson-nzwaWv_Vnxw-unsplash.jpg",
            badge: "Popular"
        },
        {
            id: 22,
            name: "Trend Minimalist Table",
            price: "₹349",
            originalPrice: "₹449",
            image: "./bed/trend-Uh-Qv2P9-sg-unsplash.jpg",
            badge: "Minimal"
        },
        {
            id: 23,
            name: "Zac Gudakov Statement Table",
            price: "₹799",
            originalPrice: "₹999",
            image: "./bed/zac-gudakov-m0U1QnNmnhA-unsplash.jpg",
            badge: "Statement"
        },
        {
            id: 24,
            name: "Clay Banks Elegant Table",
            price: "₹549",
            originalPrice: "₹699",
            image: "./bed/clay-banks-_sdO0PgdgFw-unsplash.jpg",
            badge: "Elegant"
        }
    ]
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize all components
    initNavigation();
    initProductGrids();
    initScrollEffects();
    initCartFunctionality();
    
    console.log('LuxeFurn website initialized successfully!');
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show for 1.5 seconds minimum
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background change on scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for CTA button
    document.querySelector('.cta-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#beds').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for View All buttons
    document.querySelectorAll('.view-all-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your view all functionality here
            showNotification('View All feature coming soon!');
        });
    });
}

// ===== PRODUCT GRIDS =====
function initProductGrids() {
    renderProductGrid('beds', productsData.beds.slice(0, 6)); // Show first 6 beds
    renderProductGrid('wardrobes', productsData.wardrobes.slice(0, 6)); // Show first 6 wardrobes
    renderProductGrid('side-tables', productsData.sideTables.slice(0, 6)); // Show first 6 side tables
}

function renderProductGrid(category, products) {
    const gridElement = document.getElementById(`${category}-grid`);
    if (!gridElement) return;
    
    gridElement.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Add event listeners to Add to Cart buttons
    gridElement.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.productId);
            addToCart(productId);
        });
    });
}

function createProductCard(product) {
    return `
        <div class="product-card" data-aos="fade-up" data-aos-delay="100">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/300x250/f8f4e6/8b6914?text=LuxeFurn+Product'">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="original-price">${product.originalPrice}</span>
                    ${product.price}
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    `;
}

// ===== CART FUNCTIONALITY =====
function initCartFunctionality() {
    // Cart button click handler
    cartBtn.addEventListener('click', function() {
        showNotification('Cart functionality coming soon!');
        // Add your cart modal/page functionality here
    });
}

function addToCart(productId) {
    // Find product in all categories
    let product = null;
    for (const category in productsData) {
        product = productsData[category].find(p => p.id === productId);
        if (product) break;
    }
    
    if (product) {
        cartCount++;
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
        
        // Add animation to cart button
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Store in localStorage (basic cart implementation)
        let cart = JSON.parse(localStorage.getItem('luxefurn-cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('luxefurn-cart', JSON.stringify(cart));
    }
}

function updateCartCount() {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8b6914 0%, #b8941d 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(139, 105, 20, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== INITIALIZE CART FROM LOCALSTORAGE =====
function initCartFromStorage() {
    const cart = JSON.parse(localStorage.getItem('luxefurn-cart')) || [];
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();
}

// ===== IMAGE LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    // Add search functionality if needed
    // This can be enhanced to filter products based on search terms
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events for better performance
window.addEventListener('scroll', throttle(function() {
    // Additional scroll-based animations can be added here
}, 16)); // ~60fps

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('LuxeFurn Error:', e.error);
    // You can add error reporting here
});

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, eventData) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, eventData);
}

// Track page load
trackEvent('page_load', {
    page: 'bedroom_collection',
    timestamp: new Date().toISOString()
});

// Initialize cart from storage when page loads
document.addEventListener('DOMContentLoaded', initCartFromStorage);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productsData,
        addToCart,
        updateCartCount,
        showNotification
    };
}
