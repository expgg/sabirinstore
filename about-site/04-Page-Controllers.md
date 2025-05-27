# Page Controllers

## Overview

The Saberin Online Shop uses a controller-based architecture to manage different pages of the website. Each page has its own dedicated controller that handles page-specific functionality, data loading, and UI interactions.

## Main Controller

The `js/core/main.js` file serves as the application's main controller, providing functionality common to all pages:

- Initializes the UI with configuration values
- Sets up the responsive navigation system
- Handles the hamburger menu functionality
- Populates category and brand sections on the homepage
- Initializes the slideshow on the homepage
- Updates the floating cart button

The main controller runs on every page and provides the foundation for page-specific controllers.

## Shop Page Controller

The `js/core/shopPageController.js` manages the main product listing page:

### Key Features

- Loads product data from all categories
- Renders product cards using the `productCard.js` module
- Implements search functionality to filter products
- Handles loading states and error messages
- Manages the product grid layout

### Data Loading Strategy

The shop page controller uses a dynamic approach to load all product data:

1. Iterates through all categories defined in the configuration
2. Dynamically loads each category's data file
3. Combines all products into a master list for display and searching

## Product Detail Page Controller

The `js/core/productDetailPageController.js` manages individual product pages:

### Key Features

- Extracts product ID and category from URL parameters
- Dynamically loads the appropriate category data file
- Renders detailed product information
- Displays stock availability and pricing
- Provides "Add to Cart" functionality with quantity selection
- Shows related products from the same category

### Error Handling

The controller implements comprehensive error handling for scenarios like:
- Missing URL parameters
- Invalid category or product ID
- Failed data loading
- Out-of-stock products

## Category Page Controller

The `js/core/categoryPageController.js` manages category-specific product listings:

### Key Features

- Extracts category ID from URL parameters
- Loads only the relevant category data file
- Displays category name and description
- Renders all products within the selected category
- Provides filtering options specific to the category

## Brand Page Controller

The `js/core/brandPageController.js` manages brand-specific product listings:

### Key Features

- Extracts brand ID from URL parameters
- Loads all category data files to find products from the specified brand
- Displays brand information and logo
- Renders all products associated with the selected brand

## Cart Page Controller

The `js/core/cartPageController.js` manages the shopping cart interface:

### Key Features

- Retrieves cart data from localStorage
- Renders cart items with product details
- Provides quantity adjustment controls
- Calculates and displays the cart total
- Collects customer information
- Generates and sends WhatsApp order messages

## Contact Page Controller

The website includes a contact page with store information and a contact form.

## Controller Communication

The controllers communicate with each other and share data through:

1. URL parameters for passing IDs between pages
2. LocalStorage for cart data persistence
3. Custom events for real-time updates
4. Global configuration and data objects

## Error Handling Strategy

All controllers implement a consistent error handling approach:

- Clear loading indicators when operations complete
- Display user-friendly error messages in Bengali
- Provide fallback content when data is unavailable
- Log detailed error information to the console for debugging