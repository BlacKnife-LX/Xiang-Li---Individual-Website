// Xiang Li - Academic Homepage JavaScript
// Clean, restrained interactions for an academic personal website

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll state
    const updateNavbarOnScroll = () => {
        if (!nav) return;
        if (window.scrollY > 24) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    updateNavbarOnScroll();
    window.addEventListener('scroll', updateNavbarOnScroll);

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu after clicking a nav link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });

    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            const headerOffset = 78;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Active navigation highlighting
    const updateActiveNav = () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop - 140) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);

    // Scroll reveal animation
    const revealTargets = document.querySelectorAll(
        '.summary-card, .research-card, .pub-item, .teaching-item, .contact-link, .edu-card, .timeline-item, .skill-category'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealTargets.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = `opacity 0.55s ease, transform 0.55s ease`;
            el.style.transitionDelay = `${Math.min(index * 0.05, 0.25)}s`;
            revealObserver.observe(el);
        });
    } else {
        revealTargets.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // Apply final visible state through inline style for compatibility
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.is-visible').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });

    // Trigger once on load as well
    document.querySelectorAll('.is-visible').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

.is-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.nav-links a.active {
    color: var(--primary);
    font-weight: 600;
}

nav.scrolled {
    background: rgba(252, 252, 253, 0.98);
    box-shadow: 0 6px 22px rgba(31, 58, 95, 0.06);
}