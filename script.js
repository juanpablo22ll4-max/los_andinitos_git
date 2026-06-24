let cart = [];

/* =========================
   SCROLL AL MENÚ
========================= */
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

/* =========================
   ANIMACIONES SCROLL
========================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".card, .combo, .drink-card, .pickup, .cta"
).forEach(item => {
    item.classList.add("hidden");
    observer.observe(item);
});

/* =========================
   WHATSAPP EFFECT
========================= */
const whatsappBtn = document.querySelector(".whatsapp-btn");

if (whatsappBtn) {
    whatsappBtn.addEventListener("mouseenter", () => {
        whatsappBtn.style.transform = "scale(1.08)";
    });

    whatsappBtn.addEventListener("mouseleave", () => {
        whatsappBtn.style.transform = "scale(1)";
    });
}

/* =========================
   AGREGAR AL CARRITO (CORRECTO)
========================= */
function addToCart(name, price){

    let item = cart.find(i => i.name === name);

    if(item){
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCart();
    showToast("Agregado ✔");
}

/* =========================
   ACTUALIZAR CARRITO
========================= */
function updateCart(){

    const list = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");

    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        list.innerHTML += `
            <li>
                ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}

                <button onclick="removeOne(${index})">−</button>
                <button onclick="addOne(${index})">+</button>
                <button onclick="removeItem(${index})">❌</button>
            </li>
        `;
    });

    totalEl.textContent = total.toFixed(2);
}

/* =========================
   + Y -
========================= */
function addOne(index){
    cart[index].qty++;
    updateCart();
}

function removeOne(index){
    cart[index].qty--;

    if(cart[index].qty <= 0){
        cart.splice(index, 1);
    }

    updateCart();
}

/* =========================
   ELIMINAR COMPLETO
========================= */
function removeItem(index){
    cart.splice(index, 1);
    updateCart();
    showToast("Eliminado ❌");
}

/* =========================
   WHATSAPP
========================= */
function sendWhatsApp(){

    let number = "16308194415";

    let message = "Hola, quiero pedir:%0A%0A";

    cart.forEach(item => {
        message += `• ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}%0A`;
    });

    let total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    message += `%0ATotal: $${total.toFixed(2)}`;

    window.open(
        `https://wa.me/${number}?text=${message}`,
        "_blank"
    );
}

/* =========================
   TOAST
========================= */
function showToast(text){

    const toast = document.getElementById("toast");

    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1500);
}