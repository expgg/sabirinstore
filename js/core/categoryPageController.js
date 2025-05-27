// js/core/categoryPageController.js

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG;
    const productListContainer = document.getElementById('product-list-container');
    const pageTitleElement = document.getElementById('page-title');
    const loadingMessageElement = document.getElementById('loading-message');
    const fallbackContentContainer = document.getElementById('fallback-content-container');
    const fallbackMessageElement = document.getElementById('fallback-message');
    const contactForProductBtn = document.getElementById('contact-for-product-btn');

    // Get category from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryKey = urlParams.get('category');

    function displayMessage(message, showContactButton = false, contactCategoryKey = '') {
        if (loadingMessageElement) loadingMessageElement.style.display = 'none';
        if (productListContainer) productListContainer.innerHTML = ''; // Clear any existing products or messages
        
        if (fallbackMessageElement) fallbackMessageElement.textContent = message;
        if (fallbackContentContainer) fallbackContentContainer.style.display = 'block';

        if (contactForProductBtn) {
            if (showContactButton) {
                contactForProductBtn.textContent = config.text.contactForProductButton;
                contactForProductBtn.style.display = 'inline-block';
                const inquiryText = config.whatsappMessages.missingCategoryInquiry.replace(
                    "[%CATEGORY_NAME%]",
                    contactCategoryKey || "নির্দিষ্ট নয়" // "Not specified"
                );
                contactForProductBtn.onclick = () => {
                    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(inquiryText)}`, '_blank');
                };
            } else {
                contactForProductBtn.style.display = 'none';
            }
        }
    }

    if (!categoryKey) {
        document.title = `ক্যাটাগরি পাওয়া যায়নি - ${config.storeName}`;
        if (pageTitleElement) pageTitleElement.textContent = "ক্যাটাগরি পাওয়া যায়নি";
        displayMessage(config.text.categoryNotFound, true, "অজানা"); // "Unknown"
        return;
    }

    const categoryInfo = config.categories[categoryKey];

    if (!categoryInfo) {
        document.title = `${categoryKey} পাওয়া যায়নি - ${config.storeName}`;
        if (pageTitleElement) pageTitleElement.textContent = `"${categoryKey}" ক্যাটাগরি পাওয়া যায়নি`;
        displayMessage(config.text.categoryNotFound, true, categoryKey);
        return;
    }

    // Update page title with category name
    document.title = `${categoryInfo.name} - ${config.storeName}`;
    if (pageTitleElement) pageTitleElement.textContent = categoryInfo.name; // Bengali name

    // Dynamically load the category's product data file
    const script = document.createElement('script');
    script.src = categoryInfo.dataFile; // e.g., "js/data/cosmetic.js"

    script.onload = () => {
        if (loadingMessageElement) loadingMessageElement.style.display = 'none';

        // Data file is expected to populate window.PRODUCT_DATA[categoryKey]
        const products = window.PRODUCT_DATA ? window.PRODUCT_DATA[categoryKey] : null;

        if (products && products.length > 0) {
            productListContainer.innerHTML = ''; // Clear loading message
            products.forEach(product => {
                // createProductCard is globally available from productCard.js
                if (typeof createProductCard === 'function') {
                    const card = createProductCard(product, categoryKey);
                    productListContainer.appendChild(card);
                } else {
                    console.error("createProductCard function is not defined.");
                }
            });

            // Add event listeners to "Add to Cart" buttons on this page
            attachAddToCartListeners();

        } else {
            displayMessage(config.text.productsNotFound);
        }
    };

    script.onerror = () => {
        console.error(`Error loading product data for ${categoryKey} from ${categoryInfo.dataFile}`);
        displayMessage(`"${categoryInfo.name}" ক্যাটাগরির পণ্য লোড করা সম্ভব হয়নি।`, true, categoryInfo.name);
    };

    document.body.appendChild(script); // Load the data script


    function attachAddToCartListeners() {
        const addToCartButtons = productListContainer.querySelectorAll('.add-to-cart-icon-btn');
        addToCartButtons.forEach(button => {
            // Only add listener if not disabled (i.e., not out of stock)
            if (!button.disabled) {
                button.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent link navigation if button is inside <a>
                    event.stopPropagation(); // Stop event from bubbling to product detail link

                    const productId = button.getAttribute('data-product-id');
                    // Find the product details from the loaded data
                    // This assumes products are still accessible via window.PRODUCT_DATA[categoryKey]
                    const products = window.PRODUCT_DATA ? window.PRODUCT_DATA[categoryKey] : [];
                    const productToAdd = products.find(p => p.id === productId);

                    if (productToAdd) {
                        if (typeof addProductToCart === 'function') { // From localStorageHelper.js
                            addProductToCart(productToAdd, 1); // Add 1 quantity
                            // Optionally, provide user feedback (e.g., a toast message "Added to cart")
                            // alert(`"${productToAdd.name}" কার্টে যোগ করা হয়েছে।`); // Simple alert
                            console.log(`"${productToAdd.name}" added to cart.`);
                            // The 'cartUpdated' event dispatched by saveCart() in localStorageHelper
                            // will be caught by main.js to update the floating cart count.
                        } else {
                            console.error("addProductToCart function is not defined.");
                        }
                    } else {
                        console.error(`Product with ID ${productId} not found for adding to cart.`);
                    }
                });
            }
        });
    }

});