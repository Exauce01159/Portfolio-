document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOADER ---
    const loader = document.getElementById('loader');
    const content = document.getElementById('main-content');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
            if (content) content.style.opacity = '1';
        }, 1000);
    });

    // --- 2. GESTION DES FORMULAIRES (Contact & Livre d'or) ---
    const handleFormSubmit = (formId, statusId) => {
        const form = document.getElementById(formId);
        const status = document.getElementById(statusId);

        if (form && status) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const btn = form.querySelector('button');
                const formData = new FormData(form);

                btn.innerText = "ENVOI...";
                btn.disabled = true;

                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        status.innerHTML = "<p style='color: #38bdf8;'>Succès ! Opération réussie.</p>";
                        form.reset();
                        btn.innerText = "ENVOYÉ ✅";
                    } else {
                        throw new Error();
                    }
                }).catch(() => {
                    status.innerHTML = "<p style='color: #ef4444;'>Oups ! Un problème est survenu.</p>";
                    btn.disabled = false;
                    btn.innerText = "RÉESSAYER";
                });
            });
        }
    };

    // Initialisation pour les deux formulaires
    handleFormSubmit('contact-form', 'form-status');
    handleFormSubmit('comment-form', 'status-msg');

    // --- 3. INTERACTIVITÉ DES SKILLS ---
    const skills = document.querySelectorAll('.skill-clickable');
    const infoBox = document.getElementById('skill-detail-box');
    const infoText = document.getElementById('skill-text');

    if (skills.length > 0 && infoBox) {
        skills.forEach(skill => {
            skill.addEventListener('click', () => {
                const message = skill.getAttribute('data-info');
                infoBox.style.opacity = '0';
                infoBox.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    infoText.innerText = message;
                    infoText.style.color = '#38bdf8'; 
                    infoBox.style.opacity = '1';
                    infoBox.style.transform = 'translateY(0)';
                    infoBox.classList.remove('skill-detail-hidden');
                }, 200);
            });
        });
    }

    // --- 4. FILTRAGE DES PROJETS (NOUVEAU) ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Gestion de l'état actif des boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    // Logique d'affichage : 'all' ou correspondance de catégorie
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block'; // On affiche
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0'; // On cache avec transition
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }
});
