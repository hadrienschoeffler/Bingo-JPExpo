import { useMemo, useState } from 'react';
import { BONUS_POINTS, CHARACTER_CELL_COUNT } from '../services/gridGenerator';
import type { Character, Rarity } from '../types/bingo';

type SelectionTab = 'available' | 'selected';
type SortMode = 'alphabetical' | 'rarity' | 'points';

const rarityOrder: Record<Rarity, number> = {
  5: 0,
  4: 1,
  special: 2
};

const rarityLabel: Record<Rarity, string> = {
  5: '5★',
  4: '4★',
  special: 'Spécial'
};

type CharacterSelectionScreenProps = {
  bonusLabel: string;
  characters: Character[];
  error: string | null;
  onBack: () => void;
  onValidate: (selectedCharacterIds: string[]) => void;
};

export function CharacterSelectionScreen({ bonusLabel, characters, error, onBack, onValidate }: CharacterSelectionScreenProps) {
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<SelectionTab>('available');
  const [sortMode, setSortMode] = useState<SortMode>('alphabetical');

  const selectedCharacters = useMemo(() => {
    return characters.filter((character) => selectedIds.includes(character.id));
  }, [characters, selectedIds]);

  const selectedFiveStars = selectedCharacters.filter((character) => character.rarity === 5).length;
  const selectedFourStars = selectedCharacters.filter((character) => character.rarity === 4).length;
  const selectedSpecialCharacters = selectedCharacters.filter((character) => character.rarity === 'special').length;
  const selectedCount = selectedCharacters.length;
  const isSelectionComplete = selectedCount === CHARACTER_CELL_COUNT;
  const selectedMaxScore = selectedCharacters.reduce((total, character) => total + character.points, BONUS_POINTS);

  const displayedCharacters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sourceCharacters =
      activeTab === 'selected'
        ? selectedCharacters
        : characters.filter((character) => !selectedIds.includes(character.id));

    const filteredCharacters = normalizedQuery
      ? sourceCharacters.filter((character) => character.name.toLowerCase().includes(normalizedQuery))
      : sourceCharacters;

    return [...filteredCharacters].sort((firstCharacter, secondCharacter) => {
      if (sortMode === 'rarity') {
        return rarityOrder[firstCharacter.rarity] - rarityOrder[secondCharacter.rarity] || firstCharacter.name.localeCompare(secondCharacter.name);
      }

      if (sortMode === 'points') {
        return secondCharacter.points - firstCharacter.points || firstCharacter.name.localeCompare(secondCharacter.name);
      }

      return firstCharacter.name.localeCompare(secondCharacter.name);
    });
  }, [activeTab, characters, query, selectedCharacters, selectedIds, sortMode]);

  function toggleCharacter(character: Character) {
    const isSelected = selectedIds.includes(character.id);

    if (isSelected) {
      setSelectedIds((currentIds) => currentIds.filter((id) => id !== character.id));
      return;
    }

    if (selectedCount >= CHARACTER_CELL_COUNT) {
      return;
    }

    setSelectedIds((currentIds) => [...currentIds, character.id]);
  }

  function handleValidate() {
    if (!isSelectionComplete) {
      return;
    }

    onValidate(selectedIds);
  }

  return (
    <main className="selection-screen">
      <section className="selection-panel">
        <div className="selection-header">
          <button type="button" className="text-button" onClick={onBack}>
            ← Accueil
          </button>

          <div>
            <p className="eyebrow">Création manuelle</p>
            <h1>Choisis ta grille</h1>
            <p className="selection-bonus">Bonus : <strong>{bonusLabel}</strong></p>
          </div>

          <div className="selection-counts" aria-label="Compteurs de sélection">
            <span>5★ : {selectedFiveStars}</span>
            <span>4★ : {selectedFourStars}</span>
            <span>Spéciaux : {selectedSpecialCharacters}</span>
            <span>Score max : {selectedMaxScore} pts</span>
            <span className={isSelectionComplete ? 'complete' : ''}>Total : {selectedCount}/{CHARACTER_CELL_COUNT}</span>
          </div>
        </div>

        <div className="selection-controls sticky-selection-controls">
          <label htmlFor="character-search">Rechercher un personnage</label>
          <input
            id="character-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex. Furina, Xiao, Kaveh..."
          />

          <div className="selection-sort">
            <label htmlFor="character-sort">Trier par</label>
            <select
              id="character-sort"
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
            >
              <option value="alphabetical">Ordre alphabétique</option>
              <option value="rarity">Catégorie</option>
              <option value="points">Points</option>
            </select>
          </div>

          <div className="selection-tabs" role="tablist" aria-label="Filtrer les personnages">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'available'}
              className={activeTab === 'available' ? 'active' : ''}
              onClick={() => setActiveTab('available')}
            >
              À choisir
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'selected'}
              className={activeTab === 'selected' ? 'active' : ''}
              onClick={() => setActiveTab('selected')}
            >
              Choisis ({selectedCount})
            </button>
          </div>
        </div>

        {error ? <p className="error-message">{error}</p> : null}

        <section className="character-selection-grid" aria-label="Liste des personnages">
          {displayedCharacters.length > 0 ? (
            displayedCharacters.map((character) => {
              const isSelected = selectedIds.includes(character.id);
              const quotaReached = !isSelected && selectedCount >= CHARACTER_CELL_COUNT;

              return (
                <button
                  key={character.id}
                  type="button"
                  className={`selection-card rarity-${character.rarity} ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleCharacter(character)}
                  disabled={quotaReached}
                  aria-pressed={isSelected}
                  title={`${character.name} • ${rarityLabel[character.rarity]} • ${character.points} pts`}
                >
                  <span className="selection-image-frame">
                    <img src={character.image} alt={character.name} draggable="false" />
                  </span>
                  <span className="selection-character-name">{character.name}</span>
                  <span className="selection-character-points">{rarityLabel[character.rarity]} • {character.points} pts</span>
                </button>
              );
            })
          ) : (
            <p className="empty-selection-message">
              {activeTab === 'selected'
                ? 'Aucun personnage sélectionné ne correspond à ta recherche.'
                : 'Aucun personnage disponible ne correspond à ta recherche.'}
            </p>
          )}
        </section>

        <div className="selection-footer">
          <button type="button" className="primary-button" disabled={!isSelectionComplete} onClick={handleValidate}>
            Valider ma grille
          </button>
        </div>
      </section>
    </main>
  );
}
