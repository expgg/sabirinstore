// js/data/cosmetic.js

// Ensure APP_CONFIG is available or handle it gracefully if loaded directly in some contexts
// For simplicity, we assume APP_CONFIG is loaded globally before this file.

const cosmeticProducts = [
    {
        id: "cos001", // Category prefix + unique number
        name: "ফেসওয়াশ", // Bengali Name: Brightening Facewash
        price: 300, // BDT
        description: "এই ফেসওয়াশটি আপনার ত্বককে গভীরভাবে পরিষ্কার করে এবং তাৎক্ষণিকভাবে উজ্জ্বলতা প্রদান করে। সব ধরনের ত্বকের জন্য উপযুক্ত।", // Bengali Description
        photoUrl: "https://m.media-amazon.com/images/I/512dChFNuXL.jpg", // Placeholder image
        stockLeft: 20,
        brand: "brandA" // Matches an ID from APP_CONFIG.brands
    },
    {
        id: "cos002",
        name: "অ্যালোভেরা ময়েশ্চারাইজিং লোশন", // Bengali Name: Aloe Vera Moisturizing Lotion
        price: 350,
        description: "অ্যালোভেরার গুণাগুণ সমৃদ্ধ এই লোশনটি ত্বককে নরম ও মসৃণ রাখে। শুষ্ক ত্বকের জন্য বিশেষভাবে কার্যকরী।",
        photoUrl: "https://z.nooncdn.com/products/tr:n-t_400/v1615982038/N21315136A_1.jpg",
        stockLeft: 25,
        brand: "brandB"
    },
    {
        id: "cos003",
        name: "লাল রঙের ম্যাট লিপস্টিক", // Bengali Name: Red Matte Lipstick
        price: 480,
        description: "দীর্ঘস্থায়ী এবং আকর্ষণীয় ম্যাট ফিনিশের লাল লিপস্টিক। আপনার সাজকে আরও ফুটিয়ে তুলবে।",
        photoUrl: "https://nirnita.com/storage/mac-retro-matte-lipstick-ruby-woo-1.png",
        stockLeft: 8, // Example of low stock
        brand: "brandA"
    },
    {
        id: "cos004",
        name: "সানস্ক্রিন এসপিএফ ৫০", // Bengali Name: Sunscreen SPF 50
        price: 600,
        description: "এসপিএফ ৫০ যুক্ত এই সানস্ক্রিনটি সূর্যের ক্ষতিকর রশ্মি থেকে আপনার ত্বককে রক্ষা করে। প্রতিদিন ব্যবহারের জন্য আদর্শ।",
        photoUrl: "https://dhz27qxctdo0r.cloudfront.net/images/scale/2x/534c090b36c20f34dc43011165786b4a.webp",
        stockLeft: 0, // Example of out of stock
        brand: "brandC"
    }
];

// To make this data accessible if loaded dynamically by a script tag
// This approach is simple for now.
// A more robust system might involve callbacks or promises when loading data.
if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.cosmetic = cosmeticProducts;