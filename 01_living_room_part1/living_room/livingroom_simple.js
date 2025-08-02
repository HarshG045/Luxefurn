// Living Room Single Image Infinite Sliding Gallery
class LivingRoomSlidingGallery {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 11; // Original number of slides
        this.isTransitioning = false;
        
        this.initElements();
        this.setupInfiniteLoop();
        this.initEventListeners();
        this.initAnimations();
    }
    
    initElements() {
        this.galleryTrack = document.getElementById('galleryTrack');
        this.prevButton = document.getElementById('galleryPrev');
        this.nextButton = document.getElementById('galleryNext');
        this.dots = document.querySelectorAll('.gallery-dot');
        this.gallerySlides = document.querySelectorAll('.gallery-slide');
    }
    
    setupInfiniteLoop() {
        // Clone first and last slides for infinite loop
        const firstSlide = this.gallerySlides[0].cloneNode(true);
        const lastSlide = this.gallerySlides[this.totalSlides - 1].cloneNode(true);
        
        // Add clones to track
        this.galleryTrack.appendChild(firstSlide);
        this.galleryTrack.insertBefore(lastSlide, this.gallerySlides[0]);
        
        // Update slides list to include clones
        this.gallerySlides = document.querySelectorAll('.gallery-slide');
        
        // Start at position 1 (first real slide, after cloned last slide)
        this.currentSlide = 1;
        this.galleryTrack.style.transform = `translateX(-${this.currentSlide * (100 / (this.totalSlides + 2))}%)`;
        
        // Set initial active slide
        this.updateActiveStates();
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
        
        this.galleryTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.galleryTrack.addEventListener('touchend', (e) => {
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
        
        // Auto-slide removed per user request
        // this.startAutoSlide();
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.currentSlide++;
        this.updateSlider();
        
        // Handle infinite loop - if we're at the cloned first slide, jump to real first slide
        if (this.currentSlide === this.totalSlides + 1) {
            setTimeout(() => {
                this.galleryTrack.style.transition = 'none';
                this.currentSlide = 1;
                this.galleryTrack.style.transform = `translateX(-${this.currentSlide * (100 / (this.totalSlides + 2))}%)`;
                setTimeout(() => {
                    this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 10);
            }, 600);
        }
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        this.currentSlide--;
        this.updateSlider();
        
        // Handle infinite loop - if we're at the cloned last slide, jump to real last slide
        if (this.currentSlide === 0) {
            setTimeout(() => {
                this.galleryTrack.style.transition = 'none';
                this.currentSlide = this.totalSlides;
                this.galleryTrack.style.transform = `translateX(-${this.currentSlide * (100 / (this.totalSlides + 2))}%)`;
                setTimeout(() => {
                    this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 10);
            }, 600);
        }
    }
    
    goToSlide(index) {
        if (this.isTransitioning) return;
        
        // Convert index to account for cloned slide
        this.currentSlide = index + 1;
        this.updateSlider();
    }
    
    updateSlider() {
        this.isTransitioning = true;
        
        // Update slider position
        const translateX = -this.currentSlide * (100 / (this.totalSlides + 2));
        this.galleryTrack.style.transform = `translateX(${translateX}%)`;
        
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
        // Get the real slide index (accounting for cloned slide at beginning)
        const realSlideIndex = this.currentSlide === 0 ? this.totalSlides - 1 : 
                              this.currentSlide === this.totalSlides + 1 ? 0 : 
                              this.currentSlide - 1;
        
        // Update slide active class
        this.gallerySlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update dot indicators
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realSlideIndex);
        });
    }
    
    animateSlideChange() {
        // Add subtle slide entrance animation
        const currentSlide = this.gallerySlides[this.currentSlide];
        if (currentSlide) {
            const img = currentSlide.querySelector('img');
            const overlay = currentSlide.querySelector('.gallery-overlay');
            
            if (img) {
                img.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    img.style.transform = 'scale(1)';
                }, 100);
            }
            
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    overlay.style.transform = 'translateY(0)';
                }, 200);
            }
        }
        
        // Create entrance ripple effect
        this.createSlideRipple(currentSlide);
    }
    
    createSlideRipple(slide) {
        if (!slide) return;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: slideRipple 1s ease-out;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            z-index: 5;
        `;
        
        slide.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
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
    
    // Auto-slide method removed per user request
    // startAutoSlide() {
    //     // Auto-slide every 5 seconds
    //     setInterval(() => {
    //         if (!this.isTransitioning) {
    //             this.nextSlide();
    //         }
    //     }, 5000);
    // }
    
    initAnimations() {
        // Initial setup
        setTimeout(() => {
            this.animateSlideChange();
        }, 1000);
        
        // Add scroll reveal animation for the entire gallery
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
        
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            observer.observe(galleryContainer);
        }
    }
}

// CSS Animations for slide effects
const style = document.createElement('style');
style.textContent = `
    @keyframes slideRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LivingRoomSlidingGallery();
});
