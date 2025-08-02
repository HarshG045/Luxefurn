// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Shopping Cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM Elements
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartCountElement = document.querySelector('.cart-count');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

// Add to cart functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const productName = this.getAttribute('data-product');
        const productPrice = parseInt(this.getAttribute('data-price'));
        
        // Add item to cart
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        // Update cart count and total
        cartCount++;
        cartTotal += productPrice;
        updateCartDisplay();
        
        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show success message
        showNotification('Item added to cart!');
    });
});

// Update cart display
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toLocaleString();
    
    // Update cart items in modal
    cartItemsElement.innerHTML = '';
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <strong>₹${(item.price * item.quantity).toLocaleString()}</strong>
                </div>
            `;
            cartItemsElement.appendChild(cartItem);
        });
    }
}

// Cart modal functionality
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // For other sections, scroll to products section
            document.querySelector('.products').scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// CTA button scroll to products
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('.products').scrollIntoView({
        behavior: 'smooth'
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Quick view functionality
document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productDescription = productCard.querySelector('p').textContent;
        const productImage = productCard.querySelector('img').src;
        
        showQuickView(productName, productPrice, productDescription, productImage);
    });
});

// Quick view modal
function showQuickView(name, price, description, image) {
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'modal';
    quickViewModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Quick View</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center;" class="quick-view-grid">
                    <div>
                        <img src="${image}" alt="${name}" style="width: 100%; border-radius: 15px;">
                    </div>
                    <div>
                        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 15px; color: #2c3e50;">${name}</h3>
                        <p style="color: #7f8c8d; margin-bottom: 20px; line-height: 1.6;">${description}</p>
                        <div style="font-size: 1.8rem; font-weight: 700; color: #6c5ce7; margin-bottom: 20px;">${price}</div>
                        <button class="add-to-cart-btn" style="width: 100%;">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(quickViewModal);
    quickViewModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = quickViewModal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(quickViewModal);
        document.body.style.overflow = 'auto';
    });
    
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            document.body.removeChild(quickViewModal);
            document.body.style.overflow = 'auto';
        }
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(108, 92, 231, 0.3);
        font-weight: 600;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .products, .features');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Add mobile menu styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize cart display
updateCartDisplay();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Checkout functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-btn')) {
        showNotification('Proceeding to checkout...');
        setTimeout(() => {
            alert('Thank you for your interest! This is a demo store. In a real implementation, this would redirect to a secure checkout page.');
        }, 1000);
    }
});
