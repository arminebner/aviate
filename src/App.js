import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './components/pages/Landing'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={Landing} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
