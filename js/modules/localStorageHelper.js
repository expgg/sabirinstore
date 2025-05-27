// js/modules/localStorageHelper.js

const CART_STORAGE_KEY = 'myGroceryCart';

/**
 * Retrieves the cart from localStorage.
 * @returns {Array} The cart array, or an empty array if no cart is found.
 */
function getCart() {
    try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return []; // Return empty array on error
    }
}

/**
 * Saves the cart to localStorage.
 * @param {Array} cartArray The cart array to save.
 */
function saveCart(cartArray) {
    try {
        const cartJson = JSON.stringify(cartArray);
        localStorage.setItem(CART_STORAGE_KEY, cartJson);
        // Dispatch a custom event to notify other parts of the app that the cart has been updated
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
}

/**
 * Adds a product to the cart or updates its quantity if it already exists.
 * @param {Object} productToAdd The product object to add. Expected properties: id, name, price, photoUrl.
 * @param {number} [quantity=1] The quantity to add.
 */
function addProductToCart(productToAdd, quantity = 1) {
    if (!productToAdd || !productToAdd.id) {
        console.error("Invalid product object provided to addProductToCart.");
        return;
    }

    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

    if (existingProductIndex > -1) {
        // Product already in cart, update quantity
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 0) + quantity;
    } else {
        // Product not in cart, add it with quantity
        // Ensure we only store necessary info
        cart.push({
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            photoUrl: productToAdd.photoUrl, // For display in cart
            // description: productToAdd.description, // Optional, maybe not needed in cart summary
            // brand: productToAdd.brand, // Optional
            quantity: quantity
        });
    }
    saveCart(cart);
}

/**
 * Updates the quantity of a specific product in the cart.
 * If quantity becomes 0 or less, the product is removed.
 * @param {string} productId The ID of the product to update.
 * @param {number} newQuantity The new quantity for the product.
 */
function updateProductQuantityInCart(productId, newQuantity) {
    let cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (newQuantity > 0) {
            cart[productIndex].quantity = newQuantity;
        } else {
            // Remove item if quantity is 0 or less
            cart.splice(productIndex, 1);
        }
        saveCart(cart);
    } else {
        console.warn(`Product with ID ${productId} not found in cart for quantity update.`);
    }
}

/**
 * Removes a product completely from the cart.
 * @param {string} productId The ID of the product to remove.
 */
function removeProductFromCart(productId) {
    let cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);

    if (updatedCart.length < cart.length) {
        saveCart(updatedCart);
    } else {
        console.warn(`Product with ID ${productId} not found in cart for removal.`);
    }
}

/**
 * Clears all items from the cart.
 */
function clearCart() {
    saveCart([]);
}

// Expose functions to be globally accessible (or use a namespacing object like for slideshow)
// For simplicity in this project, making them global is okay.
// window.getCart = getCart;
// window.addProductToCart = addProductToCart;
// window.updateProductQuantityInCart = updateProductQuantityInCart;
// window.removeProductFromCart = removeProductFromCart;
// window.clearCart = clearCart;

// If you prefer namespacing, you can do:
// window.APP_MODULES = window.APP_MODULES || {};
// window.APP_MODULES.cart = {
//     get: getCart,
//     add: addProductToCart,
//     updateQuantity: updateProductQuantityInCart,
//     remove: removeProductFromCart,
//     clear: clearCart,
//     save: saveCart // Exposing saveCart might be useful for direct manipulation if ever needed
// };
// In this case, main.js would call, e.g., APP_MODULES.cart.get()

// For the current setup where main.js calls getCart(), ensure getCart is available globally.
// The other functions will be called by specific page controllers (e.g., when "Add to Cart" is clicked).
// To match `main.js` `updateCartCount` which calls `getCart()`:
if (typeof getCart === 'undefined') { // Prevent re-definition if scripts are somehow loaded multiple times
    window.getCart = getCart;
}