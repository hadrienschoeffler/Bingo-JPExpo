import type { BingoCell, Character } from '../types/bingo';

export const RANDOM_SPECIAL_MAX_COUNT = 3;
export const PLAYABLE_FIVE_STAR_RATIO = 0.6;
export const CHARACTER_CELL_COUNT = 24;
export const GRID_SIZE = 25;
export const BONUS_CENTER_INDEX = 12;
export const BONUS_POINTS = 5;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function validateBonusLabel(bonusLabel: string): string {
  const trimmedBonusLabel = bonusLabel.trim();

  if (!trimmedBonusLabel) {
    throw new Error('La case bonus doit contenir un personnage.');
  }

  return trimmedBonusLabel;
}

function toCharacterCell(character: Character): BingoCell {
  return {
    id: `character-${character.id}`,
    type: 'character',
    character,
    found: false
  };
}

function createBonusCell(label: string): BingoCell {
  return {
    id: 'bonus-cell',
    type: 'bonus',
    label,
    points: BONUS_POINTS,
    found: false
  };
}

function insertBonusCell(characterCells: BingoCell[], bonusLabel: string): BingoCell[] {
  const grid = [...characterCells];
  grid.splice(BONUS_CENTER_INDEX, 0, createBonusCell(bonusLabel));

  if (grid.length !== GRID_SIZE) {
    throw new Error('La grille générée ne contient pas 25 cases.');
  }

  return grid;
}

function selectPlayableCharacters(fiveStars: Character[], fourStars: Character[], count: number): Character[] {
  const shuffledFiveStars = shuffle(fiveStars);
  const shuffledFourStars = shuffle(fourStars);

  const desiredFiveStarCount = Math.round(count * PLAYABLE_FIVE_STAR_RATIO);
  const desiredFourStarCount = count - desiredFiveStarCount;

  const selectedFiveStars = shuffledFiveStars.slice(0, Math.min(desiredFiveStarCount, shuffledFiveStars.length));
  const selectedFourStars = shuffledFourStars.slice(0, Math.min(desiredFourStarCount, shuffledFourStars.length));

  const alreadySelectedIds = new Set([...selectedFiveStars, ...selectedFourStars].map((character) => character.id));
  const remainingPlayableCharacters = shuffle([...shuffledFiveStars, ...shuffledFourStars]).filter((character) => {
    return !alreadySelectedIds.has(character.id);
  });

  const missingCount = count - selectedFiveStars.length - selectedFourStars.length;
  const fallbackCharacters = remainingPlayableCharacters.slice(0, missingCount);
  const selectedCharacters = [...selectedFiveStars, ...selectedFourStars, ...fallbackCharacters];

  if (selectedCharacters.length !== count) {
    throw new Error(`Impossible de générer la grille : il faut au moins ${count} personnages jouables disponibles.`);
  }

  return selectedCharacters;
}

export function generateRandomBingoGrid(characters: Character[], bonusLabel: string): BingoCell[] {
  const trimmedBonusLabel = validateBonusLabel(bonusLabel);
  const fiveStars = characters.filter((character) => character.rarity === 5);
  const fourStars = characters.filter((character) => character.rarity === 4);
  const specialCharacters = characters.filter((character) => character.rarity === 'special');

  if (characters.length < CHARACTER_CELL_COUNT) {
    throw new Error(`Impossible de générer la grille : il faut au moins ${CHARACTER_CELL_COUNT} personnages.`);
  }

  const maxSpecialCount = Math.min(RANDOM_SPECIAL_MAX_COUNT, specialCharacters.length);
  const selectedSpecialCount = Math.floor(Math.random() * (maxSpecialCount + 1));
  const selectedSpecialCharacters = shuffle(specialCharacters).slice(0, selectedSpecialCount);
  const playableCount = CHARACTER_CELL_COUNT - selectedSpecialCharacters.length;
  const selectedPlayableCharacters = selectPlayableCharacters(fiveStars, fourStars, playableCount);

  const characterCells = shuffle([...selectedPlayableCharacters, ...selectedSpecialCharacters]).map(toCharacterCell);

  return insertBonusCell(characterCells, trimmedBonusLabel);
}

export function createCustomBingoGrid(selectedCharacters: Character[], bonusLabel: string): BingoCell[] {
  const trimmedBonusLabel = validateBonusLabel(bonusLabel);
  const uniqueCharacters = Array.from(new Map(selectedCharacters.map((character) => [character.id, character])).values());

  if (uniqueCharacters.length !== CHARACTER_CELL_COUNT) {
    throw new Error(`Ta grille doit contenir exactement ${CHARACTER_CELL_COUNT} personnages Genshin Impact.`);
  }

  const characterCells = shuffle(uniqueCharacters).map(toCharacterCell);

  return insertBonusCell(characterCells, trimmedBonusLabel);
}

export function getCellPoints(cell: BingoCell): number {
  if (cell.type === 'bonus') {
    return cell.points;
  }

  return cell.character.points;
}
