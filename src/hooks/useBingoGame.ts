import { useMemo, useState } from 'react';
import { characters } from '../data/characters';
import { generateBingoGrid, getCellPoints } from '../services/gridGenerator';
import { clearGameState, loadGameState, saveGameState } from '../services/storageService';
import type { BingoCell, BingoGameState } from '../types/bingo';

function createGameState(grid: BingoCell[]): BingoGameState {
  return {
    grid,
    createdAt: new Date().toISOString()
  };
}

export function useBingoGame() {
  const [gameState, setGameState] = useState<BingoGameState | null>(() => loadGameState());
  const [error, setError] = useState<string | null>(null);

  const score = useMemo(() => {
    if (!gameState) {
      return 0;
    }

    return gameState.grid.reduce((total, cell) => {
      return cell.found ? total + getCellPoints(cell) : total;
    }, 0);
  }, [gameState]);

  const foundCount = useMemo(() => {
    if (!gameState) {
      return 0;
    }

    return gameState.grid.filter((cell) => cell.found).length;
  }, [gameState]);

  function generateGame(bonusLabel: string): void {
    try {
      const grid = generateBingoGrid(characters, bonusLabel);
      const nextGameState = createGameState(grid);
      setGameState(nextGameState);
      saveGameState(nextGameState);
      setError(null);
    } catch (generationError) {
      const message = generationError instanceof Error ? generationError.message : 'Erreur inconnue pendant la génération.';
      setError(message);
    }
  }

  function toggleCell(cellId: string): void {
    if (!gameState) {
      return;
    }

    const nextGameState: BingoGameState = {
      ...gameState,
      grid: gameState.grid.map((cell) => {
        if (cell.id !== cellId) {
          return cell;
        }

        return {
          ...cell,
          found: !cell.found
        };
      })
    };

    setGameState(nextGameState);
    saveGameState(nextGameState);
  }

  function resetGame(): void {
    clearGameState();
    setGameState(null);
    setError(null);
  }

  return {
    error,
    foundCount,
    gameState,
    generateGame,
    hasSavedGame: gameState !== null,
    resetGame,
    score,
    toggleCell
  };
}
