import { config, tag_site} from "./config.js";
import { servicos } from "./servicos.js";
import { projetos } from "./projetos.js";


document.addEventListener("DOMContentLoaded", () => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const favicon = document.querySelector('link[rel="icon"]');

    const sections = document.querySelectorAll(".expandable");

    const button_whats = document.querySelectorAll(".button_whats");
    const button_whats_top = document.querySelector(".button_whats_top");
    const button_mail = document.querySelectorAll(".button_mail");
    const button_telegram = document.querySelectorAll(".button_telegram");

    const text_xa12 = document.querySelector(".xa12");

    document.title = tag_site.title;
    metaDescription.setAttribute("content", tag_site.description);
    favicon.href = tag_site.favicon;
    text_xa12.textContent = config.name;
    
    const linkSections = document.querySelectorAll(".links-section-go-to"); // ajuste se necessário
    
    linkSections.forEach(section => {
        const links = section.querySelectorAll("a");
    
        links.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
    
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);

                
                if (!targetSection) {
                    console.warn(`Elemento com ID "${targetId}" não encontrado.`);
                    return; // sai da função
                }
    
                sections.forEach(sec => {
                    if (sec !== targetSection) {
                        sec.classList.remove("active");
                        sec.style.height = "0px";
                        sec.style.opacity = "0";
                    }
                });
    
                if (targetSection.classList.contains("active")) {
                    // Recolher
                    targetSection.classList.remove("active");
                    targetSection.style.height = "0px";
                    targetSection.style.opacity = "0";
                } else {
                    // Expandir
                    targetSection.classList.add("active");
    
                    // Define a altura de acordo com o conteúdo

    
                    // Após a transição, define height como auto (para crescimento dinâmico futuro)
                    setTimeout(() => {
                        if (targetSection.classList.contains("active")) {
                            targetSection.style.height = "auto";
                            targetSection.style.opacity = "1";
                        }
                    }, 400); // mesmo tempo da animação do CSS
                }
    
                targetSection.scrollIntoView({ behavior: "smooth" });
            });
        });
        const firstLink = links[0];
        if (firstLink) {
            firstLink.click(); // Simula o clique no primeiro link encontrado
        }
    });
    // Função para quebrar o texto
    function quebraTexto(texto, limite) {
        let resultado = '';
        for (let i = 0; i < texto.length; i += limite) {
            resultado += texto.substring(i, i + limite) + '\n'; // Quebra a linha a cada 'limite' caracteres
        }
        return resultado;
    }

    // Função para ajustar o limite com base no tamanho da tela
    function getLimitePorTela() {
        const larguraTela = window.innerWidth;
        console.log('Largura da tela:', larguraTela); // Verifica a largura da tela

        if (larguraTela > 1200) {
            return 80; // Para telas grandes (desktops)
        } else if (larguraTela > 768) {
            return 60; // Para tablets
        } else {
            return 40; // Para smartphones (telas pequenas)
        }
    }
    const div_sobre_mim = document.querySelector(".content-abouta");

    const sobre_mim = document.createElement("p");
    sobre_mim.classList.add("content_sobre");

    // Função para aplicar o conteúdo no elemento <p>
    function aplicarTexto() {
        const limite = getLimitePorTela(); // Calculando o limite de caracteres por linha
        sobre_mim.textContent = quebraTexto(config.sobre_min, limite); // Quebra o texto com o limite adequado
    }

    // Chamando a função para aplicar o texto inicialmente
    aplicarTexto();

    // Responsividade: atualizando conforme a tela redimensiona
    window.addEventListener('resize', () => {
        const novoLimite = getLimitePorTela();
        sobre_mim.textContent = quebraTexto(config.sobre_min, novoLimite);
    });
    
    div_sobre_mim.appendChild(sobre_mim);
    

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
    const swiperPreview = new Swiper('.swiper-preview', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }
    });

    button_whats.forEach(botoes => {
        botoes.addEventListener('click', () => {
            window.open(config.whats_link, "_blank");
        });
    });

    button_telegram.forEach(botoes => {
        botoes.addEventListener('click', () => {
            window.open(config.telegram_link, "_blank");
        });
    })

    button_mail.forEach(botoes => {
        botoes.addEventListener('click', () => {
            window.open(config.mail_endereço, "_blank");
        });
    })



    

    const main_container_services = document.querySelector(".main_service_list");
    servicos.forEach(servico => {
        const item = document.createElement('div');
        item.classList.add('item_list');
      
        // Criar um ID único para cada swiper
        const swiperId = `swiper-${Math.random().toString(36).substring(2, 9)}`;
      
        // Criar swiper
        const swiper = document.createElement('div');
        swiper.className = `swiper swiper-preview ${swiperId}`;
        swiper.innerHTML = `
          <div class="swiper-wrapper">
            ${servico.imagens.map(img => `
              <div class="swiper-slide preview_item_slide">
                <img src="${img}" alt="${servico.titulo}">
              </div>
            `).join('')}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        `;
      
        // Adiciona o swiper ao item
        item.appendChild(swiper);
      
        // Conteúdo textual/modal
        item.innerHTML += `
          <div class="modal-imagem-more"></div>
          <h3>${servico.titulo}</h3>
          <p>${servico.descricao}</p>
          <button class="btn-solicitar">Solicitar Orçamento</button>
        `;
      
        // Adiciona o item ao container principal
        main_container_services.appendChild(item);
      
        // Inicializa o swiper
        new Swiper(`.${swiperId}`, {
          loop: true,
          spaceBetween: 10,
          slidesPerView: 1,
          navigation: {
            nextEl: `.${swiperId} .swiper-button-next`,
            prevEl: `.${swiperId} .swiper-button-prev`,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }
        });
    });

    const main_container_projetos = document.querySelector(".main_service_list_myproject");
    projetos.forEach(projetos => {
        const item = document.createElement('div');
        item.classList.add('item_list');
      
        // Criar um ID único para cada swiper
        const swiperId = `swiper-${Math.random().toString(36).substring(2, 9)}`;
      
        // Criar swiper
        const swiper = document.createElement('div');
        swiper.className = `swiper swiper-preview ${swiperId}`;
        swiper.innerHTML = `
          <div class="swiper-wrapper">
            ${projetos.imagens.map(img => `
              <div class="swiper-slide preview_item_slide">
                <img src="${img}" alt="${projetos.titulo}">
              </div>
            `).join('')}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        `;
      
        // Adiciona o swiper ao item
        item.appendChild(swiper);
      
        // Conteúdo textual/modal
        item.innerHTML += `
          <div class="modal-imagem-more"></div>
          <h3>${projetos.titulo}</h3>
          <p>${projetos.descricao}</p>
          <button class="btn-preview">Ver Preview</button>
        `;

        const a = item.querySelector(".btn-preview");
        a.addEventListener('click', (e) => {
            const dominio = window.location.origin;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
    
            const rect = a.getBoundingClientRect();
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            ripple.style.left = e.clientX - rect.left - (parseInt(ripple.style.width) / 2) + 'px';
            ripple.style.top = e.clientY - rect.top - (parseInt(ripple.style.height) / 2) + 'px';
    
            a.appendChild(ripple);
    
            setTimeout(() => {
                ripple.remove();
                window.open(projetos.link_to_preview ? projetos.link_to_preview : `${dominio}/preview-padrao`);
            }, 600);
        
        });
      
        // Adiciona o item ao container principal
        main_container_projetos.appendChild(item);
      
        // Inicializa o swiper
        new Swiper(`.${swiperId}`, {
          loop: true,
          spaceBetween: 10,
          slidesPerView: 1,
          navigation: {
            nextEl: `.${swiperId} .swiper-button-next`,
            prevEl: `.${swiperId} .swiper-button-prev`,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }
        });
    })
      
    const botoesAbrirModal = document.querySelectorAll('.btn-solicitar, .button_whats_top');
    const modal = document.getElementById('modalContato');
    const fechar = document.getElementById('fecharModal');
  
    botoesAbrirModal.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
    
            const rect = botao.getBoundingClientRect();
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            ripple.style.left = e.clientX - rect.left - (parseInt(ripple.style.width) / 2) + 'px';
            ripple.style.top = e.clientY - rect.top - (parseInt(ripple.style.height) / 2) + 'px';
    
            botao.appendChild(ripple);
    
            setTimeout(() => {
                ripple.remove();
            }, 600);
    
            modal.classList.add('active');
        });
    });
    

    button_whats_top.addEventListener('click', () => {
       modal.classList.add("active");
    });
      
    fechar.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

});
