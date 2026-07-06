# Cosplay Bingo — MVP

Application Web mobile-first pour jouer à un bingo cosplay pendant une sortie à la Japan Expo.

## Fonctionnalités du MVP

- Grille 5 × 5.
- 24 personnages Genshin Impact générés automatiquement.
- Répartition : 14 personnages 5★ et 10 personnages 4★.
- 1 case bonus choisie par le joueur.
- Case bonus à 5 points.
- Score recalculé automatiquement.
- Tap sur une case pour la marquer comme trouvée ou annuler.
- Sauvegarde locale avec `localStorage`.
- Préparation PWA pour une utilisation hors connexion après premier chargement.
- Interface adaptée au téléphone.

## Stack technique

- React
- TypeScript
- Vite
- Vite PWA
- CSS
- localStorage

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Le mode PWA/offline est surtout vérifiable après un build puis un lancement via `npm run preview`.

## Ajouter les images

Les images doivent être placées dans :

```txt
public/characters/
```

Le chemin de chaque image est défini dans :

```txt
src/data/characters.ts
```

Exemple :

```ts
{
  id: 'raiden-shogun',
  name: 'Raiden Shogun',
  game: 'Genshin Impact',
  rarity: 5,
  points: 2,
  image: '/characters/raiden-shogun.png'
}
```

## Règles de génération

L'algorithme sélectionne :

- 14 personnages 5★ ;
- 10 personnages 4★ ;
- 1 case bonus placée au centre de la grille.

Les personnages sont uniques dans une même grille.

## Prochaines évolutions possibles

- Remplacer la liste de test par la liste complète des personnages.
- Améliorer le barème de points.
- Limiter la génération à 3 essais.
- Ajouter un écran de détails si l'utilisateur maintient une case appuyée.
- Ajouter un classement entre amis.
- Ajouter un backend Node.js ou .NET.
- Ajouter une base SQL Server.
- Ajouter des tests unitaires sur la génération.
- Dockeriser le projet.


## Génération aléatoire avec personnages spéciaux

Le mode aléatoire tire désormais sur l’ensemble du roster : personnages 5★, personnages 4★ et personnages `special`.

Règle actuelle :

- entre 0 et 3 personnages spéciaux, tirés aléatoirement ;
- le reste de la grille est rempli avec des personnages jouables ;
- les personnages jouables gardent une logique proche de 60 % de 5★ et 40 % de 4★ ;
- s’il n’y a aucun personnage spécial ou si le tirage tombe sur 0, le mode aléatoire revient automatiquement à une grille jouable classique proche de 14 cinq étoiles et 10 quatre étoiles.

Ces valeurs sont configurables dans `src/services/gridGenerator.ts`.
