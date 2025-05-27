// js/data/kacha_mal.js

const kachaMalProducts = [
    {
        id: "kac001",
        name: "আলু (১ কেজি)", // Bengali Name: Potato (1 kg)
        price: 45,    // BDT
        description: "টাটকা এবং বাছাই করা আলু, সব ধরনের রান্নার জন্য উপযুক্ত। প্রতি কেজি।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 200, // Stock might be in kg or units depending on how you sell
        brand: "localFarm" // Could be a generic brand for local produce
    },
    {
        id: "kac002",
        name: "পেঁয়াজ (১ কেজি)", // Bengali Name: Onion (1 kg)
        price: 90,
        description: "দেশি পেঁয়াজ, রান্নার স্বাদ বাড়াতে অপরিহার্য। প্রতি কেজি।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 150,
        brand: "localFarm"
    },
    {
        id: "kac003",
        name: "টমেটো (১ কেজি)", // Bengali Name: Tomato (1 kg)
        price: 70,
        description: "পাকা ও টাটকা টমেটো, সালাদ ও তরকারির জন্য। প্রতি কেজি।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 80,
        brand: "localFarm"
    },
    {
        id: "kac004",
        name: "কাঁচা মরিচ (২৫০ গ্রাম)", // Bengali Name: Green Chili (250 gm)
        price: 40,
        description: "ঝাল ও সতেজ কাঁচা মরিচ। ২৫০ গ্রাম।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 50, // Stock in packs/units
        brand: "localFarm"
    }
];

// Note: For 'kacha_mal', you might define 'brand' differently,
// or use one of the config brands if applicable (e.g., an organic brand).
// I used "localFarm" as an example; ensure this brand ID is handled or defined if you want specific brand filtering.
// If not linking to a specific brand from config.brands, you can use a generic ID or leave it empty if brand filtering isn't critical for these items.

if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.kacha_mal = kachaMalProducts;