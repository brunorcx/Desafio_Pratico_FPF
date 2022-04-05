import "styles/footer.css";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";
const Footer = (props) => {
  return (
    <footer className="total-footer">
      <div className="footer-container">
        <div className="footer">
          <ul className="social-icon">
            <li className="social-icon__item">
              <a className="social-icon__link" href="/">
                <BsFacebook />
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="/">
                <BsTwitter />
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="/">
                <BsLinkedin />
              </a>
            </li>
          </ul>
          <ul className="menu">
            <li className="menu__item" onClick={() => props.setNavbarClick("Sobre")}>
              <p className="menu__link">Sobre</p>
            </li>
            <li className="menu__item" onClick={() => props.setNavbarClick("Planos")}>
              <p className="menu__link">Planos</p>
            </li>
            <li className="menu__item" onClick={() => props.setNavbarClick("Modelos")}>
              <p className="menu__link">Modelos</p>
            </li>
            <li className="menu__item" onClick={() => props.setNavbarClick("Contatos")}>
              <p className="menu__link">Contato</p>
            </li>
          </ul>
          <p>&copy;Sistema de Busca Acessível</p>
          <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
          <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
