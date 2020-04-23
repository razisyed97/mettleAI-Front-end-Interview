import React ,{Component} from 'react';

import './App.css';

import Referral from './components/Referral'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'

import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

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
              <Route to="/" component={Referral}/>
            </Switch>
            <Footer/>
          </BrowserRouter>
        </MuiThemeProvider>

      </div>
 
    );
  }
}

export default App;
