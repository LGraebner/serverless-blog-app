import React, { Component } from 'react';
import auth0 from 'auth0-js';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import { authConfig } from '../../config';
import history from '../../auth/history';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: 'false'
        }
    }

    auth0 = new auth0.WebAuth({
        domain: authConfig.domain,
        clientID: authConfig.clientId,
        redirectUri: authConfig.callbackUrl,
        responseType: 'token id_token',
        scope: 'openid'
    });

    componentDidMount() {
        console.log('isLoggedIn', localStorage.getItem('isLoggedIn'))
        const isLoggedIn = (localStorage.getItem('isLoggedIn') == 'true')
        console.log('isLoggedIn', isLoggedIn)
        this.setState({isLoggedIn : isLoggedIn})

    }

    login = async () => {
        this.auth0.authorize();
    }

    logout = async () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('idToken')
        localStorage.removeItem('accessToken')
        this.auth0.logout({
            return_to: window.location.origin
        });
        history.replace('/');
    }

    login = async () => {
        this.auth0.authorize();
    }

    render() {


        let button;
        let title;
        let gotoListButton;
        let adminButton;
        if (!this.state.isLoggedIn) {
            button = 
            <Button 
                id='login'
                variant="contained" 
                color="primary"
                onClick={() => {this.login()}}
                >
                    Login
            </Button>

            title = 'Login'

        } else {
            button = 
            <Button 
                id='login'
                variant="contained" 
                color="primary"
                onClick={() => {this.logout()}}
                >
                    Logout
            </Button>
            title = 'Logout'
            gotoListButton = 
            <IconButton 
                id='gotoOverview'
                component={Link} 
                to='/overview'
                >
                    <ListIcon />
            </IconButton>
            adminButton =
            <IconButton 
                aria-label="gotoAdmin"
                component={Link} 
                to='/admin'
                >
                <SettingsIcon />
            </IconButton>
        }

            return(
                <div>
                        {adminButton}
                        {gotoListButton}

                        
                
                <div style={{padding:'25px', width: '650px'}}>

                    <h1>{title}</h1>
                    {button}
                </div>
                </div>
            )

    }
}

export default Login;