import { Suspense } from "react";

import { Providers } from "./providers";
import { AppRoutes } from "./routes";
import "../styles/global.css";

export const App = () => {
  return (
    <Providers>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <AppRoutes />
      </Suspense>
    </Providers>
  );
};
