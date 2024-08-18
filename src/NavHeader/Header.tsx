import * as React from 'react';
import logo from '../wombat.png';
import classes from "./Header.module.scss";
import { Routes, Route, useNavigate} from "react-router-dom";

const Header: React.FC = () => {
const navigate = useNavigate();
  return (
    <div>
    <header className={classes.header}>
      <img src={logo} className={classes.header_logo} onClick={()=>navigate("/p4d")}/>
    </header>
    
    </div>
    
  );
};

export default Header;