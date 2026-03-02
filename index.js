const loadingscreen_duration = 3000;

// Binary animation (binaryCanvas) - KEPT AS-IS
function createBinaryAnimation() {
    const container = document.getElementById('binaryCanvas');
    if (!container) return;

    const binaryChars = '01';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.top = '-100px';
        column.style.left = (i * 20) + 'px';
        column.style.width = '20px';
        column.style.height = '100px';
        column.style.textAlign = 'center';
        column.style.fontSize = '14px';
        column.style.color = 'rgba(0, 191, 255, 0.2)';
        column.style.fontFamily = 'monospace';
        column.style.lineHeight = '20px';

        let binaryString = '';
        let position = -100;
        const speed = 1 + Math.random() * 2;

        function animate() {
            position += speed;
            if (position > window.innerHeight) {
                position = -600;
                binaryString = '';
                for (let j = 0; j < 30; j++) {
                    binaryString += `\n${binaryChars.charAt(Math.floor(Math.random() * binaryChars.length))}`;
                }
                column.textContent = binaryString;
            }
            column.style.top = position + 'px';
            requestAnimationFrame(animate);
        }

        animate();
        container.appendChild(column);
    }
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Check if element is in viewport
function isInViewport(element, threshold = 0.2) {
    // threshold defines how much of the element should be visible (0 = any part, 1 = fully)
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vertInView = rect.top <= vh * (1 - threshold) && rect.bottom >= vh * threshold;
    const horInView = rect.left <= vw && rect.right >= 0;
    return vertInView && horInView;
}

// Handle scroll animations
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        if (isInViewport(element)) {
            element.style.animationPlayState = 'running';
        }
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection && isInViewport(skillsSection, 0.4)) {
        animateSkillBars();
    }
}

// Create binary background for loading screen
function createBinaryBackground() {
    const container = document.getElementById('binaryBackground');
    if (!container) return;

    const binaryChars = '01';
    const digitCount = 150;

    for (let i = 0; i < digitCount; i++) {
        const digit = document.createElement('div');
        digit.className = 'binary-digit';
        digit.textContent = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        digit.style.left = Math.random() * 100 + '%';
        digit.style.top = Math.random() * 100 + '%';

        let opacity = 0;
        let direction = 1;

        function animateDigit() {
            opacity += 0.02 * direction;
            if (opacity >= 0.5) direction = -1;
            if (opacity <= 0) direction = 1;
            digit.style.opacity = opacity;

            if (Math.random() < 0.02) {
                digit.textContent = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            }
            requestAnimationFrame(animateDigit);
        }

        animateDigit();
        container.appendChild(digit);
    }
}

// Create particles for loading screen (fixed: single shared stylesheet)
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const particleCount = 80;
    let keyframes = '';

    for (let i = 0; i < particleCount; i++) {
        const dx = Math.random() * 100 - 50;
        const dy = Math.random() * 100 - 50;
        keyframes += `
            @keyframes particleFloat${i} {
                0% { transform: translate(0, 0); opacity: 0; }
                10% { opacity: 0.7; }
                90% { opacity: 0.7; }
                100% { transform: translate(${dx}px, ${dy}px); opacity: 0; }
            }
        `;
    }

    // Single style element for all particle animations
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;
        particle.style.animation = `particleFloat${i} ${duration}s infinite ${delay}s`;

        container.appendChild(particle);
    }
}

// Add flicker effect to letters
function addFlickerEffect() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        setInterval(() => {
            if (Math.random() < 0.1) {
                letter.style.opacity = 0.7;
                setTimeout(() => {
                    letter.style.opacity = 1;
                }, 100);
            }
        }, 500);
    });
}

// Hide loading screen after animation completes
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, loadingscreen_duration);
}

// Single DOMContentLoaded handler
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen animations
    createBinaryBackground();
    createParticles();
    addFlickerEffect();
    hideLoadingScreen();

    // Main page animations
    createBinaryAnimation();

    // Initialize fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.animationPlayState = 'paused';
    });

    // Scroll listener
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();
    // Fallback: animate skills on load in case the section starts in view on small screens
    animateSkillBars();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = e.target[0].value;
            const email = e.target[1].value;
            const subject = e.target[2].value;
            const message = e.target[3].value;

            const loader = document.getElementById('loader');
            const btn = document.getElementById('submitBtn');

            if (loader) loader.style.display = 'block';
            if (btn) btn.disabled = true;

            try {
                const res = await fetch('https://ochea-lean-portfolio-backend.onrender.com/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message }),
                });

                const data = await res.json();
                alert(data.message);
            } catch (err) {
                alert('Failed to send email. Please try again later.');
                console.error(err);
            } finally {
                if (loader) loader.style.display = 'none';
                if (btn) btn.disabled = false;
            }

            e.target.reset();
        });
    }
});
