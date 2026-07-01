import { useState } from 'react';
import { getCellPoints } from '../services/gridGenerator';
import type { BingoCell as BingoCellType } from '../types/bingo';

type BingoCellProps = {
  cell: BingoCellType;
  onToggle: (cellId: string) => void;
};

export function BingoCell({ cell, onToggle }: BingoCellProps) {
  const [imageError, setImageError] = useState(false);
  const points = getCellPoints(cell);

  if (cell.type === 'bonus') {
    return (
      <button
        type="button"
        className={`bingo-cell bonus-cell ${cell.found ? 'found' : ''}`}
        onClick={() => onToggle(cell.id)}
        aria-label={`Case bonus ${cell.label}, ${points} points`}
      >
        <span className="bonus-star">★</span>
        <span className="bonus-label">{cell.label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`bingo-cell character-cell rarity-${cell.character.rarity} ${cell.found ? 'found' : ''}`}
      onClick={() => onToggle(cell.id)}
      aria-label={`${cell.character.name}, ${cell.character.rarity} étoiles, ${points} points`}
      title={`${cell.character.name} • ${points} pts`}
    >
      {!imageError ? (
        <img
          src={cell.character.image}
          alt={cell.character.name}
          onError={() => setImageError(true)}
          draggable="false"
        />
      ) : (
        <span className="image-fallback">?</span>
      )}
    </button>
  );
}
