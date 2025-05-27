# Product Data Structure

## Overview

The Saberin Online Shop uses a modular data structure to organize product information by categories. This approach allows for efficient loading of product data only when needed, improving performance and maintainability.

## Data Organization

### Category-Based Files

Product data is organized into separate JavaScript files by category:

- `js/data/mudi_item.js`: Grocery staples like sugar, oil, flour, etc.
- `js/data/cosmetic.js`: Beauty and personal care products
- `js/data/kacha_mal.js`: Fresh produce and raw ingredients
- `js/data/baby_item.js`: Baby care products
- `js/data/electronics.js`: Electronic items
- `js/data/sanitary_item.js`: Cleaning and sanitary products
- `js/data/snacks.js`: Snack foods and confectionery
- `js/data/stationary_items.js`: Office and school supplies

### Data Structure

Each product is represented as a JavaScript object with the following properties:

```javascript
{
    id: "mud001",                // Unique product identifier
    name: "চিনি (১ কেজি)",      // Product name in Bengali
    price: 140,                 // Price in BDT (Bangladeshi Taka)
    description: "...",         // Detailed product description in Bengali
    photoUrl: "...",           // Path to product image
    stockLeft: 100,             // Current inventory count
    brand: "brandC"            // Brand identifier
}
```

### Global Data Access

Each category file adds its products to a global `PRODUCT_DATA` object, making them accessible throughout the application:

```javascript
if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.mudi_item = mudiItemProducts;
```

## Dynamic Data Loading

The application uses dynamic script loading to fetch product data only when needed:

1. The configuration file (`js/core/config.js`) defines category metadata including the path to each data file
2. When a user visits a category or product detail page, the appropriate data file is loaded dynamically
3. This approach reduces initial page load time by loading only the necessary data

## Product Relationships

### Categories

Products are primarily organized by category, with each product belonging to exactly one category.

### Brands

Products can be associated with brands through the `brand` property, which contains a brand identifier that corresponds to the brand definitions in the configuration file.

## Stock Management

The `stockLeft` property tracks inventory levels for each product:

- When `stockLeft` is zero, the product is considered out of stock
- Low stock levels can trigger special UI indicators
- The application can display different purchase options based on stock availability

## Product Display

The product data structure is designed to work seamlessly with the `productCard.js` module, which generates consistent product cards throughout the site based on the standardized data format.

## Search Functionality

The consistent data structure enables the search functionality in the shop page, allowing users to find products across all categories based on name, description, or other properties.