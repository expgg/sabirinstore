// js/data/mudi_item.js

const mudiItemProducts = [
    {
        id: "mud001",
        name: " চিনি (১ কেজি)", // Bengali Name: Sugar (1 kg)
        price: 140,    // BDT
        description: "ফ্রেশ ও পরিষ্কার চিনি, দৈনন্দিন ব্যবহারের জন্য। ১ কেজি প্যাকেট।", // Bengali Description
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 100,
        brand: "brandC" // Example brand
    },
    {
        id: "mud002",
        name: "সয়াবিন তেল (৫ লিটার)", // Bengali Name: Soybean Oil (5 Liter)
        price: 850,
        description: "ভিটামিন সমৃদ্ধ খাঁটি সয়াবিন তেল। রান্নার জন্য স্বাস্থ্যকর انتخاب। ৫ লিটারের বোতল।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 60,
        brand: "brandA"
    },
    {
        id: "mud003",
        name: "মসুর ডাল (১ কেজি)", // Bengali Name: Masoor Dal (Red Lentils) (1 kg)
        price: 130,
        description: "উচ্চ মানের দেশি মসুর ডাল, সহজে সিদ্ধ হয় এবং সুস্বাদু। ১ কেজি প্যাকেট।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 75,
        brand: "brandB"
    },
    {
        id: "mud004",
        name: "আটা (২ কেজি)", // Bengali Name: Atta (Flour) (2 kg)
        price: 120,
        description: "রুটি ও পরোটা তৈরির জন্য সেরা মানের আটা। ২ কেজি প্যাকেট।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 0, // Out of stock example
        brand: "brandC"
    }
];

if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.mudi_item = mudiItemProducts;