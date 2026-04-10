const contactForm = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const data = new FormData(contactForm);
        
        // UI : Indicateur visuel
        submitBtn.innerText = "CONNEXION AU SERVEUR...";
        submitBtn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // SUCCÈS : Le message est parti
                statusDiv.innerHTML = "<p style='color: #38bdf8; font-weight: bold; margin-top: 15px; text-align: center;'>✅ Protocole réussi : Message transmis avec succès !</p>";
                contactForm.reset();
                submitBtn.innerText = "MESSAGE ENVOYÉ";
                submitBtn.style.background = "#10b981";
            } else {
                // ERREUR : Formspree a refusé (souvent à cause du CAPTCHA)
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        statusDiv.innerHTML = `<p style="color: ⁰ef4444;">❌ Erreur : ${data["errors"].map(error => error["message"]).join(", ")}</p>`;
                    } else {
                        statusDiv.innerHTML = "<p style='color: #ef4444;'>❌ Erreur inconnue. Vérifiez vos paramètres Formspree.</p>";
                    }
                });
                submitBtn.innerText = "ÉCHEC DE L'ENVOI";
                submitBtn.disabled = false;
            }
        }).catch(error => {
            // ERREUR RÉSEAU (Pas d'internet)
            statusDiv.innerHTML = "<p style='color: #f59e0b;'>⚠️ Erreur réseau. Vérifiez votre connexion internet.</p>";
            submitBtn.innerText = "RÉESSAYER";
            submitBtn.disabled = false;
        });
    });
}
