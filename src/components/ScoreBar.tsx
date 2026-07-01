type ScoreBarProps = {
  foundCount: number;
  score: number;
  onReset: () => void;
};

export function ScoreBar({ foundCount, score, onReset }: ScoreBarProps) {
  function handleResetClick() {
    const confirmed = window.confirm(
      'Tu es sûr de vouloir réinitialiser ta grille ? Cette action supprimera ta partie en cours.'
    );

    if (!confirmed) {
      return;
    }

    onReset();
  }

  return (
    <header className="score-bar">
      <div>
        <p className="score-label">Score</p>
        <strong>{score} pts</strong>
      </div>

      <div>
        <p className="score-label">Trouvés</p>
        <strong>{foundCount}/25</strong>
      </div>

      <button type="button" className="secondary-button" onClick={handleResetClick}>
        Réinitialiser
      </button>
    </header>
  );
}