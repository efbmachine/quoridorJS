import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Board from './components/Board';

function App() {
    return (
        <div className="game-area">

            <Board width='500px' height='500px' walls={['a3v']} />

        </div>
    );
    }

export default App;
