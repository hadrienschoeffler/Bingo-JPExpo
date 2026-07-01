import type { BingoCell, Character } from '../types/bingo';

const FIVE_STAR_COUNT = 14;
const FOUR_STAR_COUNT = 10;
const GRID_SIZE = 25;
const BONUS_CENTER_INDEX = 12;
const BONUS_POINTS = 5;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function toCharacterCell(character: Character): BingoCell {
  return {
    id: `character-${character.id}`,
    type: 'character',
    character,
    found: false
  };
}

export function generateBingoGrid(characters: Character[], bonusLabel: string): BingoCell[] {
  const trimmedBonusLabel = bonusLabel.trim();

  if (!trimmedBonusLabel) {
    throw new Error('La case bonus doit contenir un personnage.');
  }

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

  const bonusCell: BingoCell = {
    id: 'bonus-cell',
    type: 'bonus',
    label: trimmedBonusLabel,
    points: BONUS_POINTS,
    found: false
  };

  const grid = [...characterCells];
  grid.splice(BONUS_CENTER_INDEX, 0, bonusCell);

  if (grid.length !== GRID_SIZE) {
    throw new Error('La grille générée ne contient pas 25 cases.');
  }

  return grid;
}

export function getCellPoints(cell: BingoCell): number {
  if (cell.type === 'bonus') {
    return cell.points;
  }

  return cell.character.points;
}
