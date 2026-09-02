import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="kaisei-footer" role="contentinfo">
      <div className="kaisei-container kaisei-footer__wrapper">
        <div className="kaisei-footer__head">
          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Menu]</p>
            <ul className="kaisei-footer__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/web-dev">Web Dev</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/photography">Photography</Link></li>
              <li>
                <a
                  href="/NAGABHATLA_RAMA_KOUSHIK_Resume.pdf"
                  download="NAGABHATLA RAMA KOUSHIK - Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Social]</p>
            <ul className="kaisei-footer__list">
              <li><a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/koushik-nagabhatla-113a493a2" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/__.koushik__.7" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Mail]</p>
            <p><a href="mailto:koushiknagabhatla@gmail.com" className="kaisei-footer__mail">koushiknagabhatla@gmail.com</a></p>
          </div>

        </div>

        <div className="kaisei-footer__bottom">
          <h2 className="kaisei-footer__title">
            thank you
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
