# UI Components and Styling

## Overview

The Saberin Online Shop features a clean, responsive user interface with consistent styling across all pages. The UI is designed to be user-friendly on both mobile and desktop devices, with special attention to Bengali language display and cultural preferences.

## Global Styling

The `css/global.css` file provides the foundation for the site's visual design:

- Defines the color scheme and typography
- Sets up the responsive grid system
- Styles common elements like headers, navigation, and buttons
- Implements the floating cart button
- Provides utility classes for spacing, alignment, and visibility

## Responsive Navigation

The navigation system adapts to different screen sizes:

- On mobile devices, it uses a hamburger menu that slides in from the side
- On larger screens, it displays as a horizontal menu
- The navigation overlay darkens the background when the mobile menu is open
- Close buttons and click-away functionality improve usability

## Product Cards

The `js/modules/productCard.js` module generates consistent product cards throughout the site:

- Each card displays the product image, name, and price
- "Add to Cart" buttons provide direct shopping functionality
- Cards link to detailed product pages
- Responsive design ensures proper display on all devices
- Out-of-stock products are visually indicated

## Product Detail Layout

The product detail page (`css/product-detail.css`) features:

- Large product image
- Detailed product information
- Price and stock availability
- Quantity selector
- "Add to Cart" button
- Product description
- Brand information
- Related products section

The layout adapts to different screen sizes, switching from a two-column to a single-column layout on mobile devices.

## Cart Interface

The cart page (`css/cart-page.css`) provides:

- List of cart items with images and details
- Quantity adjustment controls
- Remove item buttons
- Cart total calculation
- Customer information form
- WhatsApp order button

## Slideshow Component

The homepage features a slideshow component (`js/modules/slideshow.js`) that:

- Displays promotional images
- Auto-rotates with configurable timing
- Adapts to different screen sizes
- Provides navigation controls

## Category and Brand Display

The homepage and navigation system highlight categories and brands:

- Category buttons with clear labels
- Brand logos in a responsive grid
- Consistent styling with the overall design

## Form Elements

The site includes form elements for:

- Search functionality
- Customer information collection
- Quantity selection

All forms are styled consistently and designed for easy use on touch devices.

## Loading States and Messages

The UI includes clear feedback for users during data loading and errors:

- Loading indicators during data fetching
- Error messages for missing products or categories
- Empty state displays for search results and cart

## Bengali Language Support

The UI is designed with full support for Bengali text:

- Appropriate font selection for Bengali character display
- Proper text sizing and line height for readability
- Right-to-left text support where needed
- All UI text is in Bengali, stored in the configuration file

## Accessibility Considerations

The UI implements several accessibility features:

- Semantic HTML structure
- Appropriate alt text for images
- Sufficient color contrast
- Focus states for keyboard navigation
- Responsive design for zoom compatibility

## CSS Organization

The CSS is organized into logical files:

- `global.css`: Base styles and common elements
- `home.css`: Homepage-specific styles
- `product-list.css`: Styles for product grids and cards
- `product-detail.css`: Product detail page styles
- `cart-page.css`: Shopping cart interface
- `shop-page.css`: Shop page specific styles
- `contact-page.css`: Contact page layout

This organization improves maintainability and allows for page-specific styling without conflicts.