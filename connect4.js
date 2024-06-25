// Déclaration des variables
let rows = 6; // Nombre de lignes du plateau
let cols = 7; // Nombre de colonnes du plateau
let player1Name = "Joueur 1"; // Nom du joueur 1
let player2Name = "Joueur 2"; // Nom du joueur 2
let player1Color = "#ff0000"; // Couleur du joueur 1
let player2Color = "#0000ff"; // Couleur du joueur 2
let currentPlayer = 1; // Joueur actuel (1 ou 2)
let gameOver = false; // Indicateur de fin de partie
let scorePlayer1 = 0; // Score du joueur 1
let scorePlayer2 = 0; // Score du joueur 2

function areColorsTooSimilar(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Calculer la différence euclidienne entre les valeurs RGB
    const colorDifference = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );

    const threshold = 150; // Ajustez selon les besoins

    return colorDifference < threshold;
}

function hexToRgb(hex) {
    // Convertir la couleur hexadécimale en objet RGB
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16);
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Fonction pour démarrer le jeu
function startGame() {
    // Récupérer les valeurs définies par l'utilisateur pour les lignes, les colonnes, les noms des joueurs et les couleurs des joueurs
    rows = parseInt(document.getElementById('rows').value, 10);
    cols = parseInt(document.getElementById('columns').value, 10);

    // Vérifier les limites de la grille
    if (rows < 4 || cols < 4 || rows > 20 || cols > 20) {
        alert("La grille doit avoir entre 4 et 20 colonnes et lignes.");
        return;
    }

    player1Name = document.getElementById('player1Name').value || "Joueur 1";
    player2Name = document.getElementById('player2Name').value || "Joueur 2";
    player1Color = document.getElementById('player1Color').value;
    player2Color = document.getElementById('player2Color').value;

    // Vérifier si les couleurs sont trop similaires
    if (areColorsTooSimilar(player1Color, player2Color)) {
        alert("Les couleurs des joueurs doivent être suffisamment différentes.");
        return;
    }

    // Définir les variables CSS dynamiquement
    document.documentElement.style.setProperty('--columns', cols);
    document.documentElement.style.setProperty('--rows', rows);

    // Effacer le plateau existant et les informations des joueurs
    document.getElementById('board').innerHTML = '';
    document.getElementById('players-info').innerHTML = '';

    // Créer le plateau de jeu
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropPiece(col));
            document.getElementById('board').appendChild(cell);
        }
    }

    // Afficher les informations des joueurs
    const playersInfo = document.getElementById('players-info');
    playersInfo.innerHTML = `<div>${player1Name}: <span style="color: ${player1Color};">&#11044;</span></div>`;
    playersInfo.innerHTML += `<div>${player2Name}: <span style="color: ${player2Color};">&#11044;</span></div>`;

    currentPlayer = 1;
    gameOver = false;
    // Afficher le joueur qui doit jouer
    displayCurrentPlayer();
}


// Fonction pour afficher le joueur qui doit jouer
function displayCurrentPlayer() {
    const currentPlayerInfo = document.getElementById('current-player-info');
    currentPlayerInfo.innerHTML = `C'est au tour de ${currentPlayer === 1 ? player1Name : player2Name}`;
}

// Fonction pour placer une pièce dans une colonne
function dropPiece(col) {
    if (gameOver) return;

    for (let row = rows - 1; row >= 0; row--) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (!cell.classList.contains('player-1') && !cell.classList.contains('player-2')) {
            cell.classList.add(`player-${currentPlayer}`);
            cell.style.backgroundColor = (currentPlayer === 1) ? player1Color : player2Color;
            if (checkForWinner(row, col)) {
                alert(`Joueur ${currentPlayer} gagne !`);
                updateScore(currentPlayer);
                updateScoreboard();
                gameOver = true;
            } else {
                currentPlayer = (currentPlayer === 1) ? 2 : 1;
            }
            break;
        }
    }

    // Vérifier s'il y a un match nul après avoir placé la pièce
    if (isBoardFull()) {
        alert("Match nul !");
        resetBoard();
        return;
    }

    // Mettre à jour le joueur qui doit jouer
    displayCurrentPlayer();
}

// Fonction pour vérifier si le plateau est complètement rempli
function isBoardFull() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        if (!cell.classList.contains('player-1') && !cell.classList.contains('player-2')) {
            return false; // Il y a encore des cellules vides
        }
    }
    return true; // Le plateau est complètement rempli
}

// Fonction pour réinitialiser le plateau de jeu
function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.classList.remove('player-1', 'player-2');
        cell.style.backgroundColor = '';
    }

    // Réinitialiser les variables du jeu
    currentPlayer = 1;
    gameOver = false;

    // Afficher le joueur qui doit jouer
    displayCurrentPlayer();
}

// Fonction pour mettre à jour le score d'un joueur
function updateScore(player) {
    if (player === 1) {
        scorePlayer1++;
    } else {
        scorePlayer2++;
    }
}

// Fonction pour mettre à jour le tableau des scores
function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = `<div>${player1Name}: ${scorePlayer1}</div>`;
    scoreboard.innerHTML += `<div>${player2Name}: ${scorePlayer2}</div>`;
}

// Fonction pour vérifier s'il y a un gagnant après avoir placé une pièce
function checkForWinner(row, col) {
    return (
        checkDirection(row, col, 0, 1) ||  // Vérifier horizontalement
        checkDirection(row, col, 1, 0) ||  // Vérifier verticalement
        checkDirection(row, col, 1, 1) ||  // Vérifier en diagonale \
        checkDirection(row, col, 1, -1)    // Vérifier en diagonale /
    );
}

// Fonction pour vérifier la direction spécifiée à partir d'une position donnée
function checkDirection(row, col, rowDir, colDir) {
    const playerClass = `player-${currentPlayer}`;
    let count = 0;

    // Vérifier dans les deux directions
    count += checkLine(row, col, rowDir, colDir, playerClass);
    count += checkLine(row, col, -rowDir, -colDir, playerClass);

    return count >= 3; // Retourner true si le nombre de pièces consécutives est supérieur ou égal à 3
}

// Fonction pour vérifier une ligne dans une direction spécifiée à partir d'une position donnée
function checkLine(row, col, rowDir, colDir, playerClass) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;

    while (r >= 0 && r < rows && c >= 0 && c < cols) {
        const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
        if (cell.classList.contains(playerClass)) {
            count++;
            r += rowDir;
            c += colDir;
        } else {
            break;
        }
    }

    return count; // Retourner le nombre de pièces consécutives dans la ligne
}
