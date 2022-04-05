import "styles/navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = ({ openSideMenu, setOpenSideMenu }) => {
  return (
    <header className="App-header">
      <nav className="total-nav">
        <div className="logo">
          <img src="logo.png" alt="logo"></img>
        </div>
        <menu>
          <div className="HamburgerMenu" onClick={() => setOpenSideMenu(!openSideMenu)}>
            <GiHamburgerMenu />
          </div>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/Game">Iniciar Jogo </Link>
          </li>
          <li>
            <Link to="/Ranking">Ranking </Link>
          </li>
          <li>
            <Link to="/Rules">Regras </Link>
          </li>
        </menu>
      </nav>
    </header>
  );
};

export default Navbar;
