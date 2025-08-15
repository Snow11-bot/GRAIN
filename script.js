// Counter functionality
let count = 0;
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');

incrementBtn.addEventListener('click', () => {
    count++;
    countElement.textContent = count;
    animateCount();
});

decrementBtn.addEventListener('click', () => {
    count--;
    countElement.textContent = count;
    animateCount();
});

function animateCount() {
    countElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
    }, 150);
}

// Color theme changer
const themes = ['theme-ocean', 'theme-sunset', 'theme-forest', 'theme-purple'];
let currentTheme = 0;

const colorBtn = document.getElementById('colorBtn');
const body = document.body;

colorBtn.addEventListener('click', () => {
    // Remove current theme
    body.classList.remove(...themes);
    
    // Add next theme
    currentTheme = (currentTheme + 1) % themes.length;
    body.classList.add(themes[currentTheme]);
    
    // Update button text
    const themeNames = ['Ocean', 'Sunset', 'Forest', 'Purple'];
    colorBtn.textContent = `Theme: ${themeNames[currentTheme]}`;
    
    // Add click animation
    colorBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        colorBtn.style.transform = 'scale(1)';
    }, 100);
});

// Add some interactive hover effects
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.background = '#cbd5e0';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.background = '#edf2f7';
    });
});

// Initialize with ocean theme
body.classList.add('theme-ocean');