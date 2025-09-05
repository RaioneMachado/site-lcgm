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