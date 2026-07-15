import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashboardView from './pages/DashboardView';
import DetailView from './pages/DetailView';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="sidebar">
          <h2>🎮 Gamer's Radar</h2>
          <ul>
            <li>
              <Link to="/">🏠 Dashboard</Link>
            </li>
          </ul>
        </nav>

        <main className="content-area">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/game-detail/:id" element={<DetailView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;