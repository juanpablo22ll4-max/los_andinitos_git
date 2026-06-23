// Scroll suave al menú

function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}


// Animación de aparición al hacer scroll

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.15
});


// Elementos a animar

document.querySelectorAll(
    ".card, .combo, .drink-card, .pickup, .cta"
).forEach(item => {

    item.classList.add("hidden");
    observer.observe(item);

});


// Efecto suave para el botón WhatsApp

const whatsappBtn = document.querySelector(".whatsapp-btn");

if(whatsappBtn){

    whatsappBtn.addEventListener("mouseenter", () => {

        whatsappBtn.style.transform = "scale(1.08)";

    });

    whatsappBtn.addEventListener("mouseleave", () => {

        whatsappBtn.style.transform = "scale(1)";

    });

}
