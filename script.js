let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   GUARDAR CARRITO
========================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   AGREGAR AL CARRITO
========================= */
function addToCart(name, price) {

  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  updateCart();
  showToast("Agregado ✔");
}


/* =========================
   LIMPIEZA DIARIA
========================= */

let today = new Date().toDateString();
let lastVisit = localStorage.getItem("lastVisit");

if (lastVisit !== today) {
  localStorage.removeItem("cart");
  localStorage.setItem("lastVisit", today);
}

/* =========================
   CARRITO
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ACTUALIZAR CARRITO
========================= */
function updateCart() {

  const list = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  const totalItemsEl = document.getElementById("totalItems");

  if (!list || !totalPriceEl || !totalItemsEl) return;

  list.innerHTML = "";

  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {

    let subtotal = item.price * item.qty;

    totalPrice += subtotal;
    totalItems += item.qty;

    list.innerHTML += `
      <li class="cart-item">
        <span>${item.name}</span>
        <span>x${item.qty}</span>
        <span>$${subtotal.toFixed(2)}</span>

        <div class="actions">
          <button onclick="removeOne(${index})">−</button>
          <button onclick="addOne(${index})">+</button>
          <button onclick="removeItem(${index})">❌</button>
        </div>
      </li>
    `;
  });

  totalPriceEl.textContent = totalPrice.toFixed(2);
  totalItemsEl.textContent = totalItems;

  saveCart();
}

/* =========================
   SUMAR / RESTAR
========================= */
function addOne(index) {
  cart[index].qty++;
  updateCart();
}

function removeOne(index) {
  cart[index].qty--;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

/* =========================
   ELIMINAR ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
  showToast("Eliminado ❌");
}

/* =========================
   LIMPIAR CARRITO
========================= */
function clearCart() {
  cart = [];
  updateCart();
  showToast("Carrito vacío 🧺");
}

/* =========================
   TOTAL
========================= */
function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* =========================
   WHATSAPP
========================= */
function sendWhatsApp() {

  let number = "18156931468";

  if (cart.length === 0) {
    showToast("Carrito vacío");
    return;
  }

  let message = "🛒 PEDIDO CONFIRMADO\n\n";

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += "\n━━━━━━━━━━━━━━\n";
  message += "📄 FACTURA\n";
  message += "━━━━━━━━━━━━━━\n";

  message += `Subtotal: $${getTotal().toFixed(2)}\n`;
  message += `Impuestos: $0.00\n`;
  message += `Descuento: $0.00\n\n`;

  message += `💰 TOTAL FINAL: $${getTotal().toFixed(2)}`;

  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* =========================
   SMS
========================= */
function sendSMS() {

  if (cart.length === 0) {
    showToast("Carrito vacío");
    return;
  }

  let phone = "+18156931468";

  let message = "Pedido:\n\n";

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += `\nTotal: $${getTotal().toFixed(2)}`;

  window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
}

/* =========================
   TOAST
========================= */
function showToast(text) {

  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = text;
  toast.className = "show";

  setTimeout(() => {
    toast.className = "";
  }, 1500);
}

/* =========================
   HOVER EFECTO CARDS
========================= */
document.querySelectorAll('.product').forEach(card => {

  card.addEventListener('mousemove', (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 25;
    const moveY = (y - centerY) / 25;

    card.style.transform = `scale(1.03) translate(${moveX}px, ${moveY}px)`;
    card.style.transition = "transform 0.1s ease-out";
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = "scale(1)";
    card.style.transition = "transform 0.4s ease";
  });
});

/* =========================
   COMBO ANDINITO
========================= */
function addCombo() {

  let carne = parseInt(document.getElementById("carne").value) || 0;
  let queso = parseInt(document.getElementById("queso").value) || 0;
  let jamon = parseInt(document.getElementById("jamon").value) || 0;

  let total = carne + queso + jamon;

  if (total !== 10) {
    alert("Debes seleccionar exactamente 10 pasteles en total");
    return;
  }

  let descripcion =
`🍱 Combo Andinito

━━━━━━━━━━━━━━

🥩 Carne           : ${carne}
🧀 Queso           : ${queso}
🥪 Jamón y Queso   : ${jamon}

━━━━━━━━━━━━━━
Total pasteles : 10
Precio         : $25`;

  addToCart(descripcion, 25);
}

/* =========================
   INICIAR
========================= */
updateCart();