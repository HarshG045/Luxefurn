// Sofa Grid Sliding Gallery JavaScript
class SofaSlidingGallery {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2;
        this.isTransitioning = false;
        this.cartCount = 0;
        
        this.initElements();
        this.initEventListeners();
        this.initAnimations();
        this.initCartFunctionality();
    }
    
    initElements() {
        this.sofaTrack = document.getElementById('sofaTrack');
        this.prevButton = document.getElementById('sofaPrev');
        this.nextButton = document.getElementById('sofaNext');
        this.dots = document.querySelectorAll('.sofa-dot');
        this.sofaItems = document.querySelectorAll('.sofa-item');
        this.addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        this.cartCountElement = document.querySelector('.cart-count');
    }
    
    initEventListeners() {
        // Navigation buttons
        this.prevButton.addEventListener('click', () => this.previousSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // Dot indicators
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.sofaTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.sofaTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Auto-slide (optional)
        this.startAutoSlide();
        
        // Sofa item hover effects
        this.initSofaHoverEffects();
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        this.isTransitioning = true;
        
        // Update slider position
        const translateX = -this.currentSlide * 50; // Each slide is 50%
        this.sofaTrack.style.transform = `translateX(₹{translateX}%)`;
        
        // Update active states
        this.updateActiveStates();
        
        // Add slide animation effects
        this.animateSlideChange();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 700);
    }
    
    updateActiveStates() {
        // Update dot indicators
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    animateSlideChange() {
        // Get current slide items
        const currentSlide = document.querySelectorAll('.sofa-slide')[this.currentSlide];
        const items = currentSlide.querySelectorAll('.sofa-item');
        
        // Reset and animate items
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
        
        // Add entrance effect
        this.createSlideEntranceEffect(currentSlide);
    }
    
    createSlideEntranceEffect(slide) {
        if (!slide) return;
        
        // Create a subtle flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: slideFlash 1s ease-out;
            pointer-events: none;
            z-index: 5;
        `;
        
        slide.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);
    }
    
    handleSwipe(startX, endX) {
        const minSwipeDistance = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    startAutoSlide() {
        // Auto-slide every 6 seconds
        setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, 6000);
    }
    
    initSofaHoverEffects() {
        this.sofaItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.createSofaParticles(e.currentTarget);
                this.animateSofaHover(e.currentTarget);
            });
            
            item.addEventListener('mousemove', (e) => {
                this.handleSofaMouseMove(e);
            });
            
            item.addEventListener('mouseleave', (e) => {
                this.resetSofaItem(e.currentTarget);
            });
        });
    }
    
    createSofaParticles(sofaItem) {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #e74c3c;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: sofaParticleFloat 2s ease-out forwards;
                    top: ₹{Math.random() * 100}%;
                    left: ₹{Math.random() * 100}%;
                    z-index: 15;
                `;
                
                sofaItem.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 150);
        }
    }
    
    animateSofaHover(item) {
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1) rotate(1deg)';
        }
    }
    
    handleSofaMouseMove(e) {
        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        item.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(₹{rotateX}deg) rotateY(₹{rotateY}deg)`;
    }
    
    resetSofaItem(item) {
        item.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) rotate(0deg)';
        }
    }
    
    initCartFunctionality() {
        this.addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent item click
                this.addToCart(btn);
            });
        });
    }
    
    addToCart(btn) {
        // Get product info
        const sofaItem = btn.closest('.sofa-item');
        const productName = sofaItem.querySelector('h3').textContent;
        const productPrice = sofaItem.querySelector('.sofa-price').textContent;
        
        // Increment cart count
        this.cartCount++;
        if (this.cartCountElement) {
            this.cartCountElement.textContent = this.cartCount;
            this.animateCartUpdate();
        }
        
        // Show success feedback
        this.showAddToCartFeedback(btn, productName);
        
        // Log for debugging (replace with actual cart logic)
        console.log(`Added to cart: ₹{productName} - ₹{productPrice}`);
    }
    
    showAddToCartFeedback(btn, productName) {
        // Create success message
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideInRight 0.5s ease-out;
        `;
        feedback.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ₹{productName} added to cart!
        `;
        
        document.body.appendChild(feedback);
        
        // Animate button
        btn.style.transform = 'scale(1.2)';
        btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        }, 1500);
        
        // Remove feedback
        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.5s ease-out forwards';
            setTimeout(() => feedback.remove(), 500);
        }, 3000);
    }
    
    animateCartUpdate() {
        if (this.cartCountElement) {
            this.cartCountElement.style.transform = 'scale(1.5)';
            this.cartCountElement.style.background = '#27ae60';
            
            setTimeout(() => {
                this.cartCountElement.style.transform = 'scale(1)';
                this.cartCountElement.style.background = '#e74c3c';
            }, 300);
        }
    }
    
    initAnimations() {
        // Initial animation for first slide
        setTimeout(() => {
            this.animateSlideChange();
        }, 1000);
        
        // Add scroll reveal animation
        this.initScrollReveal();
    }
    
    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const sofaSection = document.querySelector('.sofa-gallery-container');
        if (sofaSection) {
            observer.observe(sofaSection);
        }
    }
}

// CSS Animations for particles and effects
const style = document.createElement('style');
style.textContent = `
    @keyframes sofaParticleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-80px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes slideFlash {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
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

// Initialize the sofa gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SofaSlidingGallery();
});
