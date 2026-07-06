import { FormEvent, useState } from 'react';

const BONUS_MAX_LENGTH = 40;

type HomeScreenProps = {
  error: string | null;
  onCreateCustomGrid: (bonusLabel: string) => void;
  onGenerateRandomGrid: (bonusLabel: string) => void;
};

export function HomeScreen({ error, onCreateCustomGrid, onGenerateRandomGrid }: HomeScreenProps) {
  const [bonusLabel, setBonusLabel] = useState('');

  function getCleanBonusLabel(): string | null {
    const cleanBonusLabel = bonusLabel.trim();

    if (!cleanBonusLabel) {
      return null;
    }

    return cleanBonusLabel;
  }

  function handleCreateCustomGrid() {
    const cleanBonusLabel = getCleanBonusLabel();

    if (!cleanBonusLabel) {
      return;
    }

    onCreateCustomGrid(cleanBonusLabel);
  }

  function handleRandomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanBonusLabel = getCleanBonusLabel();

    if (!cleanBonusLabel) {
      return;
    }

    onGenerateRandomGrid(cleanBonusLabel);
  }

  const canStart = bonusLabel.trim().length > 0;

  return (
    <main className="home-screen">
      <section className="hero-card">
        <p className="eyebrow">Japan Expo</p>
        <h1>Cosplay Bingo</h1>
        <p className="hero-description">
          Crée ta grille, repère les cosplays Genshin Impact, coche les icônes trouvées et marque un maximum de points.
        </p>
        <p className="hero-description">
          La grille contient 24 personnages Genshin, jouables ou spéciaux, et 1 case bonus que tu choisis avant de commencer. En aléatoire, l’application tire entre 0 et 3 personnages spéciaux, puis complète avec des personnages jouables.
        </p>

        <form className="bonus-form" onSubmit={handleRandomSubmit}>
          <label htmlFor="bonus-label">Personnage bonus</label>
          <input
            id="bonus-label"
            type="text"
            value={bonusLabel}
            onChange={(event) => setBonusLabel(event.target.value)}
            placeholder="Ex. Hatsune Miku, Link, Gojo..."
            maxLength={BONUS_MAX_LENGTH}
          />
          <p className="form-help">Cette case vaut 5 points. Elle sera placée au centre de la grille.</p>

          {error ? <p className="error-message">{error}</p> : null}

          <div className="home-actions two-columns">
            <button type="button" className="primary-button" onClick={handleCreateCustomGrid} disabled={!canStart}>
              Créer ma grille
            </button>
            <button type="submit" className="secondary-action-button" disabled={!canStart}>
              Grille aléatoire
            </button>
          </div>
        </form>

        <p className="offline-note">Pense à ouvrir l’application avec Internet avant d’entrer dans la convention.</p>
      </section>
    </main>
  );
}
