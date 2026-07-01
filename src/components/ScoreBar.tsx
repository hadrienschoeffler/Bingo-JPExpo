type ScoreBarProps = {
  foundCount: number;
  score: number;
  onReset: () => void;
};

export function ScoreBar({ foundCount, score, onReset }: ScoreBarProps) {
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
      <button type="button" className="secondary-button" onClick={onReset}>
        Réinitialiser
      </button>
    </header>
  );
}
