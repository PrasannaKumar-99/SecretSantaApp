// src/GamePage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:8080/api/employees';

function GamePage() {
  const [employees, setEmployees] = useState([]);
  const [boxEmployees, setBoxEmployees] = useState([]);
  const [currentPersonName, setCurrentPersonName] = useState('');
  const [drawnEmployee, setDrawnEmployee] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [alreadyDrawnSet, setAlreadyDrawnSet] = useState(new Set());

  const loadEmployees = async () => {
    const res = await axios.get(API_BASE);
    setEmployees(res.data);
    setBoxEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const drawFromBox = () => {
    const trimmedName = currentPersonName.trim();
    const lower = trimmedName.toLowerCase();

    if (!trimmedName) {
      alert('Enter your name (person who is drawing).');
      return;
    }

    const allowedNames = employees.map(e => e.name.toLowerCase());
    if (!allowedNames.includes(lower)) {
      alert('You are not in this Secret Santa group.');
      return;
    }

    if (alreadyDrawnSet.has(lower)) {
      alert('You already drew your Secret Santa once. Only one chance per person!');
      return;
    }

    if (boxEmployees.length === 0) {
      alert('Box is empty. All names are taken!');
      return;
    }

    const availableForThisPerson = boxEmployees.filter(emp => {
      const empName = emp.name.toLowerCase();
      if (empName === lower) return false; // no self
      return true;
    });

    if (availableForThisPerson.length === 0) {
      alert('No valid names left for you. Ask organizer to adjust rules.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableForThisPerson.length);
    const chosen = availableForThisPerson[randomIndex];

    setDrawnEmployee(chosen);
    setSelectedGift(null);

    const newBox = boxEmployees.filter(emp => emp.id !== chosen.id);
    setBoxEmployees(newBox);

    setAlreadyDrawnSet(prev => {
      const copy = new Set(prev);
      copy.add(lower);
      return copy;
    });
  };

  const spinForGift = () => {
    if (!drawnEmployee) return;
    setSpinning(true);

    const favorites = drawnEmployee.favorites || [];
    const randomGift =
      favorites.length > 0
        ? favorites[Math.floor(Math.random() * favorites.length)]
        : null;

    setTimeout(() => {
      setSelectedGift(randomGift);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="app">
      <div className="overlay">
        <h1>🎅 Secret Santa Game</h1>
        <p>Draw one name, then spin for a gift.</p>

        <div className="rules-card">
          <h2>Secret Santa Rules</h2>

          <h3>Basic Secret Santa</h3><details>
          <ul>
            <li>Put all participant names into a box and shuffle them.</li>
            <li>Each person draws one name and must keep it secret.</li>
            <li>The drawn person is the one they buy a gift for.</li>
            <li>Everyone brings a wrapped gift with the recipient’s name on it for exchange day.</li>
          </ul>
          </details>

          <h3>Office rules</h3><details>
          <ul>
            <li>Gift budget: e.g., ₹200–₹500 so gifts stay fair.</li>
            <li>Voluntary: Only those who want to join should participate.</li>
            <li>Appropriate gifts only: No offensive or NSFW items.</li>
          </ul>
</details>
          <h3>Rules used by this app</h3><details>
          <ul>
            <li>Each employee can draw only once; second time is blocked.</li>
            <li>You can’t draw yourself; the app avoids your own name.</li>
            <li>After drawing, you see that employee’s favorite items and spin to pick the final gift.</li>
          </ul></details>
        </div>

        <div className="panel">
          <h2>Play Secret Santa</h2>
          <label>
            Your name (person drawing):
            <input
              type="text"
              value={currentPersonName}
              onChange={e => setCurrentPersonName(e.target.value)}
              placeholder="Type your name as in list"
            />
          </label>

          <button onClick={drawFromBox} className="draw-btn">
            Draw from Box
          </button>

          <p>Names still inside box: {boxEmployees.length}</p>
        </div>

        {drawnEmployee && (
          <div className="result-card">
            <h2>Hello {currentPersonName}, your slip is:</h2>
            <h3>{drawnEmployee.name}</h3>

          
*
            <div className="spinner-section">
              <button onClick={spinForGift} disabled={spinning} className="spin-btn">
                {spinning ? 'Spinning…' : 'Spin for Gift'}
              </button>

              {spinning && <div className="spinner" />}

              {selectedGift && (
                <p className="gift-result">
                  🎁 You will give <strong>{drawnEmployee.name}</strong> the gift:{' '}
                  <strong>{selectedGift}</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
