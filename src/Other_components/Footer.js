import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css";

function Footer() {
  const iconSize = "2x";

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left-content">
          <div className="copyright">&copy; !LopottRuhak</div>
        </div>
        <div className="contact-info">
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px" }} />{" "}
          NemLopottRuhak@info.hu
          <br />
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: "5px" }} />{" "}
          06/30-123-4567
        </div>
        <div className="right-content">
          <FontAwesomeIcon
            icon={faFacebook}
            style={{ fontSize: iconSize, cursor: "pointer" }}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            style={{
              fontSize: iconSize,
              cursor: "pointer",
              marginLeft: "10px",
            }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
