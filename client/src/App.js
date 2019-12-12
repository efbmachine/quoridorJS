import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Board from './components/Board';

function App() {
    return (
        <div className="game-area">

            <Board width='500px' height='500px' playersPos={['e9','e1']}/>

        </div>
    );
    }

export default App;
