# Bingo JP Expo

Version : **1.0.0**

Application Web mobile-first pour jouer à un bingo cosplay pendant une sortie à la Japan Expo. Le joueur prépare une grille de personnages Genshin Impact, coche les cosplays trouvés pendant l’événement et suit son score en direct.

L’application est pensée pour téléphone et pour une utilisation en convention, avec une connexion parfois instable. Une fois chargée, la grille et la progression restent sauvegardées localement.

## Fonctionnalités v1.0

- Page d’accueil avec description du jeu.
- Saisie obligatoire du personnage bonus avant de commencer.
- Deux modes de création :
  - **Créer ma grille** : sélection manuelle de 24 personnages ;
  - **Grille aléatoire** : génération automatique de 24 personnages.
- Grille finale de 25 cases :
  - 24 personnages Genshin Impact ;
  - 1 case bonus au centre, fixée à 5 points.
- Gestion des raretés :
  - `5` pour les personnages 5★ ;
  - `4` pour les personnages 4★ ;
  - `'special'` pour les personnages non jouables, pas encore jouables ou sans rareté officielle.
- Génération aléatoire avec :
  - un nombre de personnages spéciaux tiré aléatoirement entre 0 et 3 ;
  - le reste complété avec des personnages jouables ;
  - une logique proche de 60 % de 5★ et 40 % de 4★ sur les personnages jouables.
- Sélection manuelle avec :
  - recherche par nom ;
  - onglets **À choisir** et **Choisis** ;
  - tri par ordre alphabétique, catégorie ou points ;
  - affichage du score maximum en cours de création ;
  - validation seulement lorsque 24 personnages sont sélectionnés.
- Affichage de la grille avec icônes uniquement.
- Couleurs de contour :
  - jaune pour les 5★ ;
  - violet pour les 4★ ;
  - gris pour les spéciaux.
- Tap sur une case pour la marquer comme trouvée.
- Second tap pour annuler.
- Score affiché sous la forme `score actuel / score maximum`.
- Confirmation avant réinitialisation de la grille.
- Sauvegarde locale avec `localStorage`.
- PWA via `vite-plugin-pwa` pour améliorer l’usage hors connexion après chargement initial.
- Interface responsive et mobile-first.

## Stack technique

- React
- TypeScript
- Vite
- Vite PWA
- CSS
- localStorage

## Prérequis

Le projet v1.0 utilise les versions récentes de Vite et des outils associés. Utilise Node 24 pour éviter les erreurs de build.

```bash
node -v
```

Version recommandée :

```txt
24.14.1
```

Avec `nvm` :

```bash
nvm install 24.14.1
nvm use 24.14.1
```

## Installation locale

```bash
npm ci
npm run dev
```

L’application sera disponible sur l’URL indiquée par Vite, généralement :

```txt
http://localhost:5173
```

## Build local

```bash
npm run build
npm run preview
```

Le dossier généré est :

```txt
dist/
```

## Déploiement Render

Type de service recommandé :

```txt
Static Site
```

Configuration :

```txt
Build Command: npm run build
Publish Directory: dist
```

Node est verrouillé avec :

```txt
.node-version
.nvmrc
```

Si Render garde un mauvais cache après un changement de dépendances :

```txt
Manual Deploy > Clear build cache & deploy
```

## Structure du projet

```txt
Bingo-JPExpo/
├─ public/
│  ├─ characters/
│  │  └─ .gitkeep
│  └─ icon.svg
├─ src/
│  ├─ components/
│  │  ├─ BingoCell.tsx
│  │  ├─ BingoGrid.tsx
│  │  ├─ CharacterSelectionScreen.tsx
│  │  ├─ HomeScreen.tsx
│  │  └─ ScoreBar.tsx
│  ├─ data/
│  │  └─ characters.ts
│  ├─ hooks/
│  │  └─ useBingoGame.ts
│  ├─ services/
│  │  ├─ gridGenerator.ts
│  │  └─ storageService.ts
│  ├─ types/
│  │  └─ bingo.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.ts
```

## Ajouter ou modifier les personnages

Les personnages sont définis dans :

```txt
src/data/characters.ts
```

Les images doivent être placées dans :

```txt
public/characters/
```

Exemple de personnage 5★ :

```ts
{
  id: 'furina',
  name: 'Furina',
  game: 'Genshin Impact',
  rarity: 5,
  points: 1,
  image: '/characters/Furina_Icon.webp'
}
```

Exemple de personnage 4★ :

```ts
{
  id: 'kaveh',
  name: 'Kaveh',
  game: 'Genshin Impact',
  rarity: 4,
  points: 5,
  image: '/characters/Kaveh_Icon.webp'
}
```

Exemple de personnage spécial :

```ts
{
  id: 'paimon',
  name: 'Paimon',
  game: 'Genshin Impact',
  rarity: 'special',
  points: 4,
  image: '/characters/Paimon_Icon.webp'
}
```

Important : les chemins sont sensibles à la casse sur Linux. Le chemin dans `characters.ts` doit correspondre exactement au nom du fichier dans `public/characters/`.

## Règles de génération

### Grille manuelle

- L’utilisateur choisit exactement 24 personnages.
- Les personnages peuvent être 5★, 4★ ou spéciaux.
- Le personnage bonus est ajouté au centre de la grille.
- La grille finale contient toujours 25 cases.

### Grille aléatoire

Les constantes principales sont dans :

```txt
src/services/gridGenerator.ts
```

```ts
export const RANDOM_SPECIAL_MAX_COUNT = 3;
export const PLAYABLE_FIVE_STAR_RATIO = 0.6;
export const CHARACTER_CELL_COUNT = 24;
export const GRID_SIZE = 25;
export const BONUS_CENTER_INDEX = 12;
export const BONUS_POINTS = 5;
```

Règle v1.0 :

- l’application tire aléatoirement entre 0 et 3 personnages spéciaux ;
- elle complète ensuite les 24 cases personnages avec des 5★ et 4★ ;
- la proportion des personnages jouables reste proche de 60 % 5★ et 40 % 4★ ;
- le personnage bonus est placé au centre.

## Sauvegarde locale

La progression est sauvegardée dans le navigateur avec `localStorage`.

Clé utilisée :

```txt
cosplay-bingo-game-state
```

Pour forcer une réinitialisation depuis la console du navigateur :

```js
localStorage.removeItem('cosplay-bingo-game-state');
location.reload();
```

## PWA et offline

Le projet utilise `vite-plugin-pwa`. Le comportement hors connexion est surtout à tester après un build et sur une URL HTTPS, par exemple après déploiement Render.

Test recommandé :

1. ouvrir l’application avec Internet ;
2. créer une grille ;
3. cocher quelques personnages ;
4. couper la connexion ;
5. rouvrir l’application ;
6. vérifier que la grille et les images restent accessibles.

## Scripts

```bash
npm run dev      # lance le serveur de développement
npm run build    # compile TypeScript et génère dist/
npm run preview  # prévisualise le build
npm run lint     # lance ESLint
```

## Notes de maintenance

- Ne pas committer `node_modules/`.
- Ne pas committer `dist/`.
- Garder `package-lock.json` committé pour reproduire le build Render.
- Après modification de `characters.ts`, penser à réinitialiser la grille sauvegardée si les anciens chemins d’images restent en cache local.
