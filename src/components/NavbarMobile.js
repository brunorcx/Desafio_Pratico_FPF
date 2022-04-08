import "styles/navbarMobile.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav-mobile-container">
      <menu>
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
  );
};

export default Navbar;
