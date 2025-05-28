// Initialize AOS
AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: false, // whether animation should happen only once - while scrolling down
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const navLinksMobile = document.querySelectorAll('.nav-link-mobile');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// Sticky Navigation for mainNav
const mainNav = document.getElementById('mainNav');
const heroSection = document.getElementById('home'); // Assuming 'home' is the ID of your hero section

if (mainNav && heroSection) {
    window.addEventListener('scroll', () => {
        const heroHeight = heroSection.offsetHeight;
        // Adjust this threshold as needed, e.g., mainNav.offsetHeight or a fraction of heroHeight
        const scrollThreshold = heroHeight - mainNav.offsetHeight; 

        if (window.scrollY > scrollThreshold) {
            mainNav.classList.add('scrolled-nav'); // New class for scrolled state
        } else {
            mainNav.classList.remove('scrolled-nav');
        }
    });
}

// Lightbox Functionality
const lightbox = document.getElementById('myLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const galleryImages = document.querySelectorAll('.gallery-img');
const closeLightbox = document.querySelector('.lightbox-close');

if (galleryImages.length > 0 && lightbox && lightboxImg && lightboxCaption && closeLightbox) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.dataset.caption || ''; // Use data-caption attribute
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) { // Clicked on the background, not the image/caption
            lightbox.style.display = 'none';
        }
    });
}


// Set current year in footer
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            let headerOffset = 0;
            const stickyHeader = document.getElementById('mainNav'); 
            if (stickyHeader) {
                // Use mainNav's height for offset, as it's always fixed
                headerOffset = stickyHeader.offsetHeight;
            }
            
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
