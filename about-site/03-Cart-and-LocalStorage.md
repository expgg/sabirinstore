# Cart and Local Storage Module

## Overview

The Saberin Online Shop implements a client-side shopping cart system using the browser's localStorage API. This approach allows users to maintain their cart contents across page visits and browser sessions without requiring server-side storage or user accounts.

## LocalStorage Helper Module

The `js/modules/localStorageHelper.js` file provides a comprehensive API for cart management with the following key functions:

### Core Functions

- **getCart()**: Retrieves the current cart from localStorage
- **saveCart(cartArray)**: Persists the cart to localStorage and dispatches a 'cartUpdated' event
- **addProductToCart(productToAdd, quantity)**: Adds a product to the cart or updates its quantity
- **updateProductQuantityInCart(productId, newQuantity)**: Directly sets a product's quantity
- **removeProductFromCart(productId)**: Removes a specific product from the cart
- **clearCart()**: Empties the entire cart

### Data Structure

The cart is stored as a JSON array of product objects with the following structure:

```javascript
[
  {
    id: "mud001",            // Product ID
    name: "চিনি (১ কেজি)",  // Product name in Bengali
    price: 140,             // Price in BDT
    photoUrl: "...",       // Product image path
    quantity: 2             // Quantity in cart
  },
  // Additional cart items...
]
```

### Event System

The module implements a custom event system to notify other parts of the application when the cart changes:

```javascript
window.dispatchEvent(new CustomEvent('cartUpdated'));
```

This event is used to update UI elements like the floating cart button and cart item count without requiring page reloads.

## Cart Page Controller

The `js/core/cartPageController.js` file manages the cart page interface, providing the following functionality:

### UI Components

- Displays all cart items with product details
- Allows quantity adjustment for each item
- Provides item removal functionality
- Calculates and displays the cart total
- Collects customer information for order placement

### Order Processing

The cart system integrates with WhatsApp for order processing:

1. Customer fills out their information (name, phone, location)
2. The system generates a formatted order message with all cart items and total
3. The order is sent via WhatsApp to the store's number configured in `config.js`

### Responsive Design

The cart interface is fully responsive, adapting to different screen sizes while maintaining usability:

- On mobile devices, the cart displays in a single column
- On larger screens, it uses a multi-column layout for better space utilization

## Floating Cart Button

A persistent floating cart button appears on all pages, showing the current number of items in the cart. This button:

- Updates dynamically when items are added or removed
- Provides quick access to the cart page
- Uses the 'cartUpdated' event to stay synchronized with cart changes

## Data Persistence

The localStorage approach provides several benefits:

- Cart contents persist even if the browser is closed and reopened
- No server-side storage or user accounts required
- Works offline once the site is loaded

However, it also has limitations:

- Data is specific to the browser and device
- Storage capacity is limited (typically 5-10MB)
- Data can be cleared if the user clears their browser data

## Integration with Product Modules

The cart system integrates seamlessly with the product display modules:

- Product cards include "Add to Cart" buttons that call the appropriate localStorage helper functions
- The product detail page includes quantity selection and cart addition functionality
- Stock availability is checked before adding items to the cart