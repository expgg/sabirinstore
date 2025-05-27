// js/modules/slideshow.js

function initSlideshow(imageUrls, interval) {
    const slideshowContainer = document.getElementById('image-slideshow-container');
    if (!slideshowContainer || !imageUrls || imageUrls.length === 0) {
        if (slideshowContainer) {
            slideshowContainer.innerHTML = '<p style="text-align:center; padding: 20px;">স্লাইডশো এর জন্য কোন ছবি পাওয়া যায়নি।</p>';
        }
        console.error("Slideshow initialization failed: Container or images missing.");
        return;
    }

    slideshowContainer.innerHTML = ''; // Clear any existing content

    imageUrls.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `url('${url}')`;
        // For accessibility, you might consider adding role/aria attributes if content is more than decorative
        // slide.setAttribute('role', 'img');
        // slide.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            slide.classList.add('active'); // Make the first slide active initially
        }
        slideshowContainer.appendChild(slide);
    });

    const slides = slideshowContainer.querySelectorAll('.slide');
    if (slides.length <= 1) return; // No need to cycle if only one or no slides

    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, interval || 3000); // Default to 3 seconds if interval not provided
}

// If you prefer to namespace it (as hinted in main.js):
// window.APP_MODULES = window.APP_MODULES || {};
// window.APP_MODULES.slideshow = { init: initSlideshow };
// However, a simple global function is fine for this project size if main.js calls it directly.