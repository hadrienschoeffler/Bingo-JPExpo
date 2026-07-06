# Changelog

## 1.0.0 — Version officielle

### Ajouté

- Mode de création manuelle de grille.
- Mode de génération aléatoire.
- Saisie du personnage bonus depuis l’accueil.
- Support des personnages spéciaux via `rarity: 'special'`.
- Génération aléatoire avec 0 à 3 personnages spéciaux.
- Sélection avec recherche, onglets et tris.
- Affichage du score maximum pendant la création.
- Affichage `score / score max` pendant la partie.
- Confirmation avant réinitialisation.
- Documentation README complète.
- Spécifications fonctionnelles et techniques v1.0.
- Verrouillage Node via `.node-version` et `.nvmrc`.

### Modifié

- La grille n’est plus uniquement aléatoire : la création manuelle devient le mode principal.
- La répartition stricte 14 5★ / 10 4★ n’est plus imposée en manuel.
- Le mode aléatoire complète dynamiquement la grille selon le nombre de spéciaux tirés.

### Corrigé

- Remplacement du `package-lock.json` par une version utilisant le registre npm officiel.
- Suppression des risques liés aux anciens chemins d’images sauvegardés en local via documentation de reset.
