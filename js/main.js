document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor Animation ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with delay (using animate for smoothness)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to interactive elements
        const requestCursorHover = () => {
            const hoverables = document.querySelectorAll('a, button, .project-card, .experience-card, .skill-item');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                });
                el.addEventListener('mouseleave', () => {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.backgroundColor = 'transparent';
                });
            });
        };
        requestCursorHover();
    }


    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Change Icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal, .experience-card, .list-card, .skill-item, .project-card');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });


    // --- 4. Carousel Logic (Robust for multiple instances) ---
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        const nextBtn = container.querySelector('.next');
        const prevBtn = container.querySelector('.prev');

        let currentIndex = 0;

        // Force initial update to set position
        const updateCarousel = () => {
            const width = container.getBoundingClientRect().width; // Use container width
            track.style.transform = 'translateX(-' + (currentIndex * width) + 'px)';
        };

        // Resize observer to handle responsiveness
        window.addEventListener('resize', updateCarousel);

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Loop
                }
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = slides.length - 1; // Loop
                }
                updateCarousel();
            });
        }

        // Initial call
        setTimeout(updateCarousel, 100);
    });

});
