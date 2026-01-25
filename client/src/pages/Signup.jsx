import { useState } from "react";
import { signup, setToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await signup(email, password);
      setToken(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button type="submit">Create account</button>
      </form>
      {error && <p style={{ color: "salmon" }}>{error}</p>}
    </div>
  );
}
