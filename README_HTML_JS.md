# BAPS.ai - HTML/CSS/JavaScript Version

This is a converted version of the BAPS.ai Next.js React application to vanilla HTML, CSS, and JavaScript. The application provides a beautiful, responsive interface for learning about BAPS (Bochasanwasi Akshar Purushottam Swaminarayan Sanstha) teachings and includes an AI-powered chatbot.

## Features

### 🏠 Home Page
- **Hero Section**: Welcome message with call-to-action buttons
- **Rotating Images**: Automatic image rotation showcasing BAPS temples
- **Statistics Counter**: Animated counters showing BAPS worldwide impact
- **Feature Cards**: Information about how the chatbot can help users
- **Testimonials**: Rotating testimonials from community members
- **Responsive Design**: Mobile-first approach with beautiful animations

### 💬 Chat Page
- **AI Chatbot**: Interactive chatbot with BAPS knowledge
- **Quick Replies**: Pre-defined questions for easy interaction
- **Message History**: Persistent chat history using localStorage
- **Typing Indicators**: Visual feedback during bot responses
- **Rich Messages**: Support for different message types
- **Mobile Optimized**: Touch-friendly interface with swipe support

## File Structure

```
BAPS_1-main/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── js/
│   ├── main.js            # Main application logic
│   ├── rotating-image.js  # Image rotation functionality
│   ├── statistics-counter.js # Animated counters
│   ├── testimonials.js    # Testimonials carousel
│   └── chat.js            # Chat functionality
├── public/                 # Images and assets
│   ├── logo1.png
│   ├── i1.jpeg
│   ├── i2.jpeg
│   ├── i3.jpeg
│   ├── i4.jpeg
│   └── i5.jpeg
└── README_HTML_JS.md      # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Download or clone the project files
2. Ensure all files are in the correct directory structure
3. Open `index.html` in your web browser

### Running the Application
- **Local Development**: Simply open `index.html` in your browser
- **Web Server**: For production, upload all files to a web server
- **Live Server**: Use VS Code Live Server extension for development

## Usage

### Navigation
- **Home Page**: Landing page with BAPS information and features
- **Chat Page**: Access via "Explore BAPS Teachings" or "Ask the BAPS Chatbot" buttons
- **Back Navigation**: Use the back arrow in the chat header

### Chat Functionality
- **Type Questions**: Ask about BAPS teachings, history, philosophy, etc.
- **Quick Replies**: Click on suggested questions for instant responses
- **Message History**: Chat history is automatically saved and restored
- **Clear History**: Use the trash icon to clear chat history

### Interactive Elements
- **Rotating Images**: Click on images to manually navigate
- **Statistics**: Animated counters that trigger when scrolled into view
- **Testimonials**: Swipe or click indicators to navigate testimonials
- **Responsive Design**: Optimized for all device sizes

## Customization

### Colors and Branding
The application uses BAPS brand colors defined in CSS variables:
```css
:root {
    --baps-red: #a41c20;
    --baps-gold: #f3b24d;
}
```

### Content Updates
- **Testimonials**: Edit the `testimonials` array in `js/testimonials.js`
- **Statistics**: Update the `data-end` attributes in `index.html`
- **Images**: Replace images in the `public/` folder
- **Chat Responses**: Modify the `simulateBotResponse` function in `js/chat.js`

### Styling
- **CSS Variables**: Modify colors, fonts, and spacing in `styles.css`
- **Animations**: Adjust timing and effects in the CSS animations
- **Responsive Breakpoints**: Customize mobile/tablet/desktop layouts

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features Used**: ES6+, CSS Grid, Flexbox, Intersection Observer API

## Performance Features

- **Lazy Loading**: Images and animations load when needed
- **Efficient Animations**: Uses CSS transforms and opacity for smooth performance
- **Local Storage**: Chat history persists without server calls
- **Responsive Images**: Optimized for different screen sizes
- **Touch Optimized**: Smooth touch interactions on mobile devices

## API Integration

The current version includes a simulated chatbot. To integrate with a real API:

1. Replace the `simulateBotResponse` function in `js/chat.js`
2. Update the API endpoint in the function
3. Handle authentication if required
4. Implement proper error handling

Example API integration:
```javascript
async function generateBotResponse(userText) {
    try {
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: userText })
        });
        
        const data = await response.json();
        return data.answer;
    } catch (error) {
        return "Sorry, I'm having trouble connecting right now.";
    }
}
```

## Troubleshooting

### Common Issues
- **Images Not Loading**: Check file paths in the `public/` folder
- **Chat Not Working**: Ensure JavaScript is enabled in your browser
- **Styling Issues**: Clear browser cache or check CSS file loading
- **Mobile Issues**: Test on different devices and screen sizes

### Debug Mode
Open browser developer tools (F12) to:
- Check for JavaScript errors in the Console
- Inspect CSS styles in the Elements tab
- Monitor network requests in the Network tab
- Test responsive design in the Device toolbar

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across different browsers
5. Submit a pull request

## License

This project is part of the BAPS.ai application. Please respect the original project's licensing terms.

## Support

For technical support or questions about the conversion:
- Check the browser console for error messages
- Verify all files are in the correct directory structure
- Ensure your browser supports the required features
- Test with a different browser to isolate issues

## Future Enhancements

Potential improvements for the HTML/CSS/JS version:
- **Service Worker**: Add offline functionality and caching
- **Progressive Web App**: Make it installable on mobile devices
- **Enhanced Animations**: Add more sophisticated CSS animations
- **Accessibility**: Improve screen reader support and keyboard navigation
- **Performance**: Implement virtual scrolling for long chat histories
- **Themes**: Add light/dark mode toggle
- **Localization**: Support for multiple languages
- **Analytics**: Add usage tracking and analytics

---

**Note**: This is a static HTML/CSS/JS conversion of the original Next.js React application. All functionality runs in the browser without requiring a server or build process.
