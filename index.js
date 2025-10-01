// Binary animation
function createBinaryAnimation() {
    const container = document.getElementById('binaryCanvas');
    const binaryChars = '01';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.display = 'flex';
        column.style.flexDirection = 'row';
        column.style.position = 'absolute';
        column.style.top = '-100px';
        column.style.left = (i * 20) + 'px';
        column.style.width = '20px';
        column.style.textAlign = 'center';
        column.style.fontSize = '14px';
        column.style.color = 'rgba(0, 191, 255, 0.1)';
        column.style.fontFamily = 'monospace';
        column.style.lineHeight = '20px';

        // Create binary characters
        let binaryString = '';
        for (let j = 0; j < 50; j++) {
            binaryString += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        }
        column.textContent = binaryString;

        // Animation
        let position = -100;
        const speed = 1 + Math.random() * 2;

        function animate() {
            position += speed;
            if (position > window.innerHeight) {
                position = -100;
                // Regenerate binary string
                binaryString = '';
                for (let j = 0; j < 50; j++) {
                    binaryString += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
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
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
});