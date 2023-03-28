import React from 'react';
// import logo from './logo.svg';
//import logo from './podium_logo_teal.svg';
import Header from "./NavHeader/Header";
// import { TargetsLandingPage } from './TargetsLandingPage/TargetsLandingPage';
import {TargetPage} from "./TargetsPage/TargetPage";
import {BrowserRouter as Router} from 'react-router-dom';
import classes from "./App.module.scss"

function App() {
  return (
    <Router>
      <div className={classes.AppWrapper}>
    <header>
      <Header/>
      {/* <TargetsLandingPage/> */}
    </header>
      <div className={classes.contentWrapper}><TargetPage/></div>
    </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
