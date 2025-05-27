// js/data/electronics.js

const electronicsProducts = [
    {
        id: "ele001",
        name: "এনার্জি সেভিং এলইডি বাল্ব (৯ ওয়াট)", // Bengali Name: Energy Saving LED Bulb (9 Watt)
        price: 120,    // BDT
        description: "উজ্জ্বল আলো ও দীর্ঘস্থায়ী, বিদ্যুৎ সাশ্রয়ী ৯ ওয়াটের এলইডি বাল্ব। ২ বছরের ওয়ারেন্টি।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 70,
        brand: "brandF" // Example brand
    },
    {
        id: "ele002",
        name: "মাল্টিপ্লাগ (৪ পোর্ট)", // Bengali Name: Multiplug (4 Port)
        price: 350,
        description: "৪টি পোর্ট এবং সুরক্ষা সার্কিট সহ উন্নত মানের মাল্টিপ্লাগ। লম্বা তার যুক্ত।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 45,
        brand: "brandE"
    },
    {
        id: "ele003",
        name: "পাওয়ার ব্যাংক (১০০০০ mAh)", // Bengali Name: Power Bank (10000 mAh)
        price: 1200,
        description: "দ্রুত চার্জিং সুবিধা সহ ১০০০০ mAh ক্ষমতা সম্পন্ন পোর্টেবল পাওয়ার ব্যাংক। একাধিক ডিভাইসের জন্য উপযোগী।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 30,
        brand: "brandA"
    },
    {
        id: "ele004",
        name: "হেডফোন (বেসিক)", // Bengali Name: Headphone (Basic)
        price: 450,
        description: "পরিষ্কার সাউন্ড কোয়ালিটি সহ আরামদায়ক বেসিক হেডফোন। গান শোনা বা কথা বলার জন্য।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 0, // Out of stock
        brand: "brandB"
    }
];

if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.electronics = electronicsProducts;