// Smooth Featured Products Carousel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing smooth featured carousel...');
    
    const track = document.querySelector('.featured-track');
    const prevBtn = document.querySelector('.featured-prev-btn');
    const nextBtn = document.querySelector('.featured-next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const carousel = document.querySelector('.featured-carousel');
    
    if (!track || !prevBtn || !nextBtn) {
        console.error('Missing required elements');
        return;
    }
    
    const cards = track.querySelectorAll('.featured-card');
    console.log('Cards found:', cards.length);
    
    // Preload all images immediately
    function preloadAllImages() {
        cards.forEach((card, index) => {
            const imageDiv = card.querySelector('.featured-image');
            if (imageDiv) {
                const bgImage = window.getComputedStyle(imageDiv).backgroundImage;
                if (bgImage && bgImage !== 'none') {
                    const url = bgImage.slice(4, -1).replace(/["']/g, "");
                    const img = new Image();
                    img.onload = () => {
                        console.log(`Image ${index + 1} loaded successfully`);
                        imageDiv.style.opacity = '1';
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image ${index + 1}`);
                    };
                    img.src = url;
                    
                    // Set initial opacity to prevent flash
                    imageDiv.style.opacity = '0';
                    imageDiv.style.transition = 'opacity 0.3s ease';
                }
            }
        });
    }
    
    let currentIndex = 0;
    let isAnimating = false;
    const cardWidth = 412; // 380px + 32px gap
    const totalCards = cards.length;
    const visibleCards = 3;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    // Ensure proper container setup
    carousel.style.overflow = 'visible';
    track.style.overflow = 'visible';
    
    // Set up smooth CSS transitions
    track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    track.style.willChange = 'transform';
    
    function updateCarousel(smooth = true) {
        if (isAnimating && smooth) return;
        
        isAnimating = true;
        const translateX = -currentIndex * cardWidth;
        
        // Apply smooth transform
        if (smooth) {
            track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update buttons with smooth opacity transitions
        prevBtn.style.transition = 'opacity 0.3s ease';
        nextBtn.style.transition = 'opacity 0.3s ease';
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        
        // Update indicators with smooth transitions
        indicators.forEach((indicator, index) => {
            indicator.style.transition = 'all 0.3s ease';
            const isActive = index === Math.floor(currentIndex / visibleCards);
            indicator.classList.toggle('active', isActive);
        });
        
        // Preload adjacent images for smoother experience
        preloadAdjacentImages();
        
        // Reset animation flag after transition completes
        if (smooth) {
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        } else {
            isAnimating = false;
        }
    }
    
    // Preload images for current and adjacent slides
    function preloadAdjacentImages() {
        const indicesToPreload = [
            Math.max(0, currentIndex - 1),
            currentIndex,
            Math.min(maxIndex, currentIndex + 1),
            Math.min(totalCards - 1, currentIndex + visibleCards),
            Math.min(totalCards - 1, currentIndex + visibleCards + 1)
        ];
        
        indicesToPreload.forEach(index => {
            if (index < totalCards && cards[index]) {
                const imageDiv = cards[index].querySelector('.featured-image');
                if (imageDiv) {
                    const bgImage = window.getComputedStyle(imageDiv).backgroundImage;
                    if (bgImage && bgImage !== 'none') {
                        const url = bgImage.slice(4, -1).replace(/["']/g, "");
                        const img = new Image();
                        img.src = url;
                    }
                }
            }
        });
    }
    
    // Enhanced button event handlers
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isAnimating && currentIndex > 0) {
            currentIndex--;
            updateCarousel(true);
        }
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isAnimating && currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel(true);
        }
    });
    
    // Indicator clicks with smooth transitions
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            if (!isAnimating) {
                const newIndex = Math.min(index * visibleCards, maxIndex);
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateCarousel(true);
                }
            }
        });
    });
    
    // Enhanced touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTransform = 0;
    
    track.addEventListener('touchstart', function(e) {
        if (isAnimating) return;
        
        startX = e.touches[0].clientX;
        isDragging = true;
        startTransform = -currentIndex * cardWidth;
        
        // Disable CSS transition during drag
        track.style.transition = 'none';
    }, { passive: true });
    
    track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const newTransform = startTransform + diffX;
        
        // Apply immediate transform during drag
        track.style.transform = `translateX(${newTransform}px)`;
    }, { passive: true });
    
    track.addEventListener('touchend', function() {
        if (!isDragging) return;
        
        const diffX = currentX - startX;
        const threshold = cardWidth * 0.25; // 25% of card width
        
        // Re-enable smooth transition
        track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        // Determine direction and update index
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (diffX < 0 && currentIndex < maxIndex) {
                currentIndex++;
            }
        }
        
        // Snap back to proper position
        updateCarousel(true);
        isDragging = false;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.featured-products')) {
            if (e.key === 'ArrowLeft' && !isAnimating && currentIndex > 0) {
                currentIndex--;
                updateCarousel(true);
            } else if (e.key === 'ArrowRight' && !isAnimating && currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel(true);
            }
        }
    });
    
    // Responsive handling
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(false); // Immediate update without animation
        }, 250);
    });
    
    // Initialize carousel
    preloadAllImages(); // Preload all images first
    updateCarousel(false);
    
    console.log('Smooth carousel initialized successfully');
});
