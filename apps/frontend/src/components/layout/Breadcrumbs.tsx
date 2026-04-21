import { Link, useLocation } from "react-router-dom";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  lesson: "Lessons",
  tutor: "AI Tutor",
  playground: "Playground",
  recipes: "Recipes",
  profile: "Profile",
  intro: "Intro",
  "prompting-101": "Prompting 101",
  "coffee-domain": "Coffee domain",
};

function labelForSegment(segment: string): string {
  return LABELS[segment] ?? segment.replace(/-/g, " ");
}

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const crumbs: { to: string; label: string }[] = [];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    crumbs.push({ to: acc, label: labelForSegment(seg) });
  }

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 12, fontSize: 14 }}>
      <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.to} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span aria-hidden="true">/</span>
            {i === crumbs.length - 1 ? (
              <span style={{ color: "#555" }}>{c.label}</span>
            ) : (
              <Link to={c.to}>{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
