// Statistics Counter functionality for BAPS.ai

let statisticsInitialized = false;
let animationFrames = {};

// Initialize statistics counter functionality
function initializeStatisticsCounter() {
    if (statisticsInitialized) {
        return;
    }
    
    // Set up intersection observer to trigger animations when in view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statisticItem = entry.target;
                const numberElement = statisticItem.querySelector('.statistic-number');
                
                if (numberElement && !numberElement.classList.contains('animated')) {
                    animateStatistic(numberElement);
                    numberElement.classList.add('animated');
                }
            }
        });
    }, observerOptions);
    
    // Observe all statistic items
    const statisticItems = document.querySelectorAll('.statistic-item');
    statisticItems.forEach(item => {
        observer.observe(item);
    });
    
    statisticsInitialized = true;
}

// Animate a single statistic number
function animateStatistic(numberElement) {
    const endValue = parseInt(numberElement.getAttribute('data-end'));
    const suffix = numberElement.textContent.replace(/[0-9]/g, '') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    // Cancel any existing animation
    if (animationFrames[numberElement.id]) {
        cancelAnimationFrame(animationFrames[numberElement.id]);
    }
    
    // Create unique ID if none exists
    if (!numberElement.id) {
        numberElement.id = 'stat-' + Math.random().toString(36).substr(2, 9);
    }
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(endValue * easeOutQuart);
        
        // Update the display
        numberElement.textContent = currentValue.toLocaleString() + suffix;
        
        // Continue animation if not complete
        if (progress < 1) {
            animationFrames[numberElement.id] = requestAnimationFrame(updateNumber);
        } else {
            // Ensure final value is exact
            numberElement.textContent = endValue.toLocaleString() + suffix;
            delete animationFrames[numberElement.id];
        }
    }
    
    // Start the animation
    animationFrames[numberElement.id] = requestAnimationFrame(updateNumber);
}

// Reset statistics for re-animation
function resetStatistics() {
    const statisticNumbers = document.querySelectorAll('.statistic-number');
    statisticNumbers.forEach(numberElement => {
        numberElement.classList.remove('animated');
        numberElement.textContent = '0';
    });
    
    // Cancel any ongoing animations
    Object.values(animationFrames).forEach(frameId => {
        cancelAnimationFrame(frameId);
    });
    animationFrames = {};
}

// Pause statistics animation when page is not visible
function pauseStatisticsAnimation() {
    Object.values(animationFrames).forEach(frameId => {
        cancelAnimationFrame(frameId);
    });
    animationFrames = {};
}

// Resume statistics animation when page becomes visible
function resumeStatisticsAnimation() {
    // Re-initialize to trigger animations again
    statisticsInitialized = false;
    initializeStatisticsCounter();
}

// Manual trigger for statistics animation
function triggerStatisticsAnimation() {
    resetStatistics();
    initializeStatisticsCounter();
}

// Get current statistics values
function getCurrentStatistics() {
    const statistics = {};
    const statisticItems = document.querySelectorAll('.statistic-item');
    
    statisticItems.forEach(item => {
        const label = item.querySelector('.statistic-label').textContent;
        const number = item.querySelector('.statistic-number').textContent;
        statistics[label] = number;
    });
    
    return statistics;
}

// Update statistics with new values
function updateStatistics(newValues) {
    Object.keys(newValues).forEach(label => {
        const statisticItem = document.querySelector(`.statistic-item:has(.statistic-label:contains("${label}"))`);
        if (statisticItem) {
            const numberElement = statisticItem.querySelector('.statistic-number');
            const newValue = newValues[label];
            numberElement.setAttribute('data-end', newValue);
            
            // Reset animation state
            numberElement.classList.remove('animated');
            numberElement.textContent = '0';
        }
    });
    
    // Re-initialize to trigger new animations
    resetStatistics();
    initializeStatisticsCounter();
}

// Cleanup function
function cleanupStatistics() {
    // Cancel any ongoing animations
    Object.values(animationFrames).forEach(frameId => {
        cancelAnimationFrame(frameId);
    });
    animationFrames = {};
    
    // Remove intersection observers
    const statisticItems = document.querySelectorAll('.statistic-item');
    statisticItems.forEach(item => {
        item.classList.remove('animated');
    });
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseStatisticsAnimation();
    } else {
        resumeStatisticsAnimation();
    }
});

// Export functions for use in other modules
window.initializeStatisticsCounter = initializeStatisticsCounter;
window.resetStatistics = resetStatistics;
window.pauseStatisticsAnimation = pauseStatisticsAnimation;
window.resumeStatisticsAnimation = resumeStatisticsAnimation;
window.triggerStatisticsAnimation = triggerStatisticsAnimation;
window.getCurrentStatistics = getCurrentStatistics;
window.updateStatistics = updateStatistics;
window.cleanupStatistics = cleanupStatistics;
