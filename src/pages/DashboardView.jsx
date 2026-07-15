import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { gamesData } from './gamesData'; // Local relative import
import './DashboardView.css';

function DashboardView() {
  const monthCounts = gamesData.reduce((acc, game) => {
    const month = game.month;
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.keys(monthCounts).map(month => ({
    name: month,
    "Number of Releases": monthCounts[month]
  }));

  const genreCounts = gamesData.reduce((acc, game) => {
    const genre = game.genre;
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(genreCounts).map(genre => ({
    name: genre,
    value: genreCounts[genre]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🎮 The Gamer's Radar</h1>
        <p>Your ultimate hub for tracking highly anticipated game drops.</p>
      </header>

      <section className="charts-section">
        <div className="chart-card">
          <h3>📅 Releases by Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis allowDecimals={false} stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: '1px solid #444' }} />
              <Bar dataKey="Number of Releases" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>🏷️ Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: '1px solid #444' }} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid-section">
        <h2>🔥 Upcoming Titles</h2>
        <div className="board-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {gamesData.map((game) => (
            <Link to={`/game-detail/${game.id}`} key={game.id} className="card-link">
              <div className="card" style={{ background: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
                <img src={game.image} alt={game.title} className="card-image" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div className="card-content" style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#fff' }}>{game.title}</h3>
                  <span className="release-date" style={{ color: '#888', display: 'block', marginBottom: '8px' }}>📅 Release: {game.date}</span>
                  <p style={{ color: '#ccc', fontSize: '0.9rem', margin: 0 }}>{game.description.substring(0, 80)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardView;