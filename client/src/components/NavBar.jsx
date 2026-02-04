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

  function scrollTo(sectionId) {
    // Se não estiver na Home, primeiro vai pra "/" com hash
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }
    // Se já estiver na Home, scroll suave
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(7,10,18,0.65)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Link to="/" style={{ fontWeight: 800, letterSpacing: 0.5 }}>
          Travel Planner
        </Link>

        <div style={{ display: "flex", gap: 12, marginLeft: 10 }}>
          <button className="btn" onClick={() => scrollTo("tours")}>
            Tours
          </button>
          <button className="btn" onClick={() => scrollTo("how")}>
            How it works
          </button>
          <button className="btn" onClick={() => scrollTo("about")}>
            About
          </button>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Link to="/my-trips">My Trips</Link>

          {!isLogged ? (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
