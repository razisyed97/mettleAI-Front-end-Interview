import React ,{Component} from 'react';

import './App.css';

import Referral from './components/Referral'
import Navbar from './components/Navbar'

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Create a theme with colour palette so this can be applied to MUI textfields
const THEME = createMuiTheme({
  typography: {
   "fontFamily": "'Montserrat', sans-serif;",
  },
  palette : {
    primary : {
      main: '#3A719B',
    },
    secondary : {
      main: '#3A719B',
    }
  }
});

class App extends Component {
  render(){
    return (
      <div className="app-div">
        <MuiThemeProvider theme={THEME}>
          <BrowserRouter>
            <Navbar/>
            <Switch>     
              <Route 
              to="/" 
              component={Referral}
              />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
 
    );
  }
}

export default App;
