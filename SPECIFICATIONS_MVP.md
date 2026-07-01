# Spécifications MVP — Cosplay Bingo

## Objectif

Créer une application Web mobile-first permettant de jouer à un bingo cosplay pendant une sortie à la Japan Expo.

Le joueur génère une grille, choisit une case bonus, puis coche les personnages vus en cosplay. Le score est mis à jour automatiquement et la progression est sauvegardée localement.

## Périmètre MVP

Inclus :

- Grille 5 × 5.
- 24 cases personnages Genshin Impact.
- 1 case bonus personnalisée.
- Génération aléatoire équilibrée.
- Score automatique.
- Sauvegarde locale.
- Interface mobile.
- Préparation offline/PWA.

Exclu du MVP :

- Comptes utilisateurs.
- Backend.
- Base de données distante.
- Classement entre amis.
- Limitation du nombre de générations.
- Vérification photo.
- Interface d'administration.

## Règles de génération

La grille contient 25 cases :

- 14 personnages 5★.
- 10 personnages 4★.
- 1 case bonus placée au centre.

Les personnages doivent être uniques dans une même grille.

## Affichage

Chaque case personnage affiche uniquement :

- l'icône du personnage ;
- un contour jaune pour les 5★ ;
- un contour violet pour les 4★.

Les noms et les points ne sont pas affichés dans la case pour garder une interface lisible sur téléphone.

## Case bonus

Le joueur saisit lui-même le personnage bonus avant la génération.

La case bonus :

- est placée au centre de la grille ;
- rapporte 5 points ;
- peut être cochée/décochée comme les autres cases.

## État trouvé

Un tap sur une case change son état :

- non trouvé → trouvé ;
- trouvé → non trouvé.

Une case trouvée est grisée et affiche une coche.

## Score

Le score correspond à la somme des points des cases trouvées.

Les points des personnages sont définis dans `src/data/characters.ts`.

## Persistance locale

L'application sauvegarde dans `localStorage` :

- la grille générée ;
- l'état trouvé/non trouvé ;
- la date de création.

## Fonctionnement hors connexion

L'application est préparée comme PWA. Après un premier chargement avec connexion, elle doit pouvoir être utilisée hors connexion avec les fichiers mis en cache.
