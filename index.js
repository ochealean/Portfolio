const loadingscreen_duration = 3000;


// Binary animation
function createBinaryAnimation() {
    const container = document.getElementById('binaryCanvas');
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

        // Create binary characters
        let binaryString = '';

        // Animation
        let position = -100;
        const speed = 1 + Math.random() * 2;

        function animate() {
            position += speed;
            if (position > window.innerHeight) {
                position = -600;
                // Regenerate binary string
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
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle scroll animations
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        if (isInViewport(element)) {
            element.style.animationPlayState = 'running';
        }
    });

    // Animate skill bars when skills section is in view
    const skillsSection = document.getElementById('skills');
    if (isInViewport(skillsSection)) {
        animateSkillBars();
    }
}

// Create binary background for loading screen
function createBinaryBackground() {
    const container = document.getElementById('binaryBackground');
    const binaryChars = '01';
    const digitCount = 150;

    for (let i = 0; i < digitCount; i++) {
        const digit = document.createElement('div');
        digit.className = 'binary-digit';
        digit.textContent = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        digit.style.left = Math.random() * 100 + '%';
        digit.style.top = Math.random() * 100 + '%';
        digit.style.animationDelay = Math.random() * 5 + 's';

        // Animation
        let opacity = 0;
        let direction = 1;

        function animateDigit() {
            opacity += 0.02 * direction;
            if (opacity >= 0.5) direction = -1;
            if (opacity <= 0) direction = 1;

            digit.style.opacity = opacity;

            // Occasionally change the digit
            if (Math.random() < 0.02) {
                digit.textContent = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            }

            requestAnimationFrame(animateDigit);
        }

        animateDigit();
        container.appendChild(digit);
    }
}

// Create particles for loading screen
function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Animation
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;

        particle.style.animation = `particleFloat ${duration}s infinite ${delay}s`;

        // Add custom animation
        const style = document.createElement('style');
        style.textContent = `
                    @keyframes particleFloat {
                        0% {
                            transform: translate(0, 0);
                            opacity: 0;
                        }
                        10% {
                            opacity: 0.7;
                        }
                        90% {
                            opacity: 0.7;
                        }
                        100% {
                            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                            opacity: 0;
                        }
                    }
                `;
        document.head.appendChild(style);

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
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, loadingscreen_duration); // Show for 3 seconds
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', () => {
    createBinaryBackground();
    createParticles();
    addFlickerEffect();
    hideLoadingScreen();
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    createBinaryAnimation();

    // Initialize all fade-in elements with paused animation
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.animationPlayState = 'paused';
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);

    // Trigger once on load in case elements are already in view
    handleScrollAnimations();

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

    // Form submission
    document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const subject = e.target[2].value;
        const message = e.target[3].value;

        const loader = document.getElementById("loader");
        const btn = document.getElementById("submitBtn");

        loader.style.display = "block";
        btn.disabled = true;

        try {
            const res = await fetch("https://ochea-lean-portfolio-backend.onrender.com/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await res.json();
            alert(data.message);
        } catch (err) {
            alert("Failed to send email. Please try again later.");
            console.error(err);
        } finally {
            loader.style.display = "none";
            btn.disabled = false;
        }

        // reset the form
        e.target.reset();
    });
});