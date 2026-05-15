const PRODUCTS = [
  { id: 1, name: "Ceramic Mug", category: "Home", price: 18, emoji: "☕" },
  { id: 2, name: "Linen Tote", category: "Accessories", price: 32, emoji: "👜" },
  { id: 3, name: "Scented Candle", category: "Home", price: 24, emoji: "🕯️" },
  { id: 4, name: "Wireless Earbuds", category: "Tech", price: 79, emoji: "🎧" },
  { id: 5, name: "Desk Plant", category: "Home", price: 22, emoji: "🪴" },
  { id: 6, name: "Leather Wallet", category: "Accessories", price: 45, emoji: "👛" },
  { id: 7, name: "Notebook Set", category: "Stationery", price: 14, emoji: "📓" },
  { id: 8, name: "Water Bottle", category: "Outdoors", price: 28, emoji: "🍶" },
];

const STORAGE_KEY = "shop-cart";

const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortSelect");
const cartToggle = document.getElementById("cartToggle");
const cartClose = document.getElementById("cartClose");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartList = document.getElementById("cartList");
const cartEmpty = document.getElementById("cartEmpty");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

let cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function sortProducts(list, mode) {
  const copy = [...list];
  switch (mode) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

function renderProducts() {
  const sorted = sortProducts(PRODUCTS, sortSelect.value);
  productGrid.innerHTML = sorted
    .map(
      (p) => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-card__image" aria-hidden="true">${p.emoji}</div>
      <div class="product-card__body">
        <span class="product-card__category">${p.category}</span>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__price">${formatPrice(p.price)}</p>
        <button type="button" class="btn btn--primary add-btn" data-id="${p.id}">
          Add to cart
        </button>
      </div>
    </article>
  `
    )
    .join("");

  productGrid.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function getCartItems() {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === Number(id));
      return product ? { product, qty } : null;
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartItems().reduce((sum, { product, qty }) => sum + product.price * qty, 0);
}

function getCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  updateCartUI();
  showToast("Added to cart");
}

function setQuantity(id, delta) {
  const next = (cart[id] || 0) + delta;
  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = {};
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const count = getCartCount();
  const items = getCartItems();
  const total = getCartTotal();

  cartCount.textContent = count;
  cartCount.dataset.zero = count === 0 ? "true" : "false";
  cartSubtotal.textContent = formatPrice(total);
  checkoutBtn.disabled = count === 0;

  if (items.length === 0) {
    cartEmpty.classList.remove("is-hidden");
    cartList.innerHTML = "";
  } else {
    cartEmpty.classList.add("is-hidden");
    cartList.innerHTML = items
      .map(
        ({ product, qty }) => `
      <li class="cart-item">
        <span class="cart-item__emoji">${product.emoji}</span>
        <div class="cart-item__info">
          <p class="cart-item__name">${product.name}</p>
          <p class="cart-item__meta">${formatPrice(product.price)} each</p>
        </div>
        <div class="cart-item__qty">
          <button type="button" aria-label="Decrease quantity" data-action="dec" data-id="${product.id}">−</button>
          <span>${qty}</span>
          <button type="button" aria-label="Increase quantity" data-action="inc" data-id="${product.id}">+</button>
        </div>
        <button type="button" class="cart-item__remove" data-action="remove" data-id="${product.id}">Remove</button>
      </li>
    `
      )
      .join("");
  }

  cartList.querySelectorAll("[data-action]").forEach((btn) => {
    const id = Number(btn.dataset.id);
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action === "inc") setQuantity(id, 1);
      else if (action === "dec") setQuantity(id, -1);
      else if (action === "remove") removeFromCart(id);
    });
  });
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("is-visible");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("is-visible");
  document.body.style.overflow = "";
}

let toastEl;
function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
}

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
clearCartBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", () => {
  if (getCartCount() === 0) return;
  showToast("Checkout is demo only — no payment processed.");
  closeCart();
});
sortSelect.addEventListener("change", renderProducts);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCart();
});

renderProducts();
updateCartUI();
