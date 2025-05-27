// js/modules/productCard.js

/**
 * Creates an HTML element for a single product card.
 * @param {Object} product The product object.
 * @param {string} categoryKey The key of the category this product belongs to (e.g., "cosmetic").
 * @returns {HTMLElement} The product card HTML element.
 */
function createProductCard(product, categoryKey) {
    const config = window.APP_CONFIG; // Access global config

    const card = document.createElement('div');
    card.classList.add('product-card');
    card.setAttribute('data-product-id', product.id);

    // Clickable area for product detail link
    const detailLink = document.createElement('a');
    detailLink.classList.add('product-detail-link');
    // Ensure categoryKey is valid and product.id exists
    if (categoryKey && product.id) {
        detailLink.href = `product-detail.html?category=${categoryKey}&id=${product.id}`;
    } else {
        console.warn("Missing categoryKey or product.id for product detail link:", product);
        detailLink.href = "#"; // Fallback
    }


    const imageContainer = document.createElement('div');
    imageContainer.classList.add('product-image-container');
    const image = document.createElement('img');
    image.src = product.photoUrl || 'assets/images/placeholder_product_1x1.png';
    image.alt = product.name; // Bengali name
    imageContainer.appendChild(image);
    detailLink.appendChild(imageContainer); // Image is part of the link

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('product-info');

    const nameElement = document.createElement('h3');
    nameElement.classList.add('product-name');
    nameElement.textContent = product.name; // Bengali name
    detailLink.appendChild(nameElement); // Name is also part of the link
    
    card.appendChild(detailLink); // Append the combined link (image + name)

    const priceCartContainer = document.createElement('div');
    priceCartContainer.classList.add('product-price-cart');

    const priceElement = document.createElement('p');
    priceElement.classList.add('product-price');
    priceElement.textContent = `${config.text.currencySymbol}${product.price.toLocaleString('bn-BD')}`; // Format price in Bengali locale

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart-icon-btn');
    addToCartButton.setAttribute('data-product-id', product.id);
    addToCartButton.setAttribute('aria-label', config.text.addToCart); // Accessibility
    addToCartButton.textContent = 'কার্টে যোগ করুন'; // Bengali text for 'Add to Cart'

    priceCartContainer.appendChild(priceElement);
    priceCartContainer.appendChild(addToCartButton);

    infoContainer.appendChild(priceCartContainer); // Price and cart button are NOT part of the detail link

    card.appendChild(infoContainer);

    // Handle Out of Stock for the Add to Cart button on the card itself
    if (product.stockLeft <= 0) {
        addToCartButton.disabled = true;
        addToCartButton.innerHTML = 'স্টক নেই'; // "Out of stock" - small text or different icon
        addToCartButton.classList.add('out-of-stock'); // For specific styling
        // Consider removing the cart icon or changing it if it's out of stock
        // For now, it will just disable and show text.
    }


    // The addProductToCart function will be added by the page controller to this button
    // Example: addToCartButton.onclick = () => addProductToCart(product);
    // But it's better to use event delegation on the parent container in the controller.

    return card;
}

// Expose the function globally or via a namespace
// For simplicity with current structure:
if (typeof createProductCard === 'undefined') {
    window.createProductCard = createProductCard;
}

// If you prefer namespacing:
// window.APP_MODULES = window.APP_MODULES || {};
// window.APP_MODULES.productCard = { create: createProductCard };