import type { BingoGameState } from '../types/bingo';

const STORAGE_KEY = 'cosplay-bingo-game-state';

export function saveGameState(gameState: BingoGameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

export function loadGameState(): BingoGameState | null {
  const rawValue = localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as BingoGameState;

    if (!Array.isArray(parsedValue.grid) || typeof parsedValue.createdAt !== 'string') {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function clearGameState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
