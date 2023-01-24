import React from 'react';
import "./Footer.css"

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer__container container">
            <h1 className="footer__title">RoberBD</h1>

            <ul className='footer__list'>
                <li>
                    <a href="#about" className="footer__link">About</a>
                </li>

                <li>
                    <a href="#projects" className="footer__link">Projects</a>
                </li>

                <li>
                    <a href="#testimonials" className="footer__link">Testimonials</a>
                </li>
            </ul>

            <div className="footer__social">
              <a 
                   href="https://www.instagram.com/roberr_bd/" 
                   className="footer__social-link" 
                   target="_blank"
                >
               <i className="uil uil-instagram"></i>
               </a>

               <a 
                   href="https://www.linkedin.com/in/robertino-barbuto-651a561ab/" className="footer__social-link" 
                   target="_blank"
                >
                <i className="uil uil-linkedin-alt"></i>
                </a>

                <a 
                    href="https://github.com/rober8b" 
                    className="footer__social-link" 
                    target="_blank"
                >
                <i className="uil uil-github-alt"></i>
                </a>
            </div>

            <span className='footer__copy'>
                &#169;Robertino Barbuto. All rights reserved
            </span>
        </div>
    </footer>
  )
}

export default Footer