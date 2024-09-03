import * as React from 'react';
import logo from '../wombat.png';
import classes from "./Header.module.scss";
import { useNavigate} from "react-router-dom";

const Header: React.FC = () => {
const navigate = useNavigate();
  return (
    <div>
    <header className={classes.header}>
      <img src={logo} alt="wombat-logo" className={classes.header_logo} onClick={()=>navigate("/")}/>
    </header>
    
    </div>
    
  );
};

export default Header;