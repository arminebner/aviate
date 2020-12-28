import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { DataProvider } from './global/DataContext'
import Landing from './components/pages/Landing'
import MapPage from './components/pages/MapPage'
import './App.css';

function App() {

  return (
    <DataProvider>
      <div className="App">
          <AnimatePresence exitBeforeEnter>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/map' component={MapPage} />
            </Switch>
          </AnimatePresence>
      </div>
    </DataProvider>
  );
}

export default App;
