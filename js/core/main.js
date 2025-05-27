// js/core/main.js

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG; // Access global config

    // --- Initialize UI from Config ---
    const storeNameDisplay = document.getElementById('store-name-display');
    const navHome = document.getElementById('nav-home');
    const navShop = document.getElementById('nav-shop');
    const navCart = document.getElementById('nav-cart');
    const navContact = document.getElementById('nav-contact');
    const categoriesTitleDisplay = document.getElementById('categories-title-display');
    const brandsTitleDisplay = document.getElementById('brands-title-display');
    const mapSection = document.getElementById('map-section');

    if (storeNameDisplay) storeNameDisplay.textContent = config.storeName;
    document.title = config.storeName; // Set page title

    if (navHome) navHome.textContent = config.navLinks.home;
    if (navShop) navShop.textContent = config.navLinks.shop;
    if (navCart) navCart.textContent = config.navLinks.cart;
    if (navContact) navContact.textContent = config.navLinks.contact;

    if (categoriesTitleDisplay) categoriesTitleDisplay.textContent = config.text.categoriesTitle;
    if (brandsTitleDisplay) brandsTitleDisplay.textContent = config.text.brandsTitle;

    // --- Hamburger Menu Functionality ---
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeNavIcon = document.getElementById('close-nav-icon');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.getElementById('nav-overlay');

    function openNav() {
        if (mainNav) mainNav.classList.add('open');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflowY = 'hidden'; // Prevent scrolling when nav is open
    }

    function closeNav() {
        if (mainNav) mainNav.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflowY = ''; // Restore scrolling
    }

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', openNav);
    }
    if (closeNavIcon) {
        closeNavIcon.addEventListener('click', closeNav);
    }
    if (navOverlay) {
        navOverlay.addEventListener('click', closeNav); // Close nav if overlay is clicked
    }
    // Close nav if an item is clicked (optional, good for SPAs but also for multi-page)
    if (mainNav) {
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }


    // --- Populate Categories on Homepage ---
    const categoryButtonsContainer = document.getElementById('category-buttons-container');
    if (categoryButtonsContainer && config.categories) {
        for (const key in config.categories) {
            const category = config.categories[key];
            const categoryLink = document.createElement('a');
            categoryLink.href = `category.html?category=${key}`;
            categoryLink.classList.add('category-button');
            
            // Add category image
            const img = document.createElement('img');
            img.src = `assets/c-photo/${key}.svg`;
            img.alt = category.name;
            categoryLink.appendChild(img);
            
            // Add category name text
            const nameSpan = document.createElement('span');
            nameSpan.textContent = category.name;
            categoryLink.appendChild(nameSpan);
            
            categoryButtonsContainer.appendChild(categoryLink);
        }
    }

    // --- Populate Brands on Homepage ---
    const brandLogosContainer = document.getElementById('brand-logos-container');
    if (brandLogosContainer && config.brands && config.brands.length > 0) {
        config.brands.forEach(brand => {
            const brandLink = document.createElement('a');
            brandLink.href = `brand.html?brand=${brand.id}`; // Use brand.id for the link
            brandLink.classList.add('brand-link');

            const brandImage = document.createElement('img');
            brandImage.src = brand.logoUrl || 'assets/images/placeholder_brand_logo.png';
            brandImage.alt = brand.name; // Bengali name
            brandLink.appendChild(brandImage);

            brandLogosContainer.appendChild(brandLink);
        });
    }

    // --- Initialize Slideshow ---
    // Assumes slideshow.js defines an initSlideshow function globally or on APP_CONFIG
    if (typeof initSlideshow === 'function') {
        initSlideshow(config.slideshowImages, config.slideshowInterval);
    } else if (window.APP_MODULES && typeof window.APP_MODULES.slideshow.init === 'function') {
        // If slideshow.js attaches its functions to a global modules object
        window.APP_MODULES.slideshow.init(config.slideshowImages, config.slideshowInterval);
    }


    // --- Update Floating Cart Item Count ---
    function updateCartCount() {
        const cartItemCountElement = document.getElementById('cart-item-count');
        if (cartItemCountElement && typeof getCart === 'function') { // getCart from localStorageHelper.js
            const cart = getCart();
            const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
            cartItemCountElement.textContent = count;
            cartItemCountElement.style.display = count > 0 ? 'flex' : 'none'; // Show only if count > 0
        }
    }
    updateCartCount(); // Initial call
    // Listen for custom event if cart is updated elsewhere (e.g., after adding an item)
    window.addEventListener('cartUpdated', updateCartCount);


    // --- Load Google Maps Embed ---
    if (mapSection && config.googleMapEmbedUrl && config.googleMapEmbedUrl !== "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.053979296685!2d89.02017031500584!3d24.906060983909503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc86447568d59d%3A0x1543e7f267ac9096!2sJoypurhat!5e0!3m2!1sen!2sbd!4v1715944000000!5m2!1sen!2sbd") {
        // A bit of a delay to ensure it doesn't block critical rendering, or use Intersection Observer
        setTimeout(() => {
            const iframe = document.createElement('iframe');
            iframe.src = config.googleMapEmbedUrl;
            iframe.width = "100%"; // Or set via CSS
            iframe.height = "300"; // Or set via CSS
            iframe.style.border = "0";
            iframe.allowFullscreen = "";
            iframe.loading = "lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            mapSection.innerHTML = ''; // Clear any placeholder
            mapSection.appendChild(iframe);
        }, 1000); // Load map after 1 second to not impede initial load
    } else if (mapSection) {
        mapSection.innerHTML = '<p style="text-align:center; padding: 20px;">ম্যাপ লোড করা সম্ভব হচ্ছে না। অনুগ্রহ করে আপনার গুগল ম্যাপ এম্বেড ইউআরএল পরীক্ষা করুন।</p>';
    }

});