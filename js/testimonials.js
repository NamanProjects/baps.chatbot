// Testimonials functionality for BAPS.ai

let testimonialsInterval;
let currentTestimonialIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// Testimonials data
const testimonials = [
    {
        name: "Rajesh Patel",
        location: "London, UK",
        text: "BAPS has transformed my spiritual journey. The teachings and community support have brought peace and purpose to my life.",
        image: "public/logo1.png"
    },
    {
        name: "Priya Sharma",
        location: "New Jersey, USA",
        text: "The volunteer opportunities at BAPS have allowed me to serve others while growing spiritually. It's truly life-changing.",
        image: "public/logo1.png"
    },
    {
        name: "Amit Desai",
        location: "Toronto, Canada",
        text: "The wisdom and guidance from BAPS saints have helped me navigate life's challenges with faith and resilience.",
        image: "public/logo1.png"
    }
];

// Initialize testimonials functionality
function initializeTestimonials() {
    // Set up auto-rotation
    startTestimonialsRotation();
    
    // Set up manual navigation
    setupTestimonialIndicators();
    
    // Set up touch/swipe support for mobile
    setupTouchSupport();
    
    // Set initial testimonial
    updateTestimonialDisplay(0);
}

// Start automatic rotation of testimonials
function startTestimonialsRotation() {
    testimonialsInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonialDisplay(currentTestimonialIndex);
        updateIndicators(currentTestimonialIndex);
    }, 5000); // 5 seconds
}

// Stop automatic rotation
function stopTestimonialsRotation() {
    if (testimonialsInterval) {
        clearInterval(testimonialsInterval);
        testimonialsInterval = null;
    }
}

// Update testimonial display
function updateTestimonialDisplay(index) {
    const testimonial = testimonials[index];
    
    // Update image
    const imageElement = document.getElementById('testimonialImage');
    if (imageElement) {
        imageElement.src = testimonial.image;
        imageElement.alt = testimonial.name;
    }
    
    // Update text
    const textElement = document.getElementById('testimonialText');
    if (textElement) {
        textElement.textContent = testimonial.text;
    }
    
    // Update name
    const nameElement = document.getElementById('testimonialName');
    if (nameElement) {
        nameElement.textContent = testimonial.name;
    }
    
    // Update location
    const locationElement = document.getElementById('testimonialLocation');
    if (locationElement) {
        locationElement.textContent = testimonial.location;
    }
    
    // Add fade transition effect
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard) {
        testimonialCard.style.opacity = '0';
        setTimeout(() => {
            testimonialCard.style.opacity = '1';
        }, 150);
    }
}

// Set up testimonial indicators
function setupTestimonialIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            // Stop auto-rotation temporarily
            stopTestimonialsRotation();
            
            // Update to selected testimonial
            currentTestimonialIndex = index;
            updateTestimonialDisplay(index);
            updateIndicators(index);
            
            // Restart auto-rotation after a delay
            setTimeout(() => {
                startTestimonialsRotation();
            }, 3000);
        });
    });
}

// Update indicator states
function updateIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Set up touch support for mobile devices
function setupTouchSupport() {
    const testimonialCard = document.querySelector('.testimonial-card');
    
    if (!testimonialCard) return;
    
    testimonialCard.addEventListener('touchstart', handleTouchStart, { passive: true });
    testimonialCard.addEventListener('touchmove', handleTouchMove, { passive: true });
    testimonialCard.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Handle touch start
function handleTouchStart(e) {
    touchStartX = e.targetTouches[0].clientX;
}

// Handle touch move
function handleTouchMove(e) {
    touchEndX = e.targetTouches[0].clientX;
}

// Handle touch end
function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
        // Swipe left - go to next
        goToNextTestimonial();
    } else if (isRightSwipe) {
        // Swipe right - go to previous
        goToPreviousTestimonial();
    }
    
    // Reset touch values
    touchStartX = 0;
    touchEndX = 0;
}

// Go to next testimonial
function goToNextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonialDisplay(currentTestimonialIndex);
    updateIndicators(currentTestimonialIndex);
    
    // Reset auto-rotation timer
    resetTestimonialsTimer();
}

// Go to previous testimonial
function goToPreviousTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonialDisplay(currentTestimonialIndex);
    updateIndicators(currentTestimonialIndex);
    
    // Reset auto-rotation timer
    resetTestimonialsTimer();
}

// Reset testimonials timer
function resetTestimonialsTimer() {
    stopTestimonialsRotation();
    setTimeout(() => {
        startTestimonialsRotation();
    }, 5000);
}

// Pause testimonials when page is not visible
function pauseTestimonials() {
    stopTestimonialsRotation();
}

// Resume testimonials when page becomes visible
function resumeTestimonials() {
    if (!testimonialsInterval) {
        startTestimonialsRotation();
    }
}

// Manual navigation functions
function goToTestimonial(index) {
    if (index >= 0 && index < testimonials.length) {
        currentTestimonialIndex = index;
        updateTestimonialDisplay(index);
        updateIndicators(index);
        resetTestimonialsTimer();
    }
}

// Get current testimonial
function getCurrentTestimonial() {
    return testimonials[currentTestimonialIndex];
}

// Add new testimonial
function addTestimonial(testimonial) {
    testimonials.push(testimonial);
    
    // Add new indicator
    addTestimonialIndicator();
}

// Add testimonial indicator
function addTestimonialIndicator() {
    const indicatorsContainer = document.querySelector('.testimonial-indicators');
    if (!indicatorsContainer) return;
    
    const newIndicator = document.createElement('button');
    newIndicator.className = 'indicator';
    newIndicator.setAttribute('data-index', testimonials.length - 1);
    
    newIndicator.addEventListener('click', () => {
        const index = parseInt(newIndicator.getAttribute('data-index'));
        goToTestimonial(index);
    });
    
    indicatorsContainer.appendChild(newIndicator);
}

// Remove testimonial
function removeTestimonial(index) {
    if (index >= 0 && index < testimonials.length) {
        testimonials.splice(index, 1);
        
        // Adjust current index if necessary
        if (currentTestimonialIndex >= testimonials.length) {
            currentTestimonialIndex = Math.max(0, testimonials.length - 1);
        }
        
        // Update indicators
        updateTestimonialIndicators();
        
        // Update display
        updateTestimonialDisplay(currentTestimonialIndex);
        updateIndicators(currentTestimonialIndex);
    }
}

// Update testimonial indicators after changes
function updateTestimonialIndicators() {
    const indicatorsContainer = document.querySelector('.testimonial-indicators');
    if (!indicatorsContainer) return;
    
    // Clear existing indicators
    indicatorsContainer.innerHTML = '';
    
    // Add new indicators
    testimonials.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        indicator.setAttribute('data-index', index);
        
        if (index === currentTestimonialIndex) {
            indicator.classList.add('active');
        }
        
        indicator.addEventListener('click', () => {
            goToTestimonial(index);
        });
        
        indicatorsContainer.appendChild(indicator);
    });
}

// Cleanup function
function cleanupTestimonials() {
    stopTestimonialsRotation();
    
    // Remove event listeners
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard) {
        testimonialCard.removeEventListener('touchstart', handleTouchStart);
        testimonialCard.removeEventListener('touchmove', handleTouchMove);
        testimonialCard.removeEventListener('touchend', handleTouchEnd);
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseTestimonials();
    } else {
        resumeTestimonials();
    }
});

// Export functions for use in other modules
window.initializeTestimonials = initializeTestimonials;
window.stopTestimonialsRotation = stopTestimonialsRotation;
window.pauseTestimonials = pauseTestimonials;
window.resumeTestimonials = resumeTestimonials;
window.goToTestimonial = goToTestimonial;
window.goToNextTestimonial = goToNextTestimonial;
window.goToPreviousTestimonial = goToPreviousTestimonial;
window.getCurrentTestimonial = getCurrentTestimonial;
window.addTestimonial = addTestimonial;
window.removeTestimonial = removeTestimonial;
window.cleanupTestimonials = cleanupTestimonials;
