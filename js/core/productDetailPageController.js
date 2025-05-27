// js/core/productDetailPageController.js

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG;
    const productDetailContent = document.getElementById('product-detail-content');
    const loadingMessageElement = document.getElementById('loading-message');
    const fallbackContentContainer = document.getElementById('fallback-content-container');
    const fallbackMessageElement = document.getElementById('fallback-message');
    const pageGlobalTitle = document.querySelector('title'); // To set overall page title

    // Get category and product ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryKey = urlParams.get('category');
    const productId = urlParams.get('id');

    function displayMessage(message, isError = true) {
        if (loadingMessageElement) loadingMessageElement.style.display = 'none';
        if (productDetailContent && isError) productDetailContent.innerHTML = ''; // Clear content on error

        if (fallbackMessageElement) fallbackMessageElement.textContent = message;
        if (fallbackContentContainer) fallbackContentContainer.style.display = 'block';
        if (isError && pageGlobalTitle) pageGlobalTitle.textContent = `ত্রুটি - ${config.storeName}`;
    }

    if (!categoryKey || !productId) {
        displayMessage("পণ্যের বিবরণ দেখার জন্য সঠিক তথ্য পাওয়া যায়নি।");
        return;
    }

    const categoryInfo = config.categories[categoryKey];
    if (!categoryInfo) {
        displayMessage(`"${categoryKey}" নামের কোনো ক্যাটাগরি খুঁজে পাওয়া যায়নি।`);
        return;
    }

    // Dynamically load the category's product data file
    const script = document.createElement('script');
    script.src = categoryInfo.dataFile;

    script.onload = () => {
        const products = window.PRODUCT_DATA ? window.PRODUCT_DATA[categoryKey] : null;
        if (!products) {
            displayMessage(`"${categoryInfo.name}" ক্যাটাগরির পণ্য লোড করা সম্ভব হয়নি।`);
            return;
        }

        const product = products.find(p => p.id === productId);

        if (!product) {
            displayMessage(`"${productId}" আইডি সহ পণ্যটি "${categoryInfo.name}" ক্যাটাগরিতে খুঁজে পাওয়া যায়নি।`);
            return;
        }

        // Product found, render details
        if (loadingMessageElement) loadingMessageElement.style.display = 'none';
        renderProductDetails(product);
        if (pageGlobalTitle) pageGlobalTitle.textContent = `${product.name} - ${config.storeName}`;
    };

    script.onerror = () => {
        displayMessage(`"${categoryInfo.name}" ক্যাটাগরির পণ্য ডেটা ফাইল (${categoryInfo.dataFile}) লোড করতে সমস্যা হয়েছে।`);
    };

    document.body.appendChild(script);


    function renderProductDetails(product) {
        productDetailContent.innerHTML = ''; // Clear loading message

        // Image Container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-detail-image-container');
        const image = document.createElement('img');
        image.src = product.photoUrl || 'assets/images/placeholder_product_1x1.png';
        image.alt = product.name;
        imageContainer.appendChild(image);

        // Info Container
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('product-detail-info');

        const nameElement = document.createElement('h1');
        nameElement.classList.add('product-detail-name');
        nameElement.textContent = product.name;

        const priceElement = document.createElement('p');
        priceElement.classList.add('product-detail-price');
        priceElement.textContent = `${config.text.currencySymbol}${product.price.toLocaleString('bn-BD')}`;

        const stockElement = document.createElement('p');
        stockElement.classList.add('product-detail-stock');
        stockElement.textContent = `${config.text.stockLeft} ${product.stockLeft.toLocaleString('bn-BD')}${config.text.stockUnit}`;

        if (product.stockLeft > 0 && product.stockLeft < config.lowStockThreshold) {
            const lowStockSpan = document.createElement('span');
            lowStockSpan.classList.add('low-stock');
            lowStockSpan.textContent = ` (${config.text.lowStockMessage})`;
            stockElement.appendChild(lowStockSpan);
        } else if (product.stockLeft <= 0) {
             const outOfStockSpan = document.createElement('span');
            outOfStockSpan.classList.add('out-of-stock');
            outOfStockSpan.textContent = ` (${config.text.outOfStockMessage})`; // e.g. "(স্টক নেই)"
            stockElement.appendChild(outOfStockSpan);
        }

        const brandElement = document.createElement('p');
        brandElement.classList.add('product-detail-brand');
        const productBrandInfo = config.brands.find(b => b.id === product.brand);
        if (productBrandInfo) {
            brandElement.innerHTML = `<strong>${config.text.productBrandTitle}:</strong> <a href="brand.html?brand=${productBrandInfo.id}">${productBrandInfo.name}</a>`;
        } else {
            brandElement.innerHTML = `<strong>${config.text.productBrandTitle}:</strong> ${product.brand || 'উল্লেখ নেই'}`;
        }


        const descriptionTitle = document.createElement('h2');
        descriptionTitle.classList.add('product-detail-description-title');
        descriptionTitle.textContent = config.text.productDescriptionTitle;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('product-detail-description');
        descriptionElement.textContent = product.description;

        // Action Button Area
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('product-actions');

        if (product.stockLeft > 0) {
            const addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('add-to-cart-btn', 'button-primary');
            addToCartBtn.textContent = config.text.addToCart; // "কার্টে যোগ করুন"
            addToCartBtn.onclick = () => {
                if (typeof addProductToCart === 'function') {
                    addProductToCart(product, 1); // Add 1 quantity
                    // alert(`"${product.name}" কার্টে যোগ করা হয়েছে।`);
                    // Consider a more subtle notification
                    console.log(`"${product.name}" added to cart from detail page.`);
                    // Optionally update button text or show a temporary success state
                    addToCartBtn.textContent = "কার্টে যোগ হয়েছে!";
                    setTimeout(() => {  addToCartBtn.textContent = config.text.addToCart; }, 2000);

                } else {
                    console.error("addProductToCart function is not defined.");
                }
            };
            actionsContainer.appendChild(addToCartBtn);
        } else {
            const contactForStockBtn = document.createElement('button');
            contactForStockBtn.classList.add('contact-for-stock-btn', 'button-primary'); // Use .button-primary for consistent styling if desired
            contactForStockBtn.textContent = config.text.contactForStockButton; // "স্টকের জন্য যোগাযোগ করুন"
            contactForStockBtn.onclick = () => {
                const inquiryMessage = config.whatsappMessages.outOfStockInquiry
                    .replace("[%PRODUCT_NAME%]", `${product.name} (ID: ${product.id})`);
                window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(inquiryMessage)}`, '_blank');
            };
            actionsContainer.appendChild(contactForStockBtn);
        }

        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(priceElement);
        infoContainer.appendChild(stockElement);
        infoContainer.appendChild(brandElement);
        infoContainer.appendChild(descriptionTitle);
        infoContainer.appendChild(descriptionElement);
        infoContainer.appendChild(actionsContainer);

        productDetailContent.appendChild(imageContainer);
        productDetailContent.appendChild(infoContainer);
    }
});