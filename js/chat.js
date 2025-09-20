// Chat functionality for BAPS.ai

// Google Programmable Search Engine configuration
const GOOGLE_API_KEY = "AIzaSyDCB4hLh3qLoy8jLSk3K0hAr78h_WzaLes";
const GOOGLE_CX = "97d54a1cf9e06404b"; // TODO: Replace with your actual Search Engine ID

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyAyHrwBa2n7l_RMQwA2Lcu6POOTvYSSqAg";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent";

// Chat state
let messages = [];
let isTyping = false;
let showQuickReplies = true;
let visibleTimestamps = new Set();
let isLoading = false;

// Initialize chat functionality
function initializeChat() {
    // Load chat history from localStorage
    loadChatHistory();
    
    // Set up event listeners
    setupChatEventListeners();
    
    // Show quick replies if no messages
    updateQuickRepliesVisibility();
}

// Set up chat event listeners
function setupChatEventListeners() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput) {
        chatInput.addEventListener('input', handleInputChange);
        chatInput.addEventListener('keypress', handleKeyPress);
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
}

// Handle input change
function handleInputChange(e) {
    const inputText = e.target.value.trim();
    const sendButton = document.getElementById('sendButton');
    
    if (sendButton) {
        sendButton.disabled = !inputText || isTyping || isLoading;
    }
}

// Handle key press
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const inputText = chatInput.value.trim();
    
    if (!inputText || isLoading) return;
    
    // Create user message
    const userMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date()
    };
    
    // Add user message
    addMessage(userMessage);
    
    // Clear input
    chatInput.value = '';
    chatInput.focus();
    
    // Update send button state
    const sendButton = document.getElementById('sendButton');
    if (sendButton) {
        sendButton.disabled = true;
    }
    
    // Show typing indicator
    setIsTyping(true);
    
    // Hide quick replies
    setQuickRepliesVisibility(false);
    
    // Generate bot response
    generateBotResponse(inputText);
}

// Send quick reply
function sendQuickReply(replyText) {
    // Set the input value and send
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = replyText;
        sendMessage();
    }
}

// Call Google Custom Search API
async function callGoogleSearchAPI(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Google Search API error');
    const data = await response.json();
    if (!data.items || !data.items.length) return "No results found.";
    // Format top 3 results, each on a new line
    return data.items.slice(0, 3).map((item, idx) =>
        `<b>Result ${idx + 1}:</b> <a href='${item.link}' target='_blank'>${item.title}</a><br>${item.snippet}`
    ).join("<br><br>");
}

// Generate bot response (now uses Google Search)
async function generateBotResponse(userText) {
    try {
        isLoading = true;
        updateLoadingState();
        // Call Google Search API
        const response = await callGoogleSearchAPI(userText);
        const botMessage = {
            id: (Date.now() + 1).toString(),
            text: response,
            isUser: false,
            timestamp: new Date()
        };
        addMessage(botMessage);
    } catch (error) {
        console.error('Error generating response:', error);
        // Fallback to Gemini or fallback response if needed
        const errorMessage = {
            id: (Date.now() + 1).toString(),
            text: "I'm sorry, I couldn't fetch search results right now. Please try again later.",
            isUser: false,
            timestamp: new Date()
        };
        addMessage(errorMessage);
    } finally {
        isLoading = false;
        setIsTyping(false);
        updateLoadingState();
    }
}

// Add message to chat
function addMessage(message) {
    messages.push(message);
    
    // Save to localStorage
    saveChatHistory();
    
    // Add to UI
    addMessageToUI(message);
    
    // Scroll to bottom
    scrollToBottom();
    
    // Update quick replies visibility
    updateQuickRepliesVisibility();
}

// Add message to UI
function addMessageToUI(message) {
    const messagesList = document.getElementById('messagesList');
    if (!messagesList) return;
    
    const messageElement = createMessageElement(message);
    messagesList.appendChild(messageElement);
}

// Create message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.isUser ? 'user' : 'bot'}`;
    messageDiv.setAttribute('data-message-id', message.id);
    
    // Create avatar
    const avatar = createAvatar(message.isUser);
    
    // Create message content
    const messageContent = createMessageContent(message);
    
    // Assemble message
    if (message.isUser) {
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
    }
    
    return messageDiv;
}

// Create avatar element
function createAvatar(isUser) {
    const avatar = document.createElement('div');
    avatar.className = `avatar ${isUser ? 'user' : 'bot'}`;
    
    if (isUser) {
        avatar.textContent = 'U';
    } else {
        const img = document.createElement('img');
        img.src = 'public/logo1.png';
        img.alt = 'BAPS Bot';
        img.className = 'avatar-image';
        avatar.appendChild(img);
    }
    
    return avatar;
}

// Create message content element
function createMessageContent(message) {
    const content = document.createElement('div');
    content.className = 'message-content';
    content.onclick = () => toggleTimestamp(message.id);

    // Add message text
    const text = document.createElement('div');
    text.className = 'message-text';
    if (message.isUser) {
        text.textContent = message.text;
    } else {
        text.innerHTML = message.text;
    }
    content.appendChild(text);

    // Add timestamp (initially hidden)
    const timestamp = document.createElement('div');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = message.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    content.appendChild(timestamp);

    return content;
}

// Toggle timestamp visibility
function toggleTimestamp(messageId) {
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (!messageElement) return;
    
    const timestamp = messageElement.querySelector('.message-timestamp');
    if (!timestamp) return;
    
    if (visibleTimestamps.has(messageId)) {
        visibleTimestamps.delete(messageId);
        timestamp.style.opacity = '0';
    } else {
        visibleTimestamps.add(messageId);
        timestamp.style.opacity = '1';
    }
}

// Set typing indicator state
function setIsTyping(typing) {
    isTyping = typing;
    const typingIndicator = document.getElementById('typingIndicator');
    
    if (typingIndicator) {
        if (typing) {
            typingIndicator.classList.remove('hidden');
        } else {
            typingIndicator.classList.add('hidden');
        }
    }
}

// Update loading state
function updateLoadingState() {
    const sendButton = document.getElementById('sendButton');
    const chatInput = document.getElementById('chatInput');
    
    if (sendButton) {
        sendButton.disabled = isLoading;
    }
    
    if (chatInput) {
        chatInput.disabled = isLoading;
    }
}

// Set quick replies visibility
function setQuickRepliesVisibility(visible) {
    showQuickReplies = visible;
    updateQuickRepliesVisibility();
}

// Update quick replies visibility
function updateQuickRepliesVisibility() {
    const quickReplies = document.getElementById('quickReplies');
    if (!quickReplies) return;
    
    if (showQuickReplies && messages.length === 0) {
        quickReplies.classList.remove('hidden');
    } else {
        quickReplies.classList.add('hidden');
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Clear chat history
function clearChatHistory() {
    if (confirm("Are you sure you want to clear your chat history? This action cannot be undone.")) {
        messages = [];
        visibleTimestamps.clear();
        
        // Clear UI
        const messagesList = document.getElementById('messagesList');
        if (messagesList) {
            messagesList.innerHTML = '';
        }
        
        // Show welcome message
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        
        // Show quick replies
        setQuickRepliesVisibility(true);
        
        // Save to localStorage
        saveChatHistory();
        
        // Scroll to top
        const messagesContainer = document.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = 0;
        }
    }
}

// Save chat history to localStorage
function saveChatHistory() {
    try {
        const chatData = {
            messages: messages.map(msg => ({
                ...msg,
                timestamp: msg.timestamp.toISOString()
            })),
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('bapsChatHistory', JSON.stringify(chatData));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
}

// Load chat history from localStorage
function loadChatHistory() {
    try {
        const savedData = localStorage.getItem('bapsChatHistory');
        if (savedData) {
            const chatData = JSON.parse(savedData);
            messages = chatData.messages.map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
            }));
            
            // Add messages to UI
            messages.forEach(message => {
                addMessageToUI(message);
            });
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        messages = [];
    }
}

// Get chat statistics
function getChatStatistics() {
    const totalMessages = messages.length;
    const userMessages = messages.filter(m => m.isUser).length;
    const botMessages = messages.filter(m => !m.isUser).length;
    const firstMessage = messages.length > 0 ? messages[0].timestamp : null;
    const lastMessage = messages.length > 0 ? messages[messages.length - 1].timestamp : null;
    
    return {
        totalMessages,
        userMessages,
        botMessages,
        firstMessage,
        lastMessage,
        sessionDuration: firstMessage && lastMessage ? 
            (lastMessage - firstMessage) / 1000 : 0
    };
}

// Export functions for use in other modules
window.sendMessage = sendMessage;
window.sendQuickReply = sendQuickReply;
window.clearChatHistory = clearChatHistory;
window.handleKeyPress = handleKeyPress;
