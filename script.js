// بيانات الأصناف الـ 20 بصور مضمونة
// بيانات الأصناف الـ 20 بصور مضمونة وشغالة 100%
// بيانات الأصناف الـ 10 بصور شغالين ومضمونين 100%
const foodItems = [
    { id: 1, name: "دجاج كينج المقلي", price: 130, img: "https://unsplash.com/photos/fried-chicken-with-dip-P_z_xlMGuEk" },
    { id: 2, name: "برجر السيطرة دبل", price: 165, img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "بيتزا رانش ملكية", price: 190, img: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "بوكس العيلة الكبير", price: 450, img: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, name: "مكرونة لافا تشيز", price: 115, img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "ساندوتش زنجر ناري", price: 135, img: "https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 7, name: "أجنحة سبايسي (12 ق)", price: 125, img: "https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 8, name: "بطاطس تشيدر", price: 70, img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 9, name: "حلقات بصل كرسبي", price: 55, img: "https://images.pexels.com/photos/920220/pexels-photo-920220.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 10, name: "بيبسي مثلج", price: 40, img: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

let cart = [];

// دالة لتوليد المنيو بعد ما الصفحة تحمل تماماً
function generateMenu() {
    const grid = document.getElementById('items-grid');
    if (!grid) return;
    
    grid.innerHTML = ""; // تفريغ الشبكة
    
    for (let i = 0; i < 20; i++) {
        const item = foodItems[i % foodItems.length];
        grid.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p style="color:#ffcc00; font-size:1.2rem; font-weight:bold">${item.price} ج.م</p>
                <button class="add-btn" id="btn-${i}" onclick="handleCart(${i}, '${item.name}', ${item.price})">أضف للسلة</button>
            </div>
        `;
    }
}

function handleCart(uiId, name, price) {
    const btn = document.getElementById(`btn-${uiId}`);
    const index = cart.findIndex(c => c.uiId === uiId);

    if (index === -1) {
        cart.push({uiId, name, price});
        if (btn) {
            btn.innerText = "إلغاء من السلة";
            btn.classList.add('cancel-neon');
        }
    } else {
        cart.splice(index, 1);
        if (btn) {
            btn.innerText = "أضف للسلة";
            btn.classList.remove('cancel-neon');
        }
    }
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
}

// فتح وإغلاق السلة
function toggleCart() {
    const modal = document.getElementById('cart-popup');
    if (!modal) return;
    
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
        renderCart();
    }
}

function goToMenu() {
    document.getElementById('hero').classList.remove('active');
    document.getElementById('menu-page').classList.add('active');
}

function goToHero() {
    document.getElementById('menu-page').classList.remove('active');
    document.getElementById('hero').classList.add('active');
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    let total = 0;
    if (!container) return;
    
    container.innerHTML = "";
    cart.forEach(c => {
        total += c.price;
        container.innerHTML += `
            <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid #333">
                <span>${c.name}</span> <span>${c.price} ج.م</span>
            </div>`;
    });
    
    const totalPrice = document.getElementById('total-price');
    if (totalPrice) totalPrice.innerText = total;
}

// تشغيل الشغل المظبوط أول ما الصفحة تفتح
window.addEventListener('DOMContentLoaded', () => {
    generateMenu();
    const modal = document.getElementById('cart-popup');
    if (modal) modal.style.display = "none";
});
