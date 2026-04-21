import { Link, Navigate, NavLink, useParams } from "react-router-dom";

import { lessonById, lessonIndex, lessons } from "../../data/lessons";

export const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessonById(lessonId ?? "");

  if (!lesson) {
    const fallback = lessons[0]?.id ?? "intro";
    return <Navigate to={`/lesson/${fallback}`} replace />;
  }

  const idx = lessonIndex(lesson.id);
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
      <article style={{ flex: "1 1 320px", minWidth: 0 }}>
        <h1 style={{ marginTop: 0 }}>{lesson.title}</h1>
        <p style={{ color: "#555" }}>
          About {lesson.durationMin} min · {lesson.tags.join(", ")}
        </p>
        <p style={{ lineHeight: 1.6 }}>{lesson.body}</p>
        <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
          {prev ? (
            <Link to={`/lesson/${prev.id}`}>← Previous</Link>
          ) : (
            <span style={{ color: "#999" }}>← Previous</span>
          )}
          {next ? (
            <Link to={`/lesson/${next.id}`}>Next lesson →</Link>
          ) : (
            <span style={{ color: "#999" }}>Next lesson →</span>
          )}
        </div>
      </article>

      <nav
        aria-label="All lessons"
        style={{ flex: "0 1 220px", borderTop: "1px solid #ddd", paddingTop: 16, minWidth: 200 }}
      >
        <h2 style={{ marginTop: 0, fontSize: 16 }}>All lessons</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {lessons.map((l) => (
            <li key={l.id}>
              <NavLink
                to={`/lesson/${l.id}`}
                style={({ isActive }) => ({
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1a5f2a" : "#222",
                  textDecoration: "none",
                })}
              >
                {l.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
