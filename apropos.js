// On cible le conteneur du terminal
const terminalBody = document.getElementById('terminal-content');
let inputBuffer = ""; // Stocke ce que l'utilisateur tape

// Fonction pour ajouter une nouvelle ligne de réponse
function createLine(text, isCommand = false) {
    const p = document.createElement('p');
    p.className = isCommand ? "command-echo" : "response";
    p.innerHTML = text;
    // On insère le nouveau texte juste avant la ligne du curseur
    terminalBody.insertBefore(p, terminalBody.lastElementChild);
}

// Écouteur d'événements pour le clavier
document.addEventListener('keydown', (e) => {
    const cursorLine = terminalBody.lastElementChild;
    const prompt = '<span class="prompt">exauce@dev:~$</span> ';

    // 1. Gestion de la touche Entrée (Exécution)
    if (e.key === 'Enter') {
        const command = inputBuffer.trim().toLowerCase();
        
        // On affiche la commande dans l'historique
        createLine(`${prompt}${inputBuffer}`);
        
        // Logique de réponse
        handleCommand(command);

        // Reset
        inputBuffer = "";
        cursorLine.innerHTML = `${prompt}<span class="cursor"></span>`;
        terminalBody.scrollTop = terminalBody.scrollHeight; // Scroll auto
    } 
    // 2. Gestion de la touche Retour (Effacer)
    else if (e.key === 'Backspace') {
        inputBuffer = inputBuffer.slice(0, -1);
        cursorLine.innerHTML = `${prompt}${inputBuffer}<span class="cursor"></span>`;
    } 
    // 3. Capture des caractères normaux
    else if (e.key.length === 1) {
        inputBuffer += e.key;
        cursorLine.innerHTML = `${prompt}${inputBuffer}<span class="cursor"></span>`;
    }
});

// Le "Cerveau" du terminal : définit les réponses
function handleCommand(cmd) {
    switch(cmd) {
        case 'help':
            createLine("Commandes disponibles : <b>bio</b>, <b>skills</b>, <b>contact</b>, <b>clear</b>, <b>ls</b>");
            break;
        case 'bio':
            createLine("Je suis Exaucé, développeur Full-Stack focalisé sur la Clean Architecture.");
            break;
        case 'skills':
            createLine("Logiciels : JavaScript, Python, SQL. Systèmes : Linux, Architecture Réseaux.");
            break;
        case 'contact':
            createLine("Email : kisiabongoamange@gmail.com | WhatsApp : +243 842 317 817");
            break;
        case 'ls':
            createLine("projects/ &nbsp;&nbsp; cv.pdf &nbsp;&nbsp; contact_info.txt");
            break;
        case 'clear':
            // Supprime tout sauf la ligne du curseur
            while (terminalBody.childNodes.length > 2) {
                terminalBody.removeChild(terminalBody.firstChild);
            }
            break;
        case '':
            break;
        default:
            createLine(`Commande inconnue: ${cmd}. Tapez 'help' pour voir les options.`);
    }
}
