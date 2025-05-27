// js/data/stationary_items.js

const stationaryItemsProducts = [
    {
        id: "sta001",
        name: "বল পয়েন্ট কলম (৫টি, নীল)", // Bengali Name: Ballpoint Pen (5 pcs, Blue)
        price: 50,    // BDT
        description: "মসৃণ লেখার জন্য উন্নত মানের বল পয়েন্ট কলম। ৫টি নীল কালির কলমের প্যাকেট।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 150,
        brand: "brandF" // Example brand
    },
    {
        id: "sta002",
        name: "লেখার খাতা (১২০ পৃষ্ঠা)", // Bengali Name: Writing Notebook (120 pages)
        price: 45,
        description: "উন্নত মানের কাগজে তৈরি, ১২০ পৃষ্ঠার লেখার খাতা। লাইন টানা।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 200,
        brand: "generic" // Can use a generic brand ID if specific brand isn't important
    },
    {
        id: "sta003",
        name: "পেন্সিল বক্স (বেসিক)", // Bengali Name: Pencil Box (Basic)
        price: 70,
        description: "কলম, পেন্সিল ও অন্যান্য স্টেশনারি সামগ্রী রাখার জন্য সাধারণ মানের পেন্সিল বক্স।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 80,
        brand: "generic"
    },
    {
        id: "sta004",
        name: "স্ট্যাপলার মেশিন (ছোট)", // Bengali Name: Stapler Machine (Small)
        price: 150,
        description: "ছোট আকারের স্ট্যাপলার মেশিন, সাথে এক বক্স পিন ফ্রি। সহজে ব্যবহারযোগ্য।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 60,
        brand: "brandA"
    }
];

// If using "generic" or "localFarm" as brand IDs, ensure your display logic
// handles cases where a brand ID might not be in the main config.brands list,
// or add them to config.brands if you want them to be filterable.
// For simplicity, they can just be identifiers.

if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.stationary_items = stationaryItemsProducts;