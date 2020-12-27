import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { DataProvider } from './global/DataContext'
import Landing from './components/pages/Landing'
import Login from './components/pages/Login'
import MapPage from './components/pages/MapPage'
import './App.css';

function App() {

  return (
    <DataProvider>
      <div className="App">
        <Router>
          <AnimatePresence>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/login' component={Login} />
              <Route path='/map' component={MapPage} />
            </Switch>
          </AnimatePresence>
        </Router>

      </div>
    </DataProvider>
  );
}

export default App;
