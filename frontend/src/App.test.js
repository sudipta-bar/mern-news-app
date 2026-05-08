import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

test("renders stories heading", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  expect(screen.getByText(/hacker news reader with bookmarks/i)).toBeInTheDocument();
});
