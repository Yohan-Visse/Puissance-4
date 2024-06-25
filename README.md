# Puissance 4 en JavaScript Natif

## Introduction

Ce projet est une implémentation du jeu classique de Puissance 4 en JavaScript natif. Le jeu se joue entre deux joueurs qui déposent alternativement des pièces colorées dans une grille de 6 lignes et 7 colonnes. Le premier joueur à aligner quatre de ses pièces horizontalement, verticalement ou en diagonale gagne la partie.

## Fonctionnalités

### Configuration du Jeu

- **Paramètres de la Grille**: Les utilisateurs peuvent définir le nombre de lignes et de colonnes de la grille (entre 4 et 20 pour chaque dimension).
- **Noms des Joueurs**: Les utilisateurs peuvent personnaliser les noms des joueurs.
- **Couleurs des Joueurs**: Les utilisateurs peuvent choisir les couleurs des pièces pour chaque joueur.

### Détection de la Victoire

- **Alignement des Pièces**: Le jeu détecte automatiquement si un joueur a aligné quatre pièces horizontalement, verticalement ou en diagonale.
- **Indicateur de Tour**: Le jeu affiche le nom du joueur qui doit jouer.
- **Détection de Match Nul**: Le jeu vérifie si la grille est complètement remplie sans qu'un joueur ait gagné et déclare un match nul le cas échéant.

### Gestion du Score

- **Mise à Jour du Score**: Le score de chaque joueur est mis à jour après chaque partie gagnée.
- **Tableau des Scores**: Le tableau des scores affiche les scores actuels des joueurs.

### Interface Utilisateur

- **Grille Interactive**: Les joueurs peuvent cliquer sur les colonnes pour déposer leurs pièces.
- **Indicateur de Tour**: Un message indique quel joueur doit jouer.
- **Réinitialisation du Plateau**: Le plateau de jeu peut être réinitialisé pour commencer une nouvelle partie tout en conservant les scores.

## Structure du Code

### Variables Globales

- `rows`, `cols`: Dimensions de la grille.
- `player1Name`, `player2Name`: Noms des joueurs.
- `player1Color`, `player2Color`: Couleurs des joueurs.
- `currentPlayer`: Indicateur du joueur actuel (1 ou 2).
- `gameOver`: Indicateur de fin de partie.
- `scorePlayer1`, `scorePlayer2`: Scores des joueurs.

### Fonctions Principales

- **`startGame()`**: Initialise le jeu avec les paramètres définis par l'utilisateur et crée la grille de jeu.
- **`areColorsTooSimilar(color1, color2)`**: Vérifie si les couleurs des joueurs sont suffisamment différentes.
- **`hexToRgb(hex)`**: Convertit une couleur hexadécimale en objet RGB.
- **`displayCurrentPlayer()`**: Affiche le joueur qui doit jouer.
- **`dropPiece(col)`**: Gère le dépôt d'une pièce dans une colonne et vérifie les conditions de victoire ou de match nul.
- **`isBoardFull()`**: Vérifie si le plateau de jeu est complètement rempli.
- **`resetBoard()`**: Réinitialise le plateau de jeu pour une nouvelle partie.
- **`updateScore(player)`**: Met à jour le score du joueur qui a gagné.
- **`updateScoreboard()`**: Met à jour le tableau des scores affiché.
- **`checkForWinner(row, col)`**: Vérifie si un joueur a gagné après avoir déposé une pièce.
- **`checkDirection(row, col, rowDir, colDir)`**: Vérifie une direction spécifique pour la victoire.
- **`checkLine(row, col, rowDir, colDir, playerClass)`**: Compte les pièces consécutives dans une direction.

## Instructions d'Utilisation

1. **Initialisation**: Ouvrez le fichier HTML associé dans un navigateur.
2. **Paramétrage**: Utilisez les champs de saisie pour définir les dimensions de la grille, les noms et les couleurs des joueurs.
3. **Démarrage du Jeu**: Cliquez sur le bouton "Démarrer le jeu" pour créer le plateau de jeu et commencer à jouer.
4. **Déroulement du Jeu**: Cliquez sur une colonne pour déposer une pièce. Le jeu indiquera automatiquement le joueur qui doit jouer et vérifiera les conditions de victoire ou de match nul.
5. **Réinitialisation**: Après chaque partie, utilisez le bouton "Réinitialiser le plateau" pour commencer une nouvelle partie.

## Conclusion

Ce projet de Puissance 4 en JavaScript natif offre une interface simple et interactive pour jouer à ce jeu classique. Les utilisateurs peuvent personnaliser les paramètres de la partie et le jeu gère automatiquement les conditions de victoire, les matchs nuls et le score des joueurs.
