import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api";
import { useAuth } from "../context/AuthContext";

function AuthForm({ mode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const action = isLogin ? loginUser : registerUser;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;
      const data = await action(payload);
      login(data);
      navigate("/");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel auth-page-panel">
      <p className="eyebrow">{isLogin ? "Welcome back" : "Create account"}</p>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <p className="panel-copy">
        {isLogin
          ? "Use your JWT-backed account to manage bookmarks."
          : "Create an account to save stories to your personal bookmarks page."}
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin ? (
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
        ) : null}

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            required
          />
        </div>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Create account"}
        </button>
      </form>

      {message ? <div className={`message ${message.type}`}>{message.text}</div> : null}
    </div>
  );
}

export default AuthForm;
