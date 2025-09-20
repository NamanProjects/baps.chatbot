// Rotating Image functionality for BAPS.ai

let rotatingImageInterval;
let currentImageIndex = 0;

// Array of images to rotate through
const rotatingImages = [
    'public/i1.jpeg',
    'public/i2.jpeg',
    'public/i3.jpeg',
    'public/i4.jpeg',
    'public/i5.jpeg'
];

// Initialize rotating image functionality
function initializeRotatingImage() {
    const rotatingImageElement = document.getElementById('rotatingImage');
    
    if (!rotatingImageElement) {
        console.warn('Rotating image element not found');
        return;
    }
    
    // Filter out any invalid images
    const validImages = rotatingImages.filter(src => 
        typeof src === 'string' && src.trim().length > 0
    );
    
    if (validImages.length <= 1) {
        console.log('Not enough images to rotate');
        return;
    }
    
    // Set initial image
    currentImageIndex = 0;
    rotatingImageElement.src = validImages[0];
    
    // Start rotation interval
    startImageRotation(validImages);
}

// Start the image rotation
function startImageRotation(images) {
    const intervalMs = 3000; // 2.5 seconds
    
    rotatingImageInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const rotatingImageElement = document.getElementById('rotatingImage');
        
        if (rotatingImageElement) {
            // Add fade transition effect
            rotatingImageElement.style.opacity = '0.6';
            
            setTimeout(() => {
                rotatingImageElement.src = images[currentImageIndex];
                rotatingImageElement.style.opacity = '1';
            }, 150); // Half of transition time
        }
    }, intervalMs);
}

// Stop the image rotation
function stopImageRotation() {
    if (rotatingImageInterval) {
        clearInterval(rotatingImageInterval);
        rotatingImageInterval = null;
    }
}

// Pause rotation when page is not visible
function pauseImageRotation() {
    if (rotatingImageInterval) {
        stopImageRotation();
    }
}

// Resume rotation when page becomes visible
function resumeImageRotation() {
    if (!rotatingImageInterval) {
        const validImages = rotatingImages.filter(src => 
            typeof src === 'string' && src.trim().length > 0
        );
        if (validImages.length > 1) {
            startImageRotation(validImages);
        }
    }
}

// Manual navigation functions
function goToNextImage() {
    const validImages = rotatingImages.filter(src => 
        typeof src === 'string' && src.trim().length > 0
    );
    
    if (validImages.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % validImages.length;
        const rotatingImageElement = document.getElementById('rotatingImage');
        
        if (rotatingImageElement) {
            rotatingImageElement.src = validImages[currentImageIndex];
        }
    }
}

function goToPreviousImage() {
    const validImages = rotatingImages.filter(src => 
        typeof src === 'string' && src.trim().length > 0
    );
    
    if (validImages.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + validImages.length) % validImages.length;
        const rotatingImageElement = document.getElementById('rotatingImage');
        
        if (rotatingImageElement) {
            rotatingImageElement.src = validImages[currentImageIndex];
        }
    }
}

// Add click event listeners for manual navigation (optional)
function addImageNavigationListeners() {
    const rotatingImageElement = document.getElementById('rotatingImage');
    
    if (rotatingImageElement) {
        // Click to go to next image
        rotatingImageElement.addEventListener('click', goToNextImage);
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                goToNextImage();
            } else if (e.key === 'ArrowLeft') {
                goToPreviousImage();
            }
        });
    }
}

// Cleanup function
function cleanupRotatingImage() {
    stopImageRotation();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add navigation listeners
    addImageNavigationListeners();
});

// Export functions for use in other modules
window.initializeRotatingImage = initializeRotatingImage;
window.stopImageRotation = stopImageRotation;
window.pauseImageRotation = pauseImageRotation;
window.resumeImageRotation = resumeImageRotation;
window.goToNextImage = goToNextImage;
window.goToPreviousImage = goToPreviousImage;
window.cleanupRotatingImage = cleanupRotatingImage;
