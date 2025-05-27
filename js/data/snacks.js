// js/data/snacks.js

// Assuming APP_CONFIG is globally available via config.js

const snackProducts = [
    {
        id: "snk001", // Category prefix + unique number
        name: "আলুর চিপস", // Bengali Name: Potato Chips (Salted)
        price: 20,    // BDT
        description: "টাটকা আলু থেকে তৈরি, হালকা লবণাক্ত স্বাদের মুচমুচে চিপস। যেকোনো সময়ের জন্য পারফেক্ট স্ন্যাকস।", // Bengali Description
        photoUrl: "https://e7.pngegg.com/pngimages/920/257/png-clipart-potato-chip-junk-food-french-fries-dal-baking-chips-packet-food-baking-thumbnail.png", // Replace with actual image path
        stockLeft: 500,
        brand: "brandB" // Matches an ID from APP_CONFIG.brands
    },
    {
        id: "snk002",
        name: "চানাচুর (মিক্সড)", // Bengali Name: Chanachur (Mixed)
        price: 60,
        description: "বিভিন্ন প্রকার ডাল, বাদাম ও মসলার মিশ্রণে তৈরি ঝাল ও মিষ্টি স্বাদের জনপ্রিয় চানাচুর।",
        photoUrl: "https://satmathabazar.com/wp-content/uploads/2024/01/ruchi-jhal-chanachur-150-gm-1-346x310.webp",
        stockLeft: 30,
        brand: "brandD"
    },
    {
        id: "snk003",
        name: "চকলেট বিস্কুট", // Bengali Name: Chocolate Biscuit
        price: 120,
        description: "চকলেট كريمة ভরা প্রিমিয়াম কোয়ালিটির বিস্কুট। ছোট ও বড় সবার পছন্দের।",
        photoUrl: "https://dokanpat.com.bd/wp-content/uploads/2022/03/haque-mr-cookie-biscuits-1-600x600.jpg",
        stockLeft: 0, // Out of stock example
        brand: "brandA"
    },
    {
        id: "snk004",
        name: "মিনি সিঙাড়া (ফ্রোজেন)", // Bengali Name: Mini Singara (Frozen)
        price: 150, // Pack price
        description: "ঘরে বসে উপভোগ করার জন্য প্রস্তুতকৃত ফ্রোজেন মিনি সিঙাড়া। হালকা ভেজে নিলেই তৈরি। ১০ পিসের প্যাকেট।",
        photoUrl: "https://i0.wp.com/bayna.store/wp-content/uploads/2020/12/rsz_mini_chicken_singara_300g.jpg?fit=1000%2C1000&ssl=1&w=640",
        stockLeft: 22,
        brand: "brandE" // Assuming brandE is a local or unbranded category
    }
];

// Make data accessible
if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.snacks = snackProducts;