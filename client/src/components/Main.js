import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Overview from './overview/Overview';
import Article from './article/Article';
import Admin from './Admin/Admin';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Overview}/>
        <Route path='/blogentry/:number' component={Article}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    </main>
  )
  
  export default Main