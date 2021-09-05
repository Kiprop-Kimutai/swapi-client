import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PersonDetails from './pages/Personal.Details';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});
const App:React.FC = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar>
       <Toolbar color = "primary"/>
      </AppBar>
      <div className = {classes.root}>
      <Switch>
          <Route exact path = "/"  component = {Home}/>
          <Route path = "/person/:name" component = {PersonDetails}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
