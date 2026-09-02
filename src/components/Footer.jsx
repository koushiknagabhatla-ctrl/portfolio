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
              <li><a href="#works">Works</a></li>
              <li><Link to="/programming">Programming</Link></li>
              <li><Link to="/photography">Photography</Link></li>
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
