import React from 'react';
import './App.css';

import Main from './Main';
import Character from './Characters';
import Comic from './Comics';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path="/" component={Main} />
          <Route path="/characters" component={Character} />
          <Route path="/comics" component={Comic} />

        </Router>
    </div>
  );
}

export default App;
