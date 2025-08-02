// Carpets Collection JavaScript
class CarpetsCollection {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Add to cart functionality for carpets
        const addToCartButtons = document.querySelectorAll('.carpet-item .add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart(button);
            });
        });

        // Carpet item click events for potential future features
        const carpetItems = document.querySelectorAll('.carpet-item');
        carpetItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.add-to-cart-btn')) {
                    this.showCarpetDetails(item);
                }
            });
        });
    }

    addToCart(button) {
        const carpetItem = button.closest('.carpet-item');
        const carpetName = carpetItem.querySelector('.carpet-info h3').textContent;
        const carpetPrice = carpetItem.querySelector('.carpet-price').textContent;

        // Add visual feedback
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = 'linear-gradient(135deg, #28a745, #1e7e34)';

        // Update cart count (if cart functionality exists)
        this.updateCartCount();

        // Show notification
        this.showNotification(`${carpetName} added to cart!`);

        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            button.style.background = 'linear-gradient(135deg, #d2691e, #a0522d)';
        }, 2000);

        console.log(`Added to cart: ${carpetName} - ${carpetPrice}`);
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
            background: linear-gradient(135deg, #8b4513, #654321);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
            border: 2px solid rgba(255, 215, 0, 0.3);
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

    showCarpetDetails(carpetItem) {
        // Future feature: show detailed carpet information
        const carpetName = carpetItem.querySelector('.carpet-info h3').textContent;
        console.log(`Showing details for: ${carpetName}`);
        
        // Could implement modal or detailed view here
    }

    initializeAnimations() {
        // Add stagger animation to carpet items
        const carpetItems = document.querySelectorAll('.carpet-item');
        carpetItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 150 * index + 500); // Delay after cushions
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

            carpetItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Add hover effect enhancements
        carpetItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeHoverEffect(item);
            });
        });
    }

    addHoverEffect(item) {
        // Add subtle glow effect with carpet-specific colors
        item.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.2), 0 0 25px rgba(139, 69, 19, 0.4)';
    }

    removeHoverEffect(item) {
        // Remove glow effect
        item.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.1)';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CarpetsCollection();
});

// Add CSS animations for enhanced carpet effects
const style = document.createElement('style');
style.textContent = `
    .carpet-item.animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Enhanced hover effects for carpets */
    .carpet-item:hover {
        box-shadow: 0 20px 40px rgba(139, 69, 19, 0.2), 0 0 25px rgba(139, 69, 19, 0.4) !important;
    }

    /* Subtle carpet texture animation */
    @keyframes carpetTexture {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.02) rotate(0.5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }

    .carpet-item:active {
        animation: carpetTexture 0.4s ease;
    }

    /* Subsection headers animation */
    .subsection-header {
        opacity: 0;
        animation: slideInFromTop 0.8s ease forwards;
    }

    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
