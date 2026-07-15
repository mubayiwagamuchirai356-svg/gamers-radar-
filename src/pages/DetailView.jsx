import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gamesData } from './gamesData'; // Local relative import
import './DetailView.css';

function DetailView() {
  const { id } = useParams();
  const game = gamesData.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="detail-error">
        <h2>🎮 Game Not Found</h2>
        <p>Sorry, we couldn't find the game you are looking for.</p>
        <Link to="/" className="back-button">↩ Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-button">↩ Back to Dashboard</Link>

      <div className="detail-card">
        <div className="detail-hero">
          <img src={game.image} alt={game.title} className="detail-image" />
          <div className="detail-title-block">
            <span className="detail-genre">{game.genre}</span>
            <h1>{game.title}</h1>
            <p className="detail-release">📅 Release Date: <strong>{game.date}</strong></p>
          </div>
        </div>

        <div className="detail-body">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Expected Rating</span>
              <span className="stat-value">⭐ {game.rating ? `${game.rating} / 10` : 'N/A'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Release Year</span>
              <span className="stat-value">🗓️ {game.year || 'TBA'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status</span>
              <span className="stat-value">🔥 {game.year ? 'Anticipated' : 'TBA'}</span>
            </div>
          </div>

          <hr />

          <div className="detail-description">
            <h3>Overview</h3>
            <p>{game.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;