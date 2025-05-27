// js/core/shopPageController.js

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG;
    const productListContainer = document.getElementById('product-list-container');
    const pageTitleElement = document.getElementById('page-title'); // For main page title
    const loadingMessageElement = document.getElementById('loading-message');
    const fallbackContentContainer = document.getElementById('fallback-content-container');
    const fallbackMessageElement = document.getElementById('fallback-message');
    const searchInput = document.getElementById('search-input');
    const pageGlobalTitle = document.querySelector('title'); // For browser tab title

    let allProductsMasterList = []; // To store all products from all categories

    function displayMessage(message, show = true) {
        if (loadingMessageElement) loadingMessageElement.style.display = 'none'; // Always hide loading message
        
        if (fallbackMessageElement) fallbackMessageElement.textContent = message;
        if (fallbackContentContainer) fallbackContentContainer.style.display = show ? 'block' : 'none';
        
        if (show && productListContainer) productListContainer.innerHTML = ''; // Clear products if showing fallback
    }

    if (!config) {
        console.error("APP_CONFIG not found. Ensure config.js is loaded.");
        displayMessage("সাইট কনফিগারেশন লোড করা যায়নি।");
        if (pageGlobalTitle) pageGlobalTitle.textContent = `ত্রুটি - আমাদের গ্রোসারি`; // Fallback title
        return;
    }

    // Set page titles
    const shopPageTitleText = "আমাদের সকল পণ্য"; // Or from config.text if you add it
    if (pageTitleElement) pageTitleElement.textContent = shopPageTitleText;
    if (pageGlobalTitle) pageGlobalTitle.textContent = `${shopPageTitleText} - ${config.storeName}`;


    function renderProducts(productsToRender) {
        if (!productListContainer) return;
        productListContainer.innerHTML = ''; // Clear previous products or messages

        if (productsToRender.length === 0) {
            displayMessage("আপনার অনুসন্ধানের সাথে মেলে এমন কোনো পণ্য পাওয়া যায়নি।"); // "No products match your search."
            return;
        }
        
        displayMessage("", false); // Hide fallback message if products are found

        productsToRender.forEach(product => {
            // product.categoryKeyOrigin was added during data loading
            if (typeof createProductCard === 'function' && product.categoryKeyOrigin) {
                const card = createProductCard(product, product.categoryKeyOrigin);
                productListContainer.appendChild(card);
            } else {
                console.warn("Could not create product card for:", product, "Missing categoryKeyOrigin or createProductCard function.");
            }
        });
        // Note: Add to cart listeners are now delegated in the corrected category/brand controllers.
        // If productCard.js creates buttons that need direct listeners, they should be attached here
        // or preferably, use event delegation on productListContainer.
        // For now, assuming the productCard's add-to-cart button works with delegation set up elsewhere or
        // if `attachAddToCartListeners` is called here.
        // Let's ensure cart functionality for this page:
        attachShopPageAddToCartListeners();
    }


    const categoryKeys = Object.keys(config.categories);
    let categoriesToLoad = categoryKeys.length;
    let categoriesLoadedCount = 0;

    if (categoriesToLoad === 0) {
        displayMessage("কোনো পণ্য ক্যাটাগরি সংজ্ঞায়িত করা হয়নি।"); // "No product categories defined."
        return;
    }

    categoryKeys.forEach(categoryKey => {
        const category = config.categories[categoryKey];
        if (!category || !category.dataFile) {
            console.error(`Configuration for category ${categoryKey} is missing or invalid.`);
            categoriesLoadedCount++;
            if (categoriesLoadedCount === categoriesToLoad) {
                renderProducts(allProductsMasterList); // Render whatever was loaded
            }
            return;
        }

        const script = document.createElement('script');
        script.src = category.dataFile;

        script.onload = () => {
            if (window.PRODUCT_DATA && window.PRODUCT_DATA[categoryKey]) {
                // Add categoryKeyOrigin to each product for creating detail links correctly
                const productsWithCategoryKey = window.PRODUCT_DATA[categoryKey].map(p => ({
                    ...p,
                    categoryKeyOrigin: categoryKey
                }));
                allProductsMasterList = allProductsMasterList.concat(productsWithCategoryKey);
            }
            categoriesLoadedCount++;
            if (categoriesLoadedCount === categoriesToLoad) {
                if (allProductsMasterList.length === 0) {
                    displayMessage("কোনো পণ্য পাওয়া যায়নি।");
                } else {
                    renderProducts(allProductsMasterList); // Initial render of all products
                }
            }
        };
        script.onerror = () => {
            console.error(`Error loading product data for ${categoryKey} from ${category.dataFile}`);
            categoriesLoadedCount++;
            if (categoriesLoadedCount === categoriesToLoad) {
                renderProducts(allProductsMasterList); // Process what we have
            }
        };
        document.body.appendChild(script);
    });

    // Live Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();

            if (!searchTerm) {
                renderProducts(allProductsMasterList); // Show all if search is cleared
                return;
            }

            const filteredProducts = allProductsMasterList.filter(product => {
                const brandInfo = config.brands.find(b => b.id === product.brand);
                const brandName = brandInfo ? brandInfo.name.toLowerCase() : '';

                return (
                    (product.name && product.name.toLowerCase().includes(searchTerm)) ||
                    (product.description && product.description.toLowerCase().includes(searchTerm)) ||
                    (product.id && product.id.toLowerCase().includes(searchTerm)) ||
                    (product.brand && brandName.includes(searchTerm))
                );
            });
            renderProducts(filteredProducts);
        });
    }

    // Specific Add to Cart listener for this page, using event delegation
    function attachShopPageAddToCartListeners() {
        if (!productListContainer || !window.localStorageHelper || typeof window.localStorageHelper.add !== 'function') {
            console.error("Shop Page: Add to cart listeners cannot be attached. Dependencies missing.");
            return;
        }

        productListContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.add-to-cart-icon-btn');
            if (button && !button.disabled) {
                event.preventDefault();
                event.stopPropagation();

                const productId = button.getAttribute('data-product-id');
                // Find the product from the master list (as displayed list might be filtered)
                const productToAdd = allProductsMasterList.find(p => p.id === productId);

                if (productToAdd) {
                    window.localStorageHelper.add(productToAdd, 1);
                    console.log(`"${productToAdd.name}" added to cart from shop page.`);
                    
                    // Optional visual feedback
                    const imgElement = button.querySelector('img');
                    if (imgElement) {
                        const originalIconSrc = imgElement.src;
                        imgElement.src = 'assets/icons/checkmark_icon.svg'; // Assuming checkmark_icon.svg exists
                         setTimeout(() => {
                            if(imgElement) imgElement.src = originalIconSrc;
                        }, 1500);
                    }
                } else {
                    console.error(`Product with ID ${productId} not found in master list for adding to cart.`);
                }
            }
        });
    }
});
