import { BingoCell } from './BingoCell';
import type { BingoCell as BingoCellType } from '../types/bingo';

type BingoGridProps = {
  grid: BingoCellType[];
  onToggleCell: (cellId: string) => void;
};

export function BingoGrid({ grid, onToggleCell }: BingoGridProps) {
  return (
    <section className="bingo-grid" aria-label="Grille de bingo">
      {grid.map((cell) => (
        <BingoCell key={cell.id} cell={cell} onToggle={onToggleCell} />
      ))}
    </section>
  );
}
