import { Outlet } from "react-router-dom";

import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Sidebar } from "../components/layout/sidebar";

export const AppLayout = () => {
  return (
    <div style={{ display: "flex", alignItems: "stretch", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 24, maxWidth: 960 }}>
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
};
