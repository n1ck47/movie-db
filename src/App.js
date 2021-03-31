import React from 'react';
import { createStore } from 'redux';
import { Redirect, Route, Switch} from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar.js'
import Home from './Components/Home/Home'
import Search from './Components/Search/Search'

import allReducers from './Reducers/index'
import Overview from './Components/Overview/Overview.js';

function App() {

  const store = createStore(allReducers);

  return (
    <div>
      <Navbar store={store}/>
      <Switch>
        <Route exact path='/movies' render={()=> <Home store={store} isMovie={true} isTv={false}/>} />
        <Route exact path='/tv' render={()=> <Home store={store} isMovie={false} isTv={true}/>} />
        <Route exact path='/search' render={()=> <Search store={store} query='avenger'/>} />
        <Route exact path='/overview' render={()=> <Overview store={store}/>} />
        <Redirect to='/movies'/>
      </Switch>
    </div>
  );
}

export default App;
