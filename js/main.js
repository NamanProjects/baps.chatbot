// Main JavaScript file for BAPS.ai application

// Global variables
let currentPage = 'home';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize statistics counter
    initializeStatisticsCounter();
    
    // Initialize rotating image
    initializeRotatingImage();
    
    // Initialize testimonials
    initializeTestimonials();
    
    // Initialize chat functionality
    initializeChat();
    
    // Show home page by default
    showPage('home');
}

// Navigation functions
function navigateToChat() {
    showPage('chat');
    currentPage = 'chat';
}

function navigateToHome() {
    showPage('home');
    currentPage = 'home';
}

// Show/hide pages
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update current page
    currentPage = pageName;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize page-specific functionality
    if (pageName === 'chat') {
        initializeChatPage();
    } else if (pageName === 'home') {
        initializeHomePage();
    }
}

// Initialize home page specific functionality
function initializeHomePage() {
    // Trigger animations when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.animate-slide-up, .animate-slide-up-delay, .animate-slide-up-delay-2');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Initialize chat page specific functionality
function initializeChatPage() {
    // Focus on chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        setTimeout(() => {
            chatInput.focus();
        }, 100);
    }
    
    // Scroll to bottom of messages
    scrollToBottom();
}

// Utility functions
function scrollToBottom() {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate any layout-dependent elements
    if (currentPage === 'chat') {
        scrollToBottom();
    }
});

// Handle page visibility change (when user switches tabs)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        pauseAnimations();
    } else {
        // Page is visible again, resume animations
        resumeAnimations();
    }
});

// Pause animations when page is not visible
function pauseAnimations() {
    // This can be used to pause any ongoing animations
    // For now, we'll just log it
    console.log('Page hidden, animations paused');
}

// Resume animations when page becomes visible
function resumeAnimations() {
    // This can be used to resume any paused animations
    console.log('Page visible, animations resumed');
}



// Export functions for use in other modules
window.navigateToChat = navigateToChat;
window.navigateToHome = navigateToHome;
