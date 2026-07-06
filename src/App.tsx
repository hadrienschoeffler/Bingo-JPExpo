import { useState } from 'react';
import { BingoGrid } from './components/BingoGrid';
import { CharacterSelectionScreen } from './components/CharacterSelectionScreen';
import { HomeScreen } from './components/HomeScreen';
import { ScoreBar } from './components/ScoreBar';
import { useBingoGame } from './hooks/useBingoGame';

type AppScreen = 'home' | 'custom-selection';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [pendingBonusLabel, setPendingBonusLabel] = useState('');
  const {
    allCharacters,
    clearError,
    error,
    foundCount,
    gameState,
    generateCustomGame,
    generateRandomGame,
    maxScore,
    resetGame,
    score,
    toggleCell
  } = useBingoGame();

  function goHome() {
    clearError();
    setScreen('home');
  }

  function goToCustomSelection(bonusLabel: string) {
    setPendingBonusLabel(bonusLabel);
    clearError();
    setScreen('custom-selection');
  }

  function handleCustomGridValidation(selectedCharacterIds: string[]) {
    generateCustomGame(selectedCharacterIds, pendingBonusLabel);
  }

  if (gameState) {
    return (
      <main className="app-shell">
        <ScoreBar foundCount={foundCount} score={score} maxScore={maxScore} onReset={resetGame} />
        <BingoGrid grid={gameState.grid} onToggleCell={toggleCell} />
      </main>
    );
  }

  if (screen === 'custom-selection') {
    return (
      <CharacterSelectionScreen
        bonusLabel={pendingBonusLabel}
        characters={allCharacters}
        error={error}
        onBack={goHome}
        onValidate={handleCustomGridValidation}
      />
    );
  }

  return <HomeScreen error={error} onCreateCustomGrid={goToCustomSelection} onGenerateRandomGrid={generateRandomGame} />;
}
