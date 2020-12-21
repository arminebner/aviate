import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DataProvider } from './global/DataContext'
import Landing from './components/pages/Landing'
import MapPage from './components/pages/MapPage'
import './App.css';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/map' component={MapPage} />
          </Switch>
        </Router>

      </div>
    </DataProvider>
  );
}

export default App;
