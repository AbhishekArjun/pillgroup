document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .portfolio-item');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate update for the main dot
        if(cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });
    
    // Smooth follow for the larger circle
    function animate() {
        // Easing function for smooth follow
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        if(follower) {
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
        }
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover states for cursor
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });
    
    
    // --- Header Scroll Effect ---
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Change header text color to dark when scrolling past dark hero (simplification)
            // In a real scenario, this would depend on the background behind it.
            header.style.color = 'var(--text-color)';
            header.style.mixBlendMode = 'normal';
        } else {
            header.classList.remove('scrolled');
            header.style.color = 'white';
            header.style.mixBlendMode = 'difference';
        }
    });
    
    
    // --- Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        if (navOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            header.style.color = 'white';
            header.style.mixBlendMode = 'normal';
        } else {
            document.body.style.overflow = '';
            if (window.scrollY <= 50) {
                header.style.mixBlendMode = 'difference';
            } else {
                header.style.color = 'var(--text-color)';
            }
        }
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    
    // --- Scroll Animations (Intersection Observer) ---
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);
    
    fadeUpElements.forEach(el => {
        observer.observe(el);
    });
    
    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        if (preloaderBar) {
            preloaderBar.style.width = progress + '%';
        }
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('hidden');
                    // Ensure body scrolling is enabled if we disabled it
                    document.body.style.overflow = '';
                }
            }, 500); // Wait a bit after 100% to hide
        }
    }, 100);
    
    // Fallback if window load fires before simulation
    window.addEventListener('load', () => {
        progress = 100;
        if (preloaderBar) {
            preloaderBar.style.width = '100%';
        }
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
        }, 500);
    });

    // --- Testimonials Carousel ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testi-prev');
    const nextBtn = document.querySelector('.testi-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        if(slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        // Optional: Auto play
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000);
    }
});
