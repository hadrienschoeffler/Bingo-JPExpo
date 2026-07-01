import { BingoGrid } from './components/BingoGrid';
import { HomeScreen } from './components/HomeScreen';
import { ScoreBar } from './components/ScoreBar';
import { useBingoGame } from './hooks/useBingoGame';

export default function App() {
  const {
    error,
    foundCount,
    gameState,
    generateGame,
    hasSavedGame,
    resetGame,
    score,
    maxScore,
    toggleCell
  } = useBingoGame();

  if (!gameState) {
    return <HomeScreen error={error} hasSavedGame={hasSavedGame} onGenerate={generateGame} />;
  }

  return (
    <main className="app-shell">
      <ScoreBar foundCount={foundCount} score={score} maxScore={maxScore} onReset={resetGame} />
      <BingoGrid grid={gameState.grid} onToggleCell={toggleCell} />
    </main>
  );
}
