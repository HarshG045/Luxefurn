// Torn Paper Page Transition Function
function createTornPaperTransition(targetUrl) {
    // Immediately hide current page content to prevent flash
    document.body.style.pointerEvents = 'none';
    
    // Create preparation overlay
    const prepOverlay = document.createElement('div');
    prepOverlay.className = 'transition-prep';
    document.body.appendChild(prepOverlay);
    
    // Activate preparation immediately
    prepOverlay.classList.add('active');
    
    // Create main transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    
    // Create paper layer
    const paperLayer = document.createElement('div');
    paperLayer.className = 'torn-paper-layer';
    
    // Create torn edge shadow
    const tornEdge = document.createElement('div');
    tornEdge.className = 'torn-edge-shadow';
    
    // Create paper fragments container
    const fragmentsContainer = document.createElement('div');
    fragmentsContainer.className = 'paper-fragments';
    
    // Create sound effect
    const soundEffect = document.createElement('div');
    soundEffect.className = 'tear-sound-effect';
    
    // Add sound bars
    for (let i = 0; i < 6; i++) {
        const soundBar = document.createElement('div');
        soundBar.className = 'sound-wave-bar';
        soundEffect.appendChild(soundBar);
    }
    
    // Assemble overlay
    overlay.appendChild(paperLayer);
    overlay.appendChild(tornEdge);
    overlay.appendChild(fragmentsContainer);
    overlay.appendChild(soundEffect);
    document.body.appendChild(overlay);
    
    // Create paper fragments
    function createFragments() {
        for (let i = 0; i < 15; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'paper-fragment';
            fragment.style.left = (Math.random() * 25 + 70) + '%'; // Focus near tear
            fragment.style.top = Math.random() * 100 + '%';
            fragment.style.width = (Math.random() * 10 + 4) + 'px';
            fragment.style.height = (Math.random() * 16 + 6) + 'px';
            fragment.style.animationDelay = Math.random() * 0.5 + 's';
            fragmentsContainer.appendChild(fragment);
        }
    }
    
    // Execute transition sequence with immediate navigation
    setTimeout(() => {
        overlay.classList.add('active');
        
        setTimeout(() => {
            soundEffect.classList.add('active');
            paperLayer.classList.add('tearing');
            tornEdge.classList.add('active');
            createFragments();
            
            setTimeout(() => {
                paperLayer.classList.add('torn');
                
                // Navigate immediately without waiting for full animation
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 200); // Much shorter delay
            }, 400); // Reduced delay
        }, 100); // Reduced delay
    }, 50); // Minimal initial delay
}

// Export for use in other files
window.createTornPaperTransition = createTornPaperTransition;
