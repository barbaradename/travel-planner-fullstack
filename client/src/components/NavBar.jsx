import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/api";
import { useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(Boolean(getToken()));

  function handleLogout() {
    clearToken();
    setIsLogged(false);
    navigate("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/my-trips">My Trips</Link>

      <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
        {!isLogged ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}
