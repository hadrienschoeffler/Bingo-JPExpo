export type Rarity = 4 | 5 | 'special';

export type Character = {
  id: string;
  name: string;
  game: 'Genshin Impact';
  rarity: Rarity;
  points: number;
  image: string;
};

export type CharacterBingoCell = {
  id: string;
  type: 'character';
  character: Character;
  found: boolean;
};

export type BonusBingoCell = {
  id: string;
  type: 'bonus';
  label: string;
  points: number;
  found: boolean;
};

export type BingoCell = CharacterBingoCell | BonusBingoCell;

export type BingoGameState = {
  grid: BingoCell[];
  createdAt: string;
};
