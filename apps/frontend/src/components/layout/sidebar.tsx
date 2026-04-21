import { NavLink, useLocation } from "react-router-dom";

import { lessons } from "../../data/lessons";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? 600 as const : 400 as const,
  color: isActive ? "#1a5f2a" : "#222",
  textDecoration: "none",
});

export const Sidebar = () => {
  const { pathname } = useLocation();
  const firstLesson = lessons[0]?.id ?? "intro";
  const inLessons = pathname.startsWith("/lesson");

  return (
    <aside
    style={{
      width: 220,
      flexShrink: 0,
      padding: "16px 12px",
      background: "#fff",
      borderRight: "1px solid #ddd",
      minHeight: "100vh",
    }}
  >
    <h3 style={{ marginTop: 0 }}>CoffeeWithAI</h3>

    <nav>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        <li>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/lesson/${firstLesson}`}
            style={(p) => linkStyle({ isActive: p.isActive || inLessons })}
          >
            Lessons
          </NavLink>
        </li>
        <li>
          <NavLink to="/tutor" style={linkStyle}>
            AI Tutor
          </NavLink>
        </li>
        <li>
          <NavLink to="/playground" style={linkStyle}>
            Playground
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes" style={linkStyle}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" style={linkStyle}>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
  );
};
