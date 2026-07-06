import type { BingoCell, Character } from '../types/bingo';

export const FIVE_STAR_COUNT = 14;
export const FOUR_STAR_COUNT = 10;
export const CHARACTER_CELL_COUNT = FIVE_STAR_COUNT + FOUR_STAR_COUNT;
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

export function generateRandomBingoGrid(characters: Character[], bonusLabel: string): BingoCell[] {
  const trimmedBonusLabel = validateBonusLabel(bonusLabel);
  const fiveStars = characters.filter((character) => character.rarity === 5);
  const fourStars = characters.filter((character) => character.rarity === 4);

  if (fiveStars.length < FIVE_STAR_COUNT) {
    throw new Error(`Impossible de générer la grille : il faut au moins ${FIVE_STAR_COUNT} personnages 5 étoiles.`);
  }

  if (fourStars.length < FOUR_STAR_COUNT) {
    throw new Error(`Impossible de générer la grille : il faut au moins ${FOUR_STAR_COUNT} personnages 4 étoiles.`);
  }

  const selectedFiveStars = shuffle(fiveStars).slice(0, FIVE_STAR_COUNT);
  const selectedFourStars = shuffle(fourStars).slice(0, FOUR_STAR_COUNT);
  const characterCells = shuffle([...selectedFiveStars, ...selectedFourStars]).map(toCharacterCell);

  return insertBonusCell(characterCells, trimmedBonusLabel);
}

export function createCustomBingoGrid(selectedCharacters: Character[], bonusLabel: string): BingoCell[] {
  const trimmedBonusLabel = validateBonusLabel(bonusLabel);
  const uniqueCharacters = Array.from(new Map(selectedCharacters.map((character) => [character.id, character])).values());
  const fiveStarCount = uniqueCharacters.filter((character) => character.rarity === 5).length;
  const fourStarCount = uniqueCharacters.filter((character) => character.rarity === 4).length;

  if (uniqueCharacters.length !== CHARACTER_CELL_COUNT) {
    throw new Error(`Ta grille doit contenir exactement ${CHARACTER_CELL_COUNT} personnages Genshin Impact.`);
  }

  if (fiveStarCount !== FIVE_STAR_COUNT) {
    throw new Error(`Ta grille doit contenir exactement ${FIVE_STAR_COUNT} personnages 5 étoiles.`);
  }

  if (fourStarCount !== FOUR_STAR_COUNT) {
    throw new Error(`Ta grille doit contenir exactement ${FOUR_STAR_COUNT} personnages 4 étoiles.`);
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
