// js/data/sanitary_item.js

const sanitaryItemProducts = [
    {
        id: "san001",
        name: "হ্যান্ড স্যানিটাইজার (১০০ মিলি)", // Bengali Name: Hand Sanitizer (100ml)
        price: 80,    // BDT
        description: "জীবাণুनाशক অ্যালকোহল ভিত্তিক হ্যান্ড স্যানিটাইজার। সহজে বহনযোগ্য ১০০ মিলি বোতল।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 120,
        brand: "brandD"
    },
    {
        id: "san002",
        name: "ফেসমাস্ক (১০ পিস বক্স)", // Bengali Name: Facemask (10 pcs box)
        price: 100,
        description: "উচ্চ মানের ৩-লেয়ার সার্জিক্যাল ফেসমাস্ক। ১০ পিসের বক্স।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 90,
        brand: "brandE"
    },
    {
        id: "san003",
        name: "টয়লেট ক্লিনার (৫০০ মিলি)", // Bengali Name: Toilet Cleaner (500ml)
        price: 95,
        description: "শক্তিশালী টয়লেট ক্লিনার, জীবাণু দূর করে ও দুর্গন্ধমুক্ত রাখে। ৫০০ মিলি।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 65,
        brand: "brandF"
    },
    {
        id: "san004",
        name: "লিকুইড হ্যান্ডওয়াশ (২৫০ মিলি)", // Bengali Name: Liquid Handwash (250ml)
        price: 70,
        description: "ত্বকের জন্য কোমল এবং জীবাণুनाशক লিকুইড হ্যান্ডওয়াশ। ২৫০ মিলি রিফিল প্যাক বা বোতল।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 85,
        brand: "brandD"
    }
];

if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.sanitary_item = sanitaryItemProducts;