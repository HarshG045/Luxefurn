// Living Room Custom Grid JavaScript
class LivingRoomGrid {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 9;
        this.isTransitioning = false;
        
        this.initElements();
        this.initEventListeners();
        this.initAnimations();
    }
    
    initElements() {
        this.slidingTrack = document.getElementById('slidingTrack');
        this.leftArrow = document.getElementById('leftArrow');
        this.rightArrow = document.getElementById('rightArrow');
        this.slideDots = document.querySelectorAll('.slide-dot');
        this.slideItems = document.querySelectorAll('.slide-item');
        this.gridItems = document.querySelectorAll('.grid-item');
    }
    
    initEventListeners() {
        // Arrow buttons
        this.leftArrow.addEventListener('click', () => this.previousSlide());
        this.rightArrow.addEventListener('click', () => this.nextSlide());
        
        // Dot indicators
        this.slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support for the sliding container
        let startX = 0;
        let endX = 0;
        
        this.slidingTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.slidingTrack.addEventListener('touchend', (e) => {
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
        
        // Grid item hover effects
        this.initGridHoverEffects();
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
        const translateX = -this.currentSlide * (100 / this.totalSlides);
        this.slidingTrack.style.transform = `translateX(₹{translateX}%)`;
        
        // Update active states
        this.updateActiveStates();
        
        // Add slide animation effects
        this.animateSlideChange();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    updateActiveStates() {
        // Update slide items
        this.slideItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update dot indicators
        this.slideDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    animateSlideChange() {
        const currentSlideItem = this.slideItems[this.currentSlide];
        const slideInfo = currentSlideItem?.querySelector('.slide-info');
        
        if (slideInfo) {
            // Reset animation
            slideInfo.style.transform = 'translateY(100%)';
            
            // Animate in
            setTimeout(() => {
                slideInfo.style.transform = 'translateY(0)';
            }, 200);
        }
        
        // Add ripple effect
        this.createRippleEffect(currentSlideItem);
    }
    
    createRippleEffect(element) {
        if (!element) return;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            margin-top: -15px;
            margin-left: -15px;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
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
    
    initGridHoverEffects() {
        this.gridItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.createGridParticles(e.target);
            });
            
            item.addEventListener('mousemove', (e) => {
                this.handleGridMouseMove(e);
            });
            
            item.addEventListener('mouseleave', (e) => {
                this.resetGridItem(e.target);
            });
        });
    }
    
    createGridParticles(gridItem) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #e74c3c;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleFloat 1.5s ease-out forwards;
                    top: ₹{Math.random() * 100}%;
                    left: ₹{Math.random() * 100}%;
                    z-index: 10;
                `;
                
                gridItem.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }, i * 150);
        }
    }
    
    handleGridMouseMove(e) {
        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        item.style.transform = `scale(1.02) rotateX(₹{rotateX}deg) rotateY(₹{rotateY}deg)`;
    }
    
    resetGridItem(item) {
        item.style.transform = 'scale(1.02) rotateX(0deg) rotateY(0deg)';
    }
    
    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Stagger animation for feature cards
                    if (entry.target.classList.contains('feature-card')) {
                        const cards = document.querySelectorAll('.feature-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.section-header, .custom-grid-container, .feature-card'
        );
        
        animateElements.forEach(el => {
            if (!el.style.opacity) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
            observer.observe(el);
        });
    }
    
    // Get current slide info
    getCurrentSlideInfo() {
        const currentSlideItem = this.slideItems[this.currentSlide];
        const slideInfo = currentSlideItem?.querySelector('.slide-info');
        
        if (!slideInfo) return null;
        
        return {
            index: this.currentSlide,
            title: slideInfo.querySelector('h3')?.textContent || '',
            description: slideInfo.querySelector('p')?.textContent || '',
            imageSrc: currentSlideItem.querySelector('img')?.src || ''
        };
    }
}

// Feature Cards Animation Class
class FeatureCardsAnimation {
    constructor() {
        this.initHoverEffects();
        this.initCountAnimation();
    }
    
    initHoverEffects() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createParticleEffect(e.target);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.resetCard(e.target);
            });
        });
    }
    
    createParticleEffect(card) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #e74c3c;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleFloat 2s ease-out forwards;
                    top: ₹{Math.random() * 100}%;
                    left: ₹{Math.random() * 100}%;
                `;
                
                card.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }
    
    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-10px) rotateX(₹{rotateX}deg) rotateY(₹{rotateY}deg)`;
    }
    
    resetCard(card) {
        card.style.transform = 'translateY(-10px) rotateX(0deg) rotateY(0deg)';
    }
    
    initCountAnimation() {
        // Could be used for animated counters if needed
        const numbers = document.querySelectorAll('[data-count]');
        numbers.forEach(num => {
            const target = parseInt(num.dataset.count);
            this.animateCount(num, 0, target, 2000);
        });
    }
    
    animateCount(element, start, end, duration) {
        const range = end - start;
        const stepTime = Math.abs(Math.floor(duration / range));
        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            
            element.textContent = value;
            
            if (value === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
}

// Add CSS animations
const additionalCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes particleFloat {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px);
    }
}

.gallery-item img {
    transition: transform 0.6s ease, filter 0.3s ease;
}

.feature-card {
    transition: all 0.4s ease, transform 0.1s ease;
}
`;

// Add the additional CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const grid = new LivingRoomGrid();
    const featureAnimation = new FeatureCardsAnimation();
    
    // Make grid globally accessible for debugging
    window.livingRoomGrid = grid;
    
    console.log('Living Room Grid initialized successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (window.livingRoomGrid) {
        // Grid doesn't have auto-play, so no need to pause/resume
        console.log('Page visibility changed');
    }
});