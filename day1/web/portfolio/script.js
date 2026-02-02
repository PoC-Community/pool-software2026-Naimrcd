console.log("🚀 Portfolio chargé !");

const btnProjets = document.querySelector('.btn-primary');
const sectionProjets = document.querySelector('#projects');

btnProjets.addEventListener('click', function() {
    console.log(" Clique sur 'Mes projets'");
    sectionProjets.scrollIntoView({
        behavior: 'smooth'
    });
});


const liensMenu = document.querySelectorAll('nav a');
liensMenu.forEach(function(lien) {
    lien.addEventListener('click', function(e) {
        e.preventDefault(); 
        const cible = document.querySelector(this.getAttribute('href'));
        cible.scrollIntoView({
            behavior: 'smooth'
        });
        console.log("📜 Scroll vers:", this.textContent);
    });
});


let visiteurCount = localStorage.getItem('visites') || 0;
visiteurCount = parseInt(visiteurCount) + 1;
localStorage.setItem('visites', visiteurCount);


const heroP = document.querySelector('.hero p');
if (heroP) {
    heroP.innerHTML += ` <br><small>👀 ${visiteurCount}ème visiteur aujourd'hui</small>`;
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


const cartes = document.querySelectorAll('.card');
const sections = document.querySelectorAll('.about, .projects');

cartes.forEach(function(carte) {
    carte.style.opacity = '0';
    carte.style.transform = 'translateY(20px)';
    carte.style.transition = 'all 0.8s ease';
    observer.observe(carte);
});

sections.forEach(function(section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});


const projectCards = document.querySelectorAll('.card');
projectCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


console.log(" Portfolio Mohamed Naim - Day 1 Piscine Web 2026");
console.log(" Fonctionnalités: scroll fluide, compteur visites, animations scroll, effets hover");
