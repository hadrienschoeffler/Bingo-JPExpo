# Spécifications fonctionnelles et techniques — Bingo JP Expo v1.0

## 1. Objectif

Créer une application Web mobile permettant de jouer à un bingo cosplay pendant la Japan Expo. Le joueur prépare une grille de personnages, coche ceux qu’il croise en cosplay et suit son score.

L’application doit être simple, utilisable sur téléphone et adaptée à un environnement avec une connexion instable.

## 2. Périmètre v1.0

La version 1.0 contient :

- une page d’accueil ;
- une saisie de personnage bonus ;
- un mode de création manuelle ;
- un mode de génération aléatoire ;
- une grille 5 × 5 ;
- une sauvegarde locale ;
- un score actuel et un score maximum ;
- une confirmation avant réinitialisation ;
- une préparation PWA/offline.

La version 1.0 ne contient pas :

- compte utilisateur ;
- backend ;
- classement en ligne ;
- synchronisation entre appareils ;
- anti-triche ;
- interface d’administration.

## 3. Règles de jeu

Chaque joueur dispose d’une grille de 25 cases :

- 24 cases de personnages Genshin Impact ;
- 1 case bonus choisie par le joueur.

Quand le joueur croise un cosplay correspondant à une case, il appuie sur l’icône. La case passe en état trouvé et le score augmente. Un second appui annule le marquage.

## 4. Personnages

Un personnage possède :

- un identifiant unique ;
- un nom ;
- un jeu ;
- une rareté ;
- un nombre de points ;
- un chemin d’image.

Raretés supportées :

- `5` : personnage 5★ ;
- `4` : personnage 4★ ;
- `'special'` : personnage non jouable, pas encore jouable ou sans rareté officielle.

## 5. Affichage

Les cases personnages affichent uniquement l’icône.

La rareté est indiquée par le contour :

- jaune pour les 5★ ;
- violet pour les 4★ ;
- gris pour les spéciaux.

Une case trouvée est grisée.

La case bonus est placée au centre de la grille et rapporte 5 points.

## 6. Création manuelle

L’utilisateur doit sélectionner exactement 24 personnages.

L’écran de sélection contient :

- recherche par nom ;
- onglet des personnages disponibles ;
- onglet des personnages choisis ;
- tri par ordre alphabétique ;
- tri par catégorie ;
- tri par points ;
- compteurs 5★, 4★, spéciaux, total et score maximum.

Le bouton de validation est désactivé tant que les 24 personnages ne sont pas sélectionnés.

## 7. Génération aléatoire

Le mode aléatoire doit générer 24 personnages sans doublon.

Règle v1.0 :

- tirer un nombre de spéciaux entre 0 et 3 ;
- compléter le reste avec des personnages jouables ;
- garder une logique proche de 60 % de 5★ et 40 % de 4★ sur les personnages jouables ;
- ajouter la case bonus au centre.

## 8. Score

Le score actuel est la somme des points des cases trouvées.

Le score maximum est la somme des points de toutes les cases de la grille.

Affichage :

```txt
Score actuel / Score maximum pts
```

## 9. Sauvegarde

La grille et la progression sont sauvegardées dans `localStorage`.

Clé utilisée :

```txt
cosplay-bingo-game-state
```

## 10. Contraintes techniques

Stack :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- Vite PWA ;
- localStorage.

Déploiement cible :

- Render Static Site ;
- build command : `npm run build` ;
- publish directory : `dist`.

## 11. Critères d’acceptation

La version 1.0 est validée si :

- l’utilisateur peut créer une grille manuelle ;
- l’utilisateur peut générer une grille aléatoire ;
- la grille contient toujours 25 cases ;
- la case bonus est obligatoire et placée au centre ;
- les personnages spéciaux sont supportés ;
- le mode aléatoire peut inclure entre 0 et 3 spéciaux ;
- le score actuel et le score maximum sont affichés ;
- les cases trouvées sont grisées ;
- la réinitialisation demande une confirmation ;
- la progression est conservée après actualisation ;
- le build fonctionne pour un déploiement statique.
