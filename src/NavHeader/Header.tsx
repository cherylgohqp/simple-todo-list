import logo from '../wombat.png';
import classes from "./Header.module.scss";
import { useNavigate} from "react-router-dom";

const Header = () => {
const navigate = useNavigate();
  return (
    <div>
    <header className={classes.header}>
      <img src={logo} title="Wombat icons created by Freepik - Flaticon" alt="https://www.flaticon.com/free-icons/wombat" className={classes.header_logo} onClick={()=>navigate("/")}/>
    </header>
    
    </div>
    
  );
};

export default Header;