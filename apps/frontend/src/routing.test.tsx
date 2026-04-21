import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "./app/routes";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
    </MemoryRouter>
  );
}

describe("AppRoutes", () => {
  it("renders the home page at /", async () => {
    renderAt("/");
    expect(screen.getByRole("heading", { name: /CoffeeWithAI/i })).toBeInTheDocument();
  });

  it("renders the dashboard at /dashboard", async () => {
    renderAt("/dashboard");
    expect(await screen.findByRole("heading", { name: /^Dashboard$/i })).toBeInTheDocument();
  });

  it("renders a lesson at /lesson/:id", async () => {
    renderAt("/lesson/intro");
    expect(await screen.findByRole("heading", { name: /Welcome to prompt engineering/i })).toBeInTheDocument();
  });

  it("redirects /lesson to the first lesson", async () => {
    renderAt("/lesson");
    expect(await screen.findByRole("heading", { name: /Welcome to prompt engineering/i })).toBeInTheDocument();
  });

  it("redirects unknown paths to home", async () => {
    renderAt("/does-not-exist");
    expect(await screen.findByRole("heading", { name: /CoffeeWithAI/i })).toBeInTheDocument();
  });
});
