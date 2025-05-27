// js/core/config.js

const config = {
    storeName: "সাবেরিন অনলাইন শপ", // Your Store Name in Bengali
    whatsappNumber: "+8801737007936", // Your WhatsApp Number

    // Navigation Links Text (Bengali)
    navLinks: {
        home: "হোম",
        cart: "কার্ট",
        contact: "যোগাযোগ",
        shop: "শপ" // Or "সব পণ্য" (All Products) or similar
    },

    // UI Text Strings (Bengali)
    text: {
        // Homepage
        categoriesTitle: "ক্যাটাগরি সমূহ",
        brandsTitle: "আমাদের ব্র্যান্ডসমূহ",

        // Product Card
        addToCart: "কার্টে যোগ করুন", // Might be just an icon, but text for tooltip/alt
        viewDetails: "বিস্তারিত দেখুন",

        // Product Detail Page
        stockLeft: "পণ্য বাকি:", // "পণ্য বাকি: Xটি"
        stockUnit: "টি", // Unit for stock, e.g., "টি" for "pieces/items"
        lowStockMessage: "অল্প স্টক!",
        outOfStockMessage: "স্টক নেই", // May not be directly displayed if button changes
        contactForStockButton: "স্টকের জন্য যোগাযোগ করুন",
        productDescriptionTitle: "পণ্যের বিবরণ",
        productBrandTitle: "ব্র্যান্ড",

        // Cart Page
        cartTitle: "আপনার শপিং কার্ট",
        cartIsEmpty: "আপনার কার্ট খালি।",
        customerInfoTitle: "আপনার তথ্য",
        nameLabel: "নাম:",
        phoneLabel: "ফোন নম্বর:",
        locationLabel: "ঠিকানা:",
        orderButtonText: "এখনই অর্ডার করুন", // For WhatsApp order
        totalLabel: "মোট:",
        removeItem: "মুছে ফেলুন", // For removing item from cart

        // Category/Brand Page
        productsNotFound: "এই ক্যাটাগরি/ব্র্যান্ডের কোন পণ্য এখন নেই।",
        categoryNotFound: "এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।",
        contactForProductButton: "আপনার পন্যের জন্য যোগাযোগ করুন", // For missing category

        // General
        currencySymbol: "৳", // Bangladeshi Taka Symbol
    },

    // WhatsApp Message Templates (Bengali)
    whatsappMessages: {
        orderPrefix: "আসসালামু আলাইকুম,\nআমি নিম্নলিখিত পণ্যগুলো অর্ডার করতে চাই:\n\n",
        customerInfoLabels: {
            name: "নাম:",
            phone: "ফোন:",
            location: "ঠিকানা:"
        },
        orderSuffix: "\nধন্যবাদ!",
        outOfStockInquiry: "আসসালামু আলাইকুম, আমি [%PRODUCT_NAME%] পণ্যটির স্টক সম্পর্কে জানতে আগ্রহী।", // %PRODUCT_NAME% will be replaced
        missingCategoryInquiry: "আসসালামু আলাইকুম, আমি [%CATEGORY_NAME%] ক্যাটাগরির একটি পণ্য খুঁজছি যা আমি আপনাদের ওয়েবসাইটে পাইনি।" // %CATEGORY_NAME% will be replaced
    },

    // Product Categories and their data files
    // Product IDs should use a prefix related to the category key (e.g., cosmetic -> cos001)
    categories: {
        cosmetic: {
            name: "কসমেটিক", // Bengali Name for display
            dataFile: "js/data/cosmetic.js"
        },
        mudi_item: {
            name: "মুদি আইটেম",
            dataFile: "js/data/mudi_item.js"
        },
        snacks: {
            name: "স্ন্যাকস",
            dataFile: "js/data/snacks.js"
        },
        kacha_mal: {
            name: "কাঁচা মাল",
            dataFile: "js/data/kacha_mal.js"
        },
        sanitary_item: {
            name: "স্যানিটারি আইটেম",
            dataFile: "js/data/sanitary_item.js"
        },
        electronics: {
            name: "ইলেকট্রনিকস",
            dataFile: "js/data/electronics.js"
        },
        baby_item: {
            name: "বেবি আইটেম",
            dataFile: "js/data/baby_item.js"
        },
        stationary_items: {
            name: "স্টেশনারি আইটেম",
            dataFile: "js/data/stationary_items.js"
        }
    },

    // Brand configuration (name can be used to filter products)
    // Add more details like logo URLs if displaying brand logos directly from here
    brands: [
        { id: "brandA", name: "ব্র্যান্ড A", logoUrl: "assets/images/placeholder_brand_logo.png" },
        { id: "brandB", name: "ব্র্যান্ড B", logoUrl: "assets/images/placeholder_brand_logo.png" },
        { id: "brandC", name: "ব্র্যান্ড C", logoUrl: "assets/images/placeholder_brand_logo.png" },
        { id: "brandD", name: "ব্র্যান্ড D", logoUrl: "assets/images/placeholder_brand_logo.png" },
        { id: "brandE", name: "ব্র্যান্ড E", logoUrl: "assets/images/placeholder_brand_logo.png" },
        { id: "brandF", name: "ব্র্যান্ড F", logoUrl: "assets/images/placeholder_brand_logo.png" }
        // Ensure product data files use these brand ids (e.g., "brandA") in their `brand` field
    ],

    // Slideshow settings
    slideshowImages: [
        "assets/images/landscape_slide1.jpg",
        "assets/images/landscape_slide2.jpg",
        // Add more image paths here
    ],
    slideshowInterval: 3000, // milliseconds (3 seconds)

    // Stock Thresholds
    lowStockThreshold: 5,

    // Google Maps Embed URL (replace with your actual shop embed URL)
    googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.053979296685!2d89.02017031500584!3d24.906060983909503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc86447568d59d%3A0x1543e7f267ac9096!2sJoypurhat!5e0!3m2!1sen!2sbd!4v1715944000000!5m2!1sen!2sbd", // Example: Joypurhat
};

// To make config accessible globally, particularly if not using modules for data files yet
window.APP_CONFIG = config;