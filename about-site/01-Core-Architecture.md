# Core Architecture

## Overview

The Saberin Online Shop (সাবেরিন অনলাইন শপ) is a Bengali grocery store website built with a modular JavaScript architecture. The site is designed to be lightweight, fast-loading, and easy to maintain with a clear separation of concerns between different components.

## Key Components

### Configuration System

The site uses a centralized configuration system (`js/core/config.js`) that stores:

- Store information (name, contact details)
- UI text in Bengali language
- Navigation structure
- Category and brand definitions
- Visual settings (slideshow configuration)

This approach allows for easy customization without modifying core code.

### Core JavaScript Structure

The application follows a controller-based architecture:

- **Main Controller** (`js/core/main.js`): Initializes the application, sets up navigation, and handles common UI elements across all pages.

- **Page Controllers**: Separate controllers for each page type:
  - `shopPageController.js`: Manages the product listing page
  - `productDetailPageController.js`: Handles individual product display
  - `cartPageController.js`: Manages the shopping cart functionality
  - `categoryPageController.js`: Controls category-specific product listings
  - `brandPageController.js`: Manages brand-specific product listings

### Module System

The application uses a simple module pattern with specialized JavaScript files for specific functionality:

- **Local Storage Helper** (`js/modules/localStorageHelper.js`): Manages cart data persistence
- **Product Card** (`js/modules/productCard.js`): Generates consistent product display cards
- **Slideshow** (`js/modules/slideshow.js`): Handles the homepage image carousel

### Data Management

Product data is organized by category in separate JavaScript files:

- `js/data/mudi_item.js`
- `js/data/cosmetic.js`
- `js/data/kacha_mal.js`
- And other category-specific data files

Each file exports its data to a global `PRODUCT_DATA` object, allowing for dynamic loading of product information.

## Page Structure

The website consists of several HTML pages:

- `index.html`: Homepage with categories, featured products, and slideshow
- `shop.html`: Complete product listing with search functionality
- `category.html`: Category-specific product listings
- `product-detail.html`: Detailed product information and purchase options
- `cart.html`: Shopping cart and order placement
- `brand.html`: Brand-specific product listings
- `contact.html`: Store contact information

## Styling

The CSS is organized into page-specific and global stylesheets:

- `css/global.css`: Common styles across all pages
- `css/home.css`: Homepage-specific styles
- `css/product-list.css`: Styles for product listings
- `css/product-detail.css`: Product detail page styles
- `css/cart-page.css`: Shopping cart styles
- `css/shop-page.css`: Shop page specific styles
- `css/contact-page.css`: Contact page styles

## Navigation System

The site uses a responsive navigation system with a hamburger menu for mobile devices. The navigation is consistent across all pages and is controlled by JavaScript in the main controller.

## Responsive Design

The website is built with a mobile-first approach, using responsive design techniques to ensure optimal viewing on all device sizes.