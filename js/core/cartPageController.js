// js/core/cartPageController.js

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG;
    const cartItemsSection = document.getElementById('cart-items-section');
    const cartLoadingMessage = document.getElementById('cart-loading-message');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartSummarySection = document.getElementById('cart-summary-section');
    const cartTotalAmountElement = document.getElementById('cart-total-amount');
    const customerInfoSection = document.getElementById('customer-info-section');
    const customerInfoForm = document.getElementById('customer-info-form');
    
    // Create localStorageHelper namespace before using it
    if (typeof window.localStorageHelper === 'undefined') {
        if (typeof getCart === 'function') {
            window.localStorageHelper = {
                get: getCart,
                add: addProductToCart,
                updateQuantity: updateProductQuantityInCart,
                remove: removeProductFromCart,
                clear: clearCart,
                save: saveCart
            };
        } else {
            console.error("localStorageHelper functions are not available!");
            // Provide dummy functions to prevent further errors
            window.localStorageHelper = {
                get: () => [],
                add: () => {},
                updateQuantity: () => {},
                remove: () => {},
                clear: () => {},
                save: () => {}
            };
        }
    }

    // Set static text from config
    const cartPageTitle = document.getElementById('cart-page-title');
    if (cartPageTitle) cartPageTitle.textContent = config.text.cartTitle;
    const cartTotalLabel = document.getElementById('cart-total-label');
    if (cartTotalLabel) cartTotalLabel.textContent = config.text.totalLabel;
    const customerInfoTitle = document.getElementById('customer-info-title-display');
    if (customerInfoTitle) customerInfoTitle.textContent = config.text.customerInfoTitle;
    const labelName = document.getElementById('label-customer-name');
    if (labelName) labelName.textContent = config.text.nameLabel;
    const labelPhone = document.getElementById('label-customer-phone');
    if (labelPhone) labelPhone.textContent = config.text.phoneLabel;
    const labelLocation = document.getElementById('label-customer-location');
    if (labelLocation) labelLocation.textContent = config.text.locationLabel;
    const orderBtn = document.getElementById('order-via-whatsapp-btn');
    if (orderBtn) orderBtn.textContent = config.text.orderButtonText;


    function renderCart() {
        if (!cartItemsSection || !localStorageHelper || !config) {
            console.error("Cart page elements or dependencies missing.");
            if(cartLoadingMessage) cartLoadingMessage.textContent = "কার্ট দেখাতে সমস্যা হচ্ছে।";
            return;
        }

        const cart = localStorageHelper.get(); // Assuming getCart is named 'get' in the helper namespace

        if (cartLoadingMessage) cartLoadingMessage.style.display = 'none';

        if (cart.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
            if (cartItemsSection) cartItemsSection.innerHTML = ''; // Clear previous items if any
            if (cartSummarySection) cartSummarySection.style.display = 'none';
            if (customerInfoSection) customerInfoSection.style.display = 'none';
            return;
        }

        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartSummarySection) cartSummarySection.style.display = 'block';
        if (customerInfoSection) customerInfoSection.style.display = 'block';

        cartItemsSection.innerHTML = ''; // Clear previous items
        let grandTotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.setAttribute('data-product-id', item.id);

            const itemTotalPrice = item.price * item.quantity;
            grandTotal += itemTotalPrice;

            itemElement.innerHTML = `
                <img src="${item.photoUrl || 'assets/images/placeholder_product_1x1.png'}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">${config.text.currencySymbol}${item.price.toLocaleString('bn-BD')} প্রতিটি</p>
                    <div class="cart-item-quantity-controls">
                        <button class="quantity-btn decrease-quantity" data-id="${item.id}" aria-label="পরিমাণ কমান">-</button>
                        <span class="item-quantity">${item.quantity.toLocaleString('bn-BD')}</span>
                        <button class="quantity-btn increase-quantity" data-id="${item.id}" aria-label="পরিমাণ বাড়ান">+</button>
                    </div>
                    <p class="cart-item-total-price">মোট: ${config.text.currencySymbol}${itemTotalPrice.toLocaleString('bn-BD')}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}" aria-label="${item.name} সরান">${config.text.removeItem}</button>
            `;
            cartItemsSection.appendChild(itemElement);
        });

        if (cartTotalAmountElement) {
            cartTotalAmountElement.textContent = `${config.text.currencySymbol}${grandTotal.toLocaleString('bn-BD')}`;
        }

        attachCartItemEventListeners();
    }

    function attachCartItemEventListeners() {
        cartItemsSection.querySelectorAll('.decrease-quantity').forEach(button => {
            button.onclick = (e) => {
                const productId = e.target.dataset.id;
                const cart = localStorageHelper.get();
                const item = cart.find(p => p.id === productId);
                if (item && item.quantity > 1) {
                    localStorageHelper.updateQuantity(productId, item.quantity - 1);
                } else if (item && item.quantity === 1) {
                    // Optional: confirm before removing if quantity becomes 0
                    localStorageHelper.remove(productId);
                }
                renderCart(); // Re-render the cart
            };
        });

        cartItemsSection.querySelectorAll('.increase-quantity').forEach(button => {
            button.onclick = (e) => {
                const productId = e.target.dataset.id;
                localStorageHelper.updateQuantity(productId, (localStorageHelper.get().find(p => p.id === productId)?.quantity || 0) + 1);
                renderCart();
            };
        });

        cartItemsSection.querySelectorAll('.remove-item-btn').forEach(button => {
            button.onclick = (e) => {
                const productId = e.target.dataset.id;
                // Optional: confirm before removing
                if (confirm("আপনি কি এই পণ্যটি কার্ট থেকে সরাতে চান?")) {
                    localStorageHelper.remove(productId);
                    renderCart();
                }
            };
        });
    }

    if (customerInfoForm) {
        customerInfoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const customerName = document.getElementById('customer-name').value.trim();
            const customerPhone = document.getElementById('customer-phone').value.trim();
            const customerLocation = document.getElementById('customer-location').value.trim();

            if (!customerName || !customerPhone || !customerLocation) {
                alert("অনুগ্রহ করে আপনার নাম, ফোন নম্বর এবং ঠিকানা পূরণ করুন।");
                return;
            }

            const cart = localStorageHelper.get();
            if (cart.length === 0) {
                alert("আপনার কার্টে কোনো পণ্য নেই।");
                return;
            }

            let orderDetailsText = config.whatsappMessages.orderPrefix;
            cart.forEach(item => {
                orderDetailsText += `- ${item.name} (${item.quantity.toLocaleString('bn-BD')}টি) - ${config.text.currencySymbol}${(item.price * item.quantity).toLocaleString('bn-BD')}\n`;
            });

            const grandTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            orderDetailsText += `\n${config.text.totalLabel} ${config.text.currencySymbol}${grandTotal.toLocaleString('bn-BD')}\n\n`;
            orderDetailsText += `${config.whatsappMessages.customerInfoLabels.name} ${customerName}\n`;
            orderDetailsText += `${config.whatsappMessages.customerInfoLabels.phone} ${customerPhone}\n`;
            orderDetailsText += `${config.whatsappMessages.customerInfoLabels.location} ${customerLocation}\n`;
            orderDetailsText += config.whatsappMessages.orderSuffix;

            const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(orderDetailsText)}`;
            window.open(whatsappUrl, '_blank');

            // Optionally clear cart after order attempt or redirect to a thank you page
            // localStorageHelper.clear();
            // renderCart();
            // alert("আপনার অর্ডার প্লেস করার জন্য ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।");
        });
    }

    // Create localStorageHelper namespace before rendering cart
    if (typeof window.localStorageHelper === 'undefined') {
        if (typeof getCart === 'function') {
            window.localStorageHelper = {
                get: getCart,
                add: addProductToCart,
                updateQuantity: updateProductQuantityInCart,
                remove: removeProductFromCart,
                clear: clearCart,
                save: saveCart // Expose save for direct manipulation if needed
            };
        } else {
            console.error("localStorageHelper functions are not available!");
            // Provide dummy functions to prevent further errors
            window.localStorageHelper = {
                get: () => [],
                add: () => {},
                updateQuantity: () => {},
                remove: () => {},
                clear: () => {},
                save: () => {}
            };
        }
    }

    // Initial render
    renderCart();

    // Listen for cart updates from other parts of the application (though direct re-render is used here)
    window.addEventListener('cartUpdated', renderCart);

    // Setup localStorageHelper namespace if not already global
    // This assumes localStorageHelper.js defines its functions on a 'localStorageHelper' object
    // or makes them global. For this controller, it assumes they are namespaced.
    // If they are global, calls would be direct e.g. getCart(), addProductToCart() etc.
    // The provided localStorageHelper.js makes them global (like window.getCart),
    // so we need to adjust calls or the helper. Let's assume helper is adjusted for namespacing.

    // Adjusting for localStorageHelper.js that makes functions global:
    // This controller will use 'localStorageHelper.get()', 'localStorageHelper.updateQuantity()', 'localStorageHelper.remove()'
    // So, localStorageHelper.js should define:
    // window.localStorageHelper = { get: getCart, updateQuantity: updateProductQuantityInCart, remove: removeProductFromCart, add: addProductToCart, clear: clearCart, save: saveCart };
    // The current localStorageHelper.js makes them directly global, so if we stick to that:
    // e.g., const cart = getCart(); localStorage.updateProductQuantityInCart(...); etc.

    // For consistency with the current localStorageHelper.js that exports global functions:
    // The calls in this controller should be direct: getCart(), updateProductQuantityInCart(), removeProductFromCart().
    // I will write it assuming localStorageHelper.js has defined its functions globally (e.g. `window.getCart = getCart;`)
    // And if not, I will assume a namespace `localStorageHelper` that holds those functions.
    // The current code above uses 'localStorageHelper.get()', etc.
    // Let's ensure localStorageHelper.js creates such a namespace for clarity:
    // Create localStorageHelper namespace before rendering cart
    if (typeof window.localStorageHelper === 'undefined') {
        if (typeof getCart === 'function') {
            window.localStorageHelper = {
                get: getCart,
                add: addProductToCart,
                updateQuantity: updateProductQuantityInCart,
                remove: removeProductFromCart,
                clear: clearCart,
                save: saveCart // Expose save for direct manipulation if needed
            };
        } else {
        console.error("localStorageHelper functions are not available!");
        // Provide dummy functions to prevent further errors
        window.localStorageHelper = {
            get: () => [],
            add: () => {},
            updateQuantity: () => {},
            remove: () => {},
            clear: () => {},
            save: () => {}
        };
    }
}

});