import { config, tag_site} from "./config.js";


document.addEventListener("DOMContentLoaded", () => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const favicon = document.querySelector('link[rel="icon"]');

    const sections = document.querySelectorAll(".expandable");

    const button_whats = document.querySelectorAll(".button_whats");
    const button_mail = document.querySelector(".button_mail");
    const button_telegram = document.querySelector(".button_telegram");

    const text_xa12 = document.querySelector(".xa12");

    document.title = tag_site.title;
    metaDescription.setAttribute("content", tag_site.description);
    favicon.href = tag_site.favicon;
    text_xa12.textContent = config.name;
    button_mail.href = config.mail_endereço;
    button_telegram.href = config.telegram_link;
    
    const linkSections = document.querySelectorAll(".links-section-go-to"); // Seleciona todos os elementos com a classe .links-section-go-to

    linkSections.forEach(section => {
        const links = section.querySelectorAll("a"); // Seleciona todos os links dentro de cada seção .links-section-go-to
        
        links.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
    
                // Pega o alvo pelo ID do href
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
    
                // Fecha todos os outros
                sections.forEach(section => {
                    if (section !== targetSection) {
                        section.classList.remove("active");
                    }
                });
    
                // Toggle na seção clicada
                targetSection.classList.toggle("active");
    
                // Scroll até ela (opcional, pode remover se quiser só abrir)
                targetSection.scrollIntoView({ behavior: "smooth" });
            });
        });
    });

    const swiper = new Swiper('.Swiper_Souso', {
        slidesPerView: 3,
        spaceBetween: 5,
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });



    button_whats.forEach(button => {
        button.addEventListener('click', function(){
            window.open(config.whats_link, "_blank");
        })
    });

});
