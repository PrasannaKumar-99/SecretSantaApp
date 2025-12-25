// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import AdminApp from './App.jsx';
import GamePage from './GamePage.jsx';
import './index.css';

const Root = () => (
  <BrowserRouter>
    <nav
  style={{
    padding: '10px',
    background: '#222',
    color: '#fff',
    display: 'flex',
    gap: '40px',            // adds space between Admin and Game
  }}
>
  <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin (CRUD)</Link>
  <Link to="/game" style={{ color: '#fff', textDecoration: 'none' }}>Game</Link>
</nav>

    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
      <Route path="/admin" element={<AdminApp />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
