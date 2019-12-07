import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Board from './components/Board';

function App() {
    return (
        <div className="">
            <Board width='500px' height='500px' />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                </a>
            </header>
        </div>
    );
    }

export default App;
