import { NavLink } from "react-router-dom";
import "../css/Nav.css";
import logo from "../img/lopottlogo.png";
import authService from "../services/auth.service";

function Nav({ current_role }) {
  const user = authService.getCurrentUser();

  if (user) {
    console.log("user.user: " + user.role);
  } else {
    console.log("NINCS USER!");
  }

  return (
    <div>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label>
          <img id="logo" src={logo} alt="logo" />
        </label>
        <label className="title">
          <span className="felkialtojel">!</span>
          <span>L</span>opott<span>R</span>uhak
        </label>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Főoldal
            </NavLink>
          </li>

          {user && user.role === "ROLE_ADMIN" && (
            <>
              <li>
                <NavLink exact to="/upload" activeClassName="active">
                  Feltöltés
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/delete" activeClassName="active">
                  Törlés
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/SupportEdit" activeClassName="active">
                  Edit support
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/products" activeClassName="active">
              Termékek
            </NavLink>
          </li>

          <li>
            {!user ? (
              <NavLink to="/login" activeClassName="active">
                Bejelentkezés
              </NavLink>
            ) : (
              <li>
                <NavLink to="/profile" activeClassName="active">
                  Profil
                </NavLink>
              </li>
            )}
            <li>
              <NavLink exact to="/support" activeClassName="active">
                Segítség
              </NavLink>
            </li>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
