document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.clickable-tech');

    techItems.forEach(item => {
        item.addEventListener('click', function() {
            // Trouver la boîte d'info spécifique à cette carte
            const parentCard = this.closest('.service-card');
            const infoBox = parentCard.querySelector('.info-box');
            const text = this.getAttribute('data-info');

            // Animation simple : on vide puis on remplit
            infoBox.classList.remove('active');
            
            setTimeout(() => {
                infoBox.innerHTML = `<p>${text}</p>`;
                infoBox.classList.add('active');
            }, 100);
        });
    });
});


function checkServiceStatus(serviceName) {
    const statusDisplay = document.querySelector('.services-intro p');
    statusDisplay.innerText = `// Diagnostic de ${serviceName} en cours...`;
    statusDisplay.style.color = "#10b981";
    
    setTimeout(() => {
        statusDisplay.innerText = `// ${serviceName} : OPTIMISÉ (100% OK)`;
    }, 1500);
}
