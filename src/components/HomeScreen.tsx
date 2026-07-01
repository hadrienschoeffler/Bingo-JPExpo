import { FormEvent, useState } from 'react';

type HomeScreenProps = {
  error: string | null;
  hasSavedGame: boolean;
  onGenerate: (bonusLabel: string) => void;
};

export function HomeScreen({ error, hasSavedGame, onGenerate }: HomeScreenProps) {
  const [bonusLabel, setBonusLabel] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate(bonusLabel);
  }

  return (
    <main className="home-screen">
      <section className="hero-card">
        <p className="eyebrow">Japan Expo</p>
        <h1>Cosplay Bingo</h1>
        <p className="hero-description">
          Génère ta grille, repère les cosplays Genshin Impact, coche les icônes trouvées et marque un maximum de points.
        </p>

        {hasSavedGame ? (
          <p className="saved-game-info">Une partie est déjà sauvegardée sur cet appareil.</p>
        ) : null}

        <form className="bonus-form" onSubmit={handleSubmit}>
          <label htmlFor="bonus-label">Personnage bonus</label>
          <input
            id="bonus-label"
            type="text"
            value={bonusLabel}
            onChange={(event) => setBonusLabel(event.target.value)}
            placeholder="Ex. Hatsune Miku, Link, Gojo..."
            maxLength={40}
          />
          <p className="form-help">Cette case rapporte 5 points si tu trouves le personnage choisi.</p>
          {error ? <p className="error-message">{error}</p> : null}
          <button type="submit">Générer ma grille</button>
        </form>

        <p className="offline-note">Pense à ouvrir l’application avec Internet avant d’entrer dans la convention.</p>
      </section>
    </main>
  );
}
