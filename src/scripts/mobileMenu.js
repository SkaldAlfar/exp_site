// Hamburger menu open/close for mobile
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.mobile-navbar-toggle');
        const mobileNav = document.querySelector('.mobile-navbar');
        const navLinks = document.querySelector('.mobile-nav-links');
        let menuOpen = false;
        // Always set menuOpen to false and hide menu on load
        if (mobileNav && navLinks) {
            menuOpen = false;
            mobileNav.style.display = 'none';
            navLinks.style.display = 'none';
        }
        if (hamburger && mobileNav && navLinks) {
            hamburger.addEventListener('click', function() {
                menuOpen = !menuOpen;
                if (menuOpen) {
                    mobileNav.style.display = 'block';
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                } else {
                    mobileNav.style.display = 'none';
                    navLinks.style.display = 'none';
                }
            });
            // Optional: close menu when a link is clicked
            navLinks.querySelectorAll('.bar').forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.style.display = 'none';
                    navLinks.style.display = 'none';
                    menuOpen = false;
                });
            });
        }
    });