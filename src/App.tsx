import Header from "./NavHeader/Header";
import {TargetPage} from "./TargetsPage/TargetPage";
import {BrowserRouter as Router} from 'react-router-dom';
import classes from "./App.module.scss"

function App() {
  return (
    <Router>
      <div className={classes.AppWrapper}>
    <header>
      <Header/>
    </header>
      <div className={classes.contentWrapper}>
        <TargetPage/>
        </div>
    </div>
    </Router>
  );
}

export default App;
