// Cushions Collection JavaScript
class CushionsCollection {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Add to cart functionality
        const addToCartButtons = document.querySelectorAll('.cushions-section .add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart(button);
            });
        });

        // Cushion item click events for potential future features
        const cushionItems = document.querySelectorAll('.cushion-item');
        cushionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.add-to-cart-btn')) {
                    this.showCushionDetails(item);
                }
            });
        });
    }

    addToCart(button) {
        const cushionItem = button.closest('.cushion-item');
        const cushionName = cushionItem.querySelector('.cushion-info h3').textContent;
        const cushionPrice = cushionItem.querySelector('.cushion-price').textContent;

        // Add visual feedback
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = 'linear-gradient(135deg, #28a745, #1e7e34)';

        // Update cart count (if cart functionality exists)
        this.updateCartCount();

        // Show notification
        this.showNotification(`${cushionName} added to cart!`);

        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            button.style.background = 'linear-gradient(135deg, #d2691e, #a0522d)';
        }, 2000);

        console.log(`Added to cart: ${cushionName} - ${cushionPrice}`);
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.classList.add('bounce');
                setTimeout(() => cartIcon.classList.remove('bounce'), 600);
            }
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #d2691e, #a0522d);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showCushionDetails(cushionItem) {
        // Future feature: show detailed cushion information
        const cushionName = cushionItem.querySelector('.cushion-info h3').textContent;
        console.log(`Showing details for: ${cushionName}`);
        
        // Could implement modal or detailed view here
    }

    initializeAnimations() {
        // Add stagger animation to cushion items
        const cushionItems = document.querySelectorAll('.cushion-item');
        cushionItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            cushionItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Add hover effect enhancements
        cushionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeHoverEffect(item);
            });
        });
    }

    addHoverEffect(item) {
        // Add subtle glow effect
        item.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.2), 0 0 20px rgba(210, 105, 30, 0.3)';
    }

    removeHoverEffect(item) {
        // Remove glow effect
        item.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.1)';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CushionsCollection();
});

// Add CSS animations for cart icon bounce and enhanced effects
const style = document.createElement('style');
style.textContent = `
    .cart-icon.bounce {
        animation: cartBounce 0.6s ease;
    }

    @keyframes cartBounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    .cushion-item.animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Enhanced hover effects */
    .cushion-item:hover {
        box-shadow: 0 20px 40px rgba(139, 69, 19, 0.2), 0 0 20px rgba(210, 105, 30, 0.3) !important;
    }

    /* Subtle pulse animation for cushion items */
    @keyframes cushionPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }

    .cushion-item:active {
        animation: cushionPulse 0.3s ease;
    }
`;
document.head.appendChild(style);
