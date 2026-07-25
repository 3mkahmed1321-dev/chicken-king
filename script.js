// بيانات الأصناف الـ 20 بصور مضمونة
// بيانات الأصناف الـ 20 بصور مضمونة وشغالة 100%
const foodItems = [
    { id: 1, name: "دجاج كينج المقلي", price: 130, img: "https://images.unsplash.com/photo-1626645738196-c2a7c8d38958?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "برجر السيطرة دبل", price: 165, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "بيتزا رانش ملكية", price: 190, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "بوكس العيلة الكبير", price: 450, img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "مكرونة لافا تشيز", price: 115, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "ساندوتش زنجر ناري", price: 135, img: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "أجنحة سبايسي (12 ق)", price: 125, img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "بطاطس تشيدر", price: 70, img: "https://images.unsplash.com/photo-1573016608244-7d5f8a33ed21?auto=format&fit=crop&w=500&q=80" },
    { id: 9, name: "حلقات بصل كرسبي", price: 55, img: "https://images.unsplash.com/photo-1639024471283-035188835118?auto=format&fit=crop&w=500&q=80" },
    { id: 10, name: "بيبسي لتر مثلج", price: 40, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80" }
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
