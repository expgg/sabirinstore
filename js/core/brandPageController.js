// js/core/brandPageController.js

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG;
    const productListContainer = document.getElementById('product-list-container');
    const pageTitleElement = document.getElementById('page-title');
    const loadingMessageElement = document.getElementById('loading-message');
    const fallbackContentContainer = document.getElementById('fallback-content-container');
    const fallbackMessageElement = document.getElementById('fallback-message');
    const pageGlobalTitle = document.querySelector('title');

    // Get brand from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const brandId = urlParams.get('brand'); // e.g., "brandA"

    function displayMessage(message, isError = true) {
        if (loadingMessageElement) loadingMessageElement.style.display = 'none';
        if (productListContainer && isError) productListContainer.innerHTML = ''; // Clear content on error

        if (fallbackMessageElement) fallbackMessageElement.textContent = message;
        if (fallbackContentContainer) fallbackContentContainer.style.display = 'block';
        if (isError && pageGlobalTitle && config) pageGlobalTitle.textContent = `ত্রুটি - ${config.storeName}`;
    }

    if (!config) {
        console.error("APP_CONFIG not found. Ensure config.js is loaded.");
        displayMessage("সাইট কনফিগারেশন লোড করা যায়নি।");
        return;
    }

    if (!brandId) {
        if (pageGlobalTitle) pageGlobalTitle.textContent = `ব্র্যান্ড পাওয়া যায়নি - ${config.storeName}`;
        if (pageTitleElement) pageTitleElement.textContent = "ব্র্যান্ড পাওয়া যায়নি";
        displayMessage("অনুগ্রহ করে একটি সঠিক ব্র্যান্ড নির্বাচন করুন।");
        return;
    }

    const brandInfo = config.brands.find(b => b.id === brandId);

    if (!brandInfo) {
        if (pageGlobalTitle) pageGlobalTitle.textContent = `"${brandId}" ব্র্যান্ড পাওয়া যায়নি - ${config.storeName}`;
        if (pageTitleElement) pageTitleElement.textContent = `"${brandId}" ব্র্যান্ড পাওয়া যায়নি`;
        displayMessage(`"${brandId}" নামের কোনো ব্র্যান্ড আমাদের তালিকায় নেই।`);
        return;
    }

    // Update page title with brand name
    if (pageGlobalTitle) pageGlobalTitle.textContent = `${brandInfo.name} - ${config.storeName}`;
    if (pageTitleElement) pageTitleElement.textContent = `${brandInfo.name} এর পণ্যসমূহ`;

    let allProductsFromAllCategories = [];
    const categoryKeys = Object.keys(config.categories);
    let categoriesToLoad = categoryKeys.length;
    let categoriesLoadedCount = 0;

    if (categoriesToLoad === 0) {
        displayMessage(config.text.productsNotFound);
        return;
    }

    // Function to process products once all data files are attempted
    function processAllProducts() {
        if (loadingMessageElement) loadingMessageElement.style.display = 'none';

        const brandProducts = allProductsFromAllCategories.filter(product => product.brand === brandId);

        if (brandProducts.length > 0) {
            if (productListContainer) productListContainer.innerHTML = ''; // Clear loading message
            brandProducts.forEach(product => {
                let productCategoryKey = null;
                // Find the categoryKey for this product
                for (const catKey of categoryKeys) {
                    if (window.PRODUCT_DATA && window.PRODUCT_DATA[catKey] && window.PRODUCT_DATA[catKey].some(p => p.id === product.id)) {
                        productCategoryKey = catKey;
                        break;
                    }
                }

                if (typeof createProductCard === 'function' && productCategoryKey) {
                    const card = createProductCard(product, productCategoryKey);
                    if (productListContainer) productListContainer.appendChild(card);
                } else {
                    console.warn("Could not create product card for:", product, "Missing categoryKey (", productCategoryKey, ") or createProductCard function.");
                }
            });
            // Pass only the currently displayed brandProducts for easier lookup
            attachAddToCartListeners(brandProducts);
        } else {
            displayMessage(`"${brandInfo.name}" ব্র্যান্ডের কোনো পণ্য এখন নেই।`);
        }
    }

    // Dynamically load all category product data files
    categoryKeys.forEach(categoryKey => {
        const category = config.categories[categoryKey];
        if (!category || !category.dataFile) {
            console.error(`Configuration for category ${categoryKey} is missing or invalid.`);
            categoriesLoadedCount++;
            if (categoriesLoadedCount === categoriesToLoad) {
                processAllProducts();
            }
            return; // Skip this category
        }

        const script = document.createElement('script');
        script.src = category.dataFile;

        script.onload = () => {
            if (window.PRODUCT_DATA && window.PRODUCT_DATA[categoryKey]) {
                // Add categoryKey to each product for easier reference later
                const productsWithCategory = window.PRODUCT_DATA[categoryKey].map(p => ({ ...p, categoryKeyOrigin: categoryKey }));
                allProductsFromAllCategories = allProductsFromAllCategories.concat(productsWithCategory);
            }
            categoriesLoadedCount++;
            if (categoriesLoadedCount === categoriesToLoad) {
                processAllProducts();
            }
        };

        script.onerror = () => {
            console.error(`Error loading product data for ${categoryKey} from ${category.dataFile}`);
            categoriesLoadedCount++;
            if (categoriesLoadedCount === categoriesToLoad) {
                processAllProducts();
            }
        };
        document.body.appendChild(script);
    });


    function attachAddToCartListeners(displayedProducts) {
        if (!productListContainer) return;

        productListContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.add-to-cart-icon-btn');
            if (button && !button.disabled) {
                event.preventDefault();
                event.stopPropagation();

                const productId = button.getAttribute('data-product-id');
                // Find the product details from the displayedProducts array
                const productToAdd = displayedProducts.find(p => p.id === productId);

                if (productToAdd) {
                    // Ensure localStorageHelper functions are available
                    if (window.localStorageHelper && typeof window.localStorageHelper.add === 'function') {
                        window.localStorageHelper.add(productToAdd, 1);
                        console.log(`"${productToAdd.name}" added to cart from brand page.`);
                        // Optionally, provide user feedback (e.g., a toast message "Added to cart")
                        // The 'cartUpdated' event dispatched by saveCart() in localStorageHelper
                        // will be caught by main.js to update the floating cart count.
                    } else if (typeof addProductToCart === 'function') { // Fallback for globally defined
                         addProductToCart(productToAdd, 1);
                         console.log(`"${productToAdd.name}" added to cart from brand page (global fn).`);
                    }
                    else {
                        console.error("addProductToCart function is not defined in localStorageHelper or globally.");
                    }
                } else {
                    console.error(`Product with ID ${productId} not found in displayed brand products.`);
                }
            }
        });
    }
});