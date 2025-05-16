// SDJK Hungary weboldal script fájl - simplified mobile dropdown fix

document.addEventListener('DOMContentLoaded', function() {
    // Bootstrap tooltipek inicializálása
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Dropdown menü aktív állapot kezelése
    const activeDropdownItem = document.querySelector('.dropdown-item.active');
    if (activeDropdownItem) {
        const parentDropdown = activeDropdownItem.closest('.dropdown');
        if (parentDropdown) {
            const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.classList.add('active-parent');
                dropdownToggle.style.color = 'var(--secondary-color)';
                dropdownToggle.style.fontWeight = '700';
            }
        }
    }
    
    // Get navbar toggle button (hamburger icon)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close navbar when clicking outside of it on mobile
    document.addEventListener('click', function(event) {
        // Only apply this on mobile when navbar is expanded
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            // If click target is not within the navbar and not the toggler button itself
            if (!navbarCollapse.contains(event.target) && event.target !== navbarToggler) {
                // Create and dispatch a click event on the navbar toggler to close the menu
                navbarToggler.click();
            }
        }
    });
    
    // Fix dropdown toggle behavior on mobile
    if (window.innerWidth < 992) {
        // Remove data-bs-toggle attribute to disable bootstrap's built-in behavior
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.removeAttribute('data-bs-toggle');
            
            // Add our own click handler
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownMenu = this.nextElementSibling;
                
                // Toggle the dropdown
                if (dropdownMenu.style.display === 'block') {
                    dropdownMenu.style.display = 'none';
                } else {
                    // Close any other open dropdowns first
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.style.display = 'none';
                    });
                    
                    // Open this dropdown
                    dropdownMenu.style.display = 'block';
                }
            });
        });
    }
    
    // Sima görgetés a belső linkekhez
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // AOS animáció inicializálása ha létezik
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
    
    // Navbar stílusának módosítása görgetéskor
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    console.log('SDJK Hungary weboldal betöltve');
});
