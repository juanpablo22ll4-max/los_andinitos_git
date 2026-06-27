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
   + / -
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
   ELIMINAR
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
   TOTAL (FUNCION CENTRAL)
========================= */
function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* =========================
   WHATSAPP PRO
========================= */
function sendWhatsApp() {

    let number = "18156931468";

    if (cart.length === 0) {
        showToast("Carrito vacío");
        return;
    }

    let message = "🛒 Pedido:%0A%0A";

    cart.forEach(item => {
        message += `• ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}%0A`;
    });

    message += `%0A💰 Total: $${getTotal().toFixed(2)}`;

    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
}

/* =========================
   SMS PRO
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

    window.location.href =
        `sms:${phone}?body=${encodeURIComponent(message)}`;
}

/* =========================
   TOAST PRO
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
   INICIALIZAR
========================= */
updateCart();