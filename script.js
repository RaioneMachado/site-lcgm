// Navegação mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const header = document.querySelector("header");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Header scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.produto-card, .depoimento, .sobre-content, .contato-content').forEach(el => {
    observer.observe(el);
});

// Formulário de contato
const formOrcamento = document.getElementById('form-orcamento');
if (formOrcamento) {
    formOrcamento.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Obrigado pelo seu interesse! Entraremos em contato em breve para discutir seu projeto.');
            formOrcamento.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// Efeitos de hover para produtos
const produtoCards = document.querySelectorAll('.produto-card');
produtoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});

// Animação de digitação para o título principal
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i+1) + '<span class="typing-cursor">|</span>';
        setTimeout(() => typeWriter(element, text, i+1), 100);
    } else {
        element.innerHTML = text + '<span class="typing-cursor blinking">|</span>';
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicia a animação de digitação se existir elemento com classe
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        setTimeout(() => typeWriter(heroTitle, originalText), 500);
    }
    
    // Adiciona classe de animação inicial para elementos acima da dobra
    document.querySelector('.hero-content').classList.add('animate');
    document.querySelector('.hero-image').classList.add('animate');
    
    // Rotação automática dos depoimentos
    const depoimentos = document.querySelectorAll('.depoimento');
    if (depoimentos.length > 0) {
        let currentDepoimento = 0;
        
        setInterval(() => {
            depoimentos.forEach(d => d.style.opacity = '0.5');
            depoimentos[currentDepoimento].style.opacity = '1';
            
            currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
        }, 4000);
    }
    
    // Efeito parallax para a hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
        }
    });
});

// Contador de estatísticas (opcional)
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// Inicia os contadores quando eles aparecem na tela
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observa a seção de estatísticas se existir
const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Filtro de produtos
document.addEventListener('DOMContentLoaded', function() {
    // Filtros de produtos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.produto-card');
    
    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe active ao botão clicado
                this.classList.add('active');
                
                // Obtém o filtro selecionado
                const filter = this.getAttribute('data-filter');
                
                // Filtra os produtos
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }
    
    // Tooltips para botões de ação
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const title = this.getAttribute('title');
            alert(`Funcionalidade de ${title} será implementada em breve!`);
        });
    });
    
    // Animação de entrada dos produtos ao scroll
    const productSection = document.querySelector('.produtos');
    
    if (productSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const productCards = entry.target.querySelectorAll('.produto-card');
                    productCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(productSection);
    }
});

// Animação dos números estatísticos
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos números
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
    
    // Observar quando a seção sobre entrar na viewport
    const sobreSection = document.querySelector('.sobre');
    
    if (sobreSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(sobreSection);
    }
    
    // Animação da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }
    
    // Iniciar animação da timeline quando estiver visível
    if (timelineItems.length) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimeline();
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineObserver.observe(document.querySelector('.timeline'));
    }
    
    // Estado inicial da timeline
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
    });
});

// Carrossel de depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.depoimentos-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    const depoimentos = document.querySelectorAll('.depoimento');
    
    if (slider && depoimentos.length > 0) {
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Criar dots de navegação
        depoimentos.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        // Função para ir para um slide específico
        function goToSlide(index) {
            currentIndex = index;
            const slideWidth = depoimentos[0].offsetWidth + 30; // width + gap
            slider.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
            
            // Atualizar dots ativos
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Navegação com botões
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : depoimentos.length - 1;
                goToSlide(currentIndex);
                resetAutoSlide();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = currentIndex < depoimentos.length - 1 ? currentIndex + 1 : 0;
                goToSlide(currentIndex);
                resetAutoSlide();
            });
        }
        
        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = currentIndex < depoimentos.length - 1 ? currentIndex + 1 : 0;
                goToSlide(currentIndex);
            }, 5000);
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Iniciar auto slide
        startAutoSlide();
        
        // Pausar auto slide ao passar o mouse
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Swipe para mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });
        
        function handleSwipe() {
            const minSwipeDistance = 50;
            const distance = touchStartX - touchEndX;
            
            if (Math.abs(distance) < minSwipeDistance) return;
            
            if (distance > 0) {
                // Swipe left - next
                currentIndex = currentIndex < depoimentos.length - 1 ? currentIndex + 1 : 0;
            } else {
                // Swipe right - previous
                currentIndex = currentIndex > 0 ? currentIndex - 1 : depoimentos.length - 1;
            }
            
            goToSlide(currentIndex);
        }
        
        // Observar para animação de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        depoimentos.forEach(depoimento => {
            depoimento.style.opacity = '0';
            depoimento.style.transform = 'translateY(30px)';
            depoimento.style.transition = 'all 0.6s ease';
            observer.observe(depoimento);
        });
    }
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Estado inicial
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'all 0.3s ease';
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulação de cadastro
                this.innerHTML = `
                    <div class="newsletter-success">
                        <i class="fas fa-check-circle"></i>
                        <p>Email cadastrado com sucesso!</p>
                    </div>
                `;
                
                // Reset após 3 segundos
                setTimeout(() => {
                    this.innerHTML = `
                        <input type="email" placeholder="Seu melhor e-mail" required>
                        <button type="submit">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    `;
                    emailInput.value = '';
                }, 3000);
            }
        });
    }
    
    // Animações de entrada do footer
    const footerSections = document.querySelectorAll('.footer-section');
    
    if (footerSections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        footerSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }
});