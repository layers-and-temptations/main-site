// --- Initialize Animate On Scroll (AOS) Library ---
// Initializes AOS with specified settings for scroll animations.
AOS.init({
  duration: 800, // Animation duration in milliseconds
  once: false, // Whether animation should happen only once - while scrolling down
});

// --- Mobile Menu Toggle Functionality (Main Navigation) ---
// Handles the hamburger menu for the primary top navigation bar.

// Get DOM elements for the main mobile menu
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu"); // The menu that slides out
const navLinksMobile = document.querySelectorAll(".nav-link-mobile"); // Links within the mobile menu

// Event listener for the main mobile menu button (hamburger icon)
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden"); // Toggle visibility of the menu
  const icon = mobileMenuButton.querySelector("i"); // Get the icon element
  icon.classList.toggle("fa-bars"); // Toggle 'fa-bars' class (hamburger)
  icon.classList.toggle("fa-times"); // Toggle 'fa-times' class (close icon)
});

// Event listeners for each link in the main mobile menu
// When a mobile nav link is clicked, the menu closes and the icon resets.
navLinksMobile.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden"); // Hide the menu
    // Reset the icon to hamburger
    const icon = mobileMenuButton.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

// --- Mobile Menu Toggle Functionality (Sticky Navigation) ---
// Handles the hamburger menu for the sticky navigation bar.

// Get DOM elements for the sticky mobile menu
const stickyMobileMenuButton = document.getElementById(
  "stickyMobileMenuButton",
);
const stickyMobileMenu = document.getElementById("stickyMobileMenu"); // The menu that slides out
const navLinksMobileSticky = document.querySelectorAll(
  ".nav-link-mobile-sticky", // Links within the sticky mobile menu
);

// Check if the sticky mobile menu button exists on the page, as it might not be present on all pages/layouts.
if (stickyMobileMenuButton) {
  // Event listener for the sticky mobile menu button
  stickyMobileMenuButton.addEventListener("click", () => {
    stickyMobileMenu.classList.toggle("hidden"); // Toggle visibility of the menu
    const icon = stickyMobileMenuButton.querySelector("i"); // Get the icon element
    icon.classList.toggle("fa-bars"); // Toggle 'fa-bars' class
    icon.classList.toggle("fa-times"); // Toggle 'fa-times' class
  });
}

// Event listeners for each link in the sticky mobile menu
// When a sticky mobile nav link is clicked, the menu closes and the icon resets.
navLinksMobileSticky.forEach((link) => {
  link.addEventListener("click", () => {
    stickyMobileMenu.classList.add("hidden"); // Hide the menu
    // Reset the icon to hamburger, only if the button exists
    if (stickyMobileMenuButton) {
      const icon = stickyMobileMenuButton.querySelector("i");
      if (icon) { // Ensure icon also exists
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    }
  });
});

// --- Sticky Navigation Bar Logic ---
// This script handles the appearance of a sticky navigation bar after scrolling
// past the hero section. It also hides the main navigation bar when the sticky
// one becomes active.

// Get DOM elements for navigation behavior
const mainNav = document.getElementById("mainNav"); // The main navigation bar
const stickyNav = document.getElementById("stickyNav"); // The sticky navigation bar
const heroSection = document.getElementById("home"); // The hero section to determine scroll trigger point

// Event listener for scroll events on the window
window.addEventListener("scroll", () => {
  // Ensure all necessary elements are present on the page to avoid errors
  if (heroSection && stickyNav && mainNav) {
    const heroHeight = heroSection.offsetHeight; // Get the height of the hero section
    // Check if the user has scrolled past the hero section (minus the main nav's height to avoid overlap)
    if (window.scrollY > heroHeight - mainNav.offsetHeight) {
      stickyNav.classList.add("scrolled"); // Add 'scrolled' class to make stickyNav visible (CSS handles appearance)
      mainNav.style.transform = "translateY(-100%)"; // Hide the main navigation bar by moving it off-screen
    } else {
      stickyNav.classList.remove("scrolled"); // Remove 'scrolled' class to hide stickyNav
      mainNav.style.transform = "translateY(0)"; // Make the main navigation bar visible again
    }
  }
});

// --- Lightbox Functionality for Image Gallery ---
// Handles the display of images in a modal-like overlay when gallery images are clicked.

// Get DOM elements for the lightbox
const lightbox = document.getElementById("myLightbox"); // The lightbox container
const lightboxImg = document.getElementById("lightboxImg"); // The <img> element within the lightbox for the full-size image
const lightboxCaption = document.getElementById("lightboxCaption"); // The div for the image caption
const galleryImages = document.querySelectorAll(".gallery-img"); // All images in the gallery that can trigger the lightbox
const closeLightbox = document.querySelector(".lightbox-close"); // The 'x' button to close the lightbox

// Event listener for each gallery image
// When a gallery image is clicked, open the lightbox and display the image and its caption.
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    // Ensure all lightbox elements are present before trying to use them
    if (lightbox && lightboxImg && lightboxCaption) {
      lightbox.style.display = "block"; // Show the lightbox overlay
      lightboxImg.src = img.src; // Set the source for the lightbox image
      lightboxCaption.innerHTML = img.dataset.caption || ""; // Set the caption from the 'data-caption' attribute of the clicked image
    }
  });
});

// Event listener for the lightbox close button
// Hides the lightbox when the close button is clicked.
if (closeLightbox && lightbox) { // Check that both elements exist
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none"; // Hide the lightbox
  });
}

// Event listener to close lightbox when clicking on the background (outside the image)
// This provides an alternative way to close the lightbox.
if (lightbox) { // Check that the lightbox element exists
  lightbox.addEventListener("click", (event) => {
    // Check if the click target is the lightbox background itself (and not its children like the image or caption)
    if (event.target === lightbox) {
      lightbox.style.display = "none"; // Hide the lightbox
    }
  });
}

// --- Dynamic Footer Year ---
// Automatically sets the current year in the footer's copyright notice.
const currentYearSpan = document.getElementById("currentYear"); // The span element where the year should be displayed
if (currentYearSpan) { // Check if the element exists
  currentYearSpan.textContent = new Date().getFullYear(); // Set its text content to the current year
}

// --- Smooth Scrolling for Anchor Links ---
// Implements smooth scrolling for all anchor links (href attribute starting with '#').
// This provides a better user experience than the default instant jump.
// Includes offset calculation to account for fixed/sticky headers, ensuring
// the target section is not hidden behind the header after scrolling.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor click behavior (instant jump)

    const targetId = this.getAttribute("href"); // Get the href attribute value (e.g., "#about")
    const targetElement = document.querySelector(targetId); // Find the target element by its ID

    if (targetElement) { // Ensure the target element exists on the page
      // Calculate the offset needed for fixed/sticky headers.
      // This prevents the header from obscuring the top of the target section.
      let headerOffset = 0;
      // Check if the sticky navigation is active and visible, or fallback to the main navigation.
      const stickyHeader =
        document.querySelector("#stickyNav.scrolled") || // Active sticky nav
        document.querySelector("#mainNav"); // Main nav (if sticky is not active)
      if (stickyHeader) {
        headerOffset = stickyHeader.offsetHeight; // Get the height of the visible fixed/sticky header
      }

      const elementPosition = targetElement.getBoundingClientRect().top; // Position of the target element relative to the viewport
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset; // Calculate the absolute scroll position, adjusted for the header

      // Perform the smooth scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Enables the smooth scrolling animation
      });
    }
  });
});
