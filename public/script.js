// ========================================
// MAROON TRAVEL - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroSection = document.getElementById('home');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.scrollY + window.innerHeight >= heroSection.offsetTop + 300) {
            countersAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const from = formData.get('from');
            const to = formData.get('to');
            const date = formData.get('date');
            const passengers = formData.get('passengers');

            if (from === to) {
                alert('Kota keberangkatan dan tujuan tidak boleh sama!');
                return;
            }

            // Format the date
            const formattedDate = new Date(date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Capitalize city names
            const fromCity = from.charAt(0).toUpperCase() + from.slice(1);
            const toCity = to.charAt(0).toUpperCase() + to.slice(1);

            // Create WhatsApp message
            const waMessage = encodeURIComponent(
                `Halo Maroon Travel, saya ingin memesan perjalanan:\n\n` +
                `📍 Dari: ${fromCity}\n` +
                `📍 Tujuan: ${toCity}\n` +
                `📅 Tanggal: ${formattedDate}\n` +
                `👥 Penumpang: ${passengers} orang\n\n` +
                `Mohon informasi ketersediaan dan harga. Terima kasih!`
            );

            // Redirect to WhatsApp
            window.open(`https://wa.me/62895639068080?text=${waMessage}`, '_blank');
        });
    }

    // Smooth Scroll for All Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to cards
    document.querySelectorAll('.service-card, .destination-card, .testimonial-card, .feature-item, .destination-detail').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Destination Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationSections = document.querySelectorAll('.destination-detail');

    if (filterButtons.length > 0) {
        // Initial check to ensure "Semua" is active by default if none are
        if (!document.querySelector('.filter-btn.active')) {
            filterButtons[0].classList.add('active');
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default button behavior

                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                console.log('Filtering by:', filterValue); // Debug

                destinationSections.forEach(section => {
                    const categoryAttr = section.getAttribute('data-categories');
                    const categories = categoryAttr ? categoryAttr.split(' ') : [];

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        section.style.display = 'block';
                        // Re-trigger animation
                        setTimeout(() => {
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        section.style.display = 'none';
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(20px)';
                    }
                });
            });
        });
    }

    // FAQ Accordion Logic (for Service Page)
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;

                // Toggle active class
                faqItem.classList.toggle('active');

                // Close other open FAQs (optional, but good UX)
                const otherFaqs = document.querySelectorAll('.faq-item');
                otherFaqs.forEach(other => {
                    if (other !== faqItem && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
            });
        });
    }

    // Promo Slider Functionality
    const promoSlider = document.getElementById('promoSlider');
    const promoPrev = document.getElementById('promoPrev');
    const promoNext = document.getElementById('promoNext');
    const promoDots = document.querySelectorAll('.promo-dot');

    if (promoSlider && promoPrev && promoNext) {
        let currentSlide = 0;
        const slides = promoSlider.querySelectorAll('.promo-slide');
        const totalSlides = slides.length;
        let autoSlideInterval = null;
        let isTransitioning = false;
        const SLIDE_DURATION = 6000; // 6 seconds between slides
        const TRANSITION_DURATION = 800; // Must match CSS transition

        function goToSlide(index) {
            if (isTransitioning) return; // Prevent rapid clicking

            isTransitioning = true;

            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlide = index;

            // Smooth transform with requestAnimationFrame
            requestAnimationFrame(() => {
                promoSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
            });

            // Update dots
            promoDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });

            // Reset transitioning flag after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, TRANSITION_DURATION);
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Auto-slide with stable timer
        function startAutoSlide() {
            // Clear any existing interval first
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
            autoSlideInterval = setInterval(nextSlide, SLIDE_DURATION);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        // Navigation buttons with debounce
        promoNext.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        promoPrev.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        // Dot navigation
        promoDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (currentSlide === index) return; // Don't animate same slide
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });

        // Pause on hover
        const sliderWrapper = promoSlider.parentElement;
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        promoSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        promoSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;

            if (swipeDistance < -50) nextSlide();
            else if (swipeDistance > 50) prevSlide();

            startAutoSlide();
        }, { passive: true });

        // Start auto-slide
        startAutoSlide();

        // Pause when tab is not visible for better performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });
    }

    console.log('🚌 Maroon Travel website loaded successfully!');
});
