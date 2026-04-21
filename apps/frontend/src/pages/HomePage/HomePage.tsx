import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1>CoffeeWithAI ☕</h1>

      <p>Learn AI by building a Coffee Guide App</p>

      <Link to="/dashboard">Start Learning</Link>
    </div>
  );
};
