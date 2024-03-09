import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/reynaldo-muñoz-flores">
              Linkedin
            </a>
          </li>

          <li>
            <a href="mailto:reynaldo.munozf21@gmail.com">Email</a>
          </li>

          <li>
            <a href="https://github.com/ReynaldoMunozF">Github</a>
          </li>
          <li>
            <p>👋</p>
          </li>
        </ul>
      </div>
      <p className="footer__texto">&copy; 2024 Reynaldo Muñoz Flores, Inc</p>
    </footer>
  );
};
