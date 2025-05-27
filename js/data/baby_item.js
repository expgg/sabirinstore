// js/data/baby_item.js

const babyItemProducts = [
    {
        id: "bab001",
        name: "বেবি ডায়াপার (মিডিয়াম, ৫০ পিস)", // Bengali Name: Baby Diaper (Medium, 50 pcs)
        price: 700,    // BDT
        description: "নরম ও শোষণ ক্ষমতা সম্পন্ন বেবি ডায়াপার। শিশুর ত্বকের জন্য নিরাপদ। মিডিয়াম সাইজ, ৫০ পিসের প্যাকেট।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 40,
        brand: "brandC" // Example brand for baby products
    },
    {
        id: "bab002",
        name: "বেবি লোশন (২০০ মিলি)", // Bengali Name: Baby Lotion (200ml)
        price: 280,
        description: "শিশুর কোমল ত্বকের জন্য বিশেষভাবে তৈরি, প্যারাবেন মুক্ত বেবি লোশন। ২০০ মিলি বোতল।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 55,
        brand: "brandD"
    },
    {
        id: "bab003",
        name: "বেবি ওয়াইপস (৮০ পিস)", // Bengali Name: Baby Wipes (80 pcs)
        price: 180,
        description: "অ্যালকোহল মুক্ত ও সুগন্ধিযুক্ত বেবি ওয়াইপস। পরিষ্কার ও সতেজ রাখে। ৮০ পিসের প্যাকেট।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 60,
        brand: "brandC"
    },
    {
        id: "bab004",
        name: "ফিডিং বোতল (২৫০ মিলি)", // Bengali Name: Feeding Bottle (250ml)
        price: 320,
        description: "বিপিএ মুক্ত, নিরাপদ ফিডিং বোতল। ২৫০ মিলি ধারণক্ষমতা। সহজে পরিষ্কার করা যায়।",
        photoUrl: "assets/images/placeholder_product_1x1.png",
        stockLeft: 35,
        brand: "brandE"
    }
];

if (typeof window.PRODUCT_DATA === 'undefined') {
    window.PRODUCT_DATA = {};
}
window.PRODUCT_DATA.baby_item = babyItemProducts;