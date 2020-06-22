import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Overview from './overview/Overview';
import Article from './article/Article';
import Admin from './Admin/Admin';
import AddItem from './Admin/AddItem'
import EditItem from './Admin/EditItem'
import Login from './Login/Login'
import Callback from './Login/Callback'
import Auth from '../auth/Auth'

const auth = new Auth()

const handleAuthentication = (props) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/blogentry/:number' component={Article}/>
        <Route path='/admin/add' component={AddItem}/>
        <Route path='/admin/edit/:number' component={EditItem}/>
        <Route path='/admin' component={Admin}/>
        <Route path='/login' component={Login}/>
        <Route path='/overview' component={Overview}/>
        <Route 
          path='/callback' 
          render={props => {
            handleAuthentication(props)
            return <Overview />
          }}
        
        />
      </Switch>
    </main>
  )
  
  export default Main