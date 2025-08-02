// ===== CAROUSEL STATE MANAGEMENT =====
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

function getIconForCategory(message) {
  if (message.includes('Bed')) return '🛏️';
  if (message.includes('Chair')) return '🪑';
  if (message.includes('Table')) return '🪑';
  return '🛒';
}

function filterProductsByCategory(category) {
  // This function can be used to filter the carousel products
  // For now, it provides visual feedback and could integrate with product filtering
  
  // Example: You could hide/show specific products based on category
  // or scroll to relevant products in the carousel
  
  // Create a notification
  showNotification(`Browsing ${category.charAt(0).toUpperCase() + category.slice(1)}s`);
}

function showCategoryNotification(category) {
  // Create temporary notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(255,215,0,0.9), rgba(255,215,0,0.7));
    color: #000;
    padding: 15px 25px;
    border-radius: 25px;
    font-weight: 600;
    z-index: 1000;
    transform: translateX(300px);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(255,215,0,0.3);
  `;
  
  notification.textContent = `Browsing ${category.charAt(0).toUpperCase() + category.slice(1)}s`;
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(300px)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add CSS animation for category selection
const style = document.createElement('style');
style.textContent = `
  @keyframes categorySelect {
    0% { transform: translateY(-10px) scale(1.1); }
    50% { transform: translateY(-20px) scale(1.15); }
    100% { transform: translateY(-10px) scale(1.1); }
  }
  
  @keyframes pulse {
    0% { transform: translateX(-50%) translateY(0) scale(1); }
    50% { transform: translateX(-50%) translateY(0) scale(1.05); }
    100% { transform: translateX(-50%) translateY(0) scale(1); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .carousel-wrapper {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .category-notification {
    animation: slideInBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes slideInBounce {
    0% {
      transform: translateX(-50%) translateY(-100px) scale(0.5);
      opacity: 0;
    }
    50% {
      transform: translateX(-50%) translateY(10px) scale(1.1);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize chair carousel as default
  switchCarousel('chair');
  
  // Set default active category
  const defaultCategory = document.querySelector('[data-category="chair"]');
  if (defaultCategory) {
    defaultCategory.classList.add('active');
  }
});

// Initialize carousel for window resize
window.addEventListener('resize', function() {
  updateCarousel(currentCarousel);
});
