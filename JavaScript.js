const App = {
    // Initialisation
    init() {
        console.log("🚀 Application démarrée");
        this.bindEvents();
        this.checkPage();
    },

    // Gestion des clics et interactions
    bindEvents() {
        const mainBtn = document.getElementById('main-action');
        
        if (mainBtn) {
            mainBtn.addEventListener('click', () => {
                this.celebrate();
            });
        }
    },

    // Détecter sur quelle page on est
    checkPage() {
        const currentPage = document.body.getAttribute('data-page');
        console.log(`Page actuelle : ${currentPage}`);
    },

    // Une petite fonction d'animation
    celebrate() {
        const btn = document.getElementById('main-action');
        btn.textContent = "C'est fait ! ✅";
        btn.style.backgroundColor = "var(--accent)";
        
        setTimeout(() => {
            btn.textContent = "Action Spéciale";
            btn.style.backgroundColor = "var(--primary)";
        }, 2000);
    }
};

// Lancement au chargement du DOM
document.addEventListener('DOMContentLoaded', () => App.init());
