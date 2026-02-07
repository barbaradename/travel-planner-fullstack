import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/api";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogged = Boolean(getToken());

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function goHomeAndScroll(id) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    } else {
      scrollToId(id);
    }
  }

  return (
    <div className="nav">
      <div className="navInner">
        <Link className="navBrand" to="/">
          Travel Planner
        </Link>

        <div className="navLinks">
          <button className="navLink" onClick={() => goHomeAndScroll("quiz")}>
            Quiz
          </button>
          <button className="navLink" onClick={() => goHomeAndScroll("how")}>
            How it works
          </button>
          <button className="navLink" onClick={() => goHomeAndScroll("about")}>
            About
          </button>
        </div>

        <div className="navRight">
          <Link className="navLink" to="/my-trips">
            My Trips
          </Link>
          {!isLogged ? (
            <>
              <Link className="navBtn" to="/login">
                Login
              </Link>
              <Link className="navBtn navBtnPrimary" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button className="navBtn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
