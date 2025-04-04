import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

// Simple wrapper for Router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Navbar", () => {
  it("renders all nav links", () => {
    renderWithRouter(<Navbar />);

    // Check the text exists
    expect(screen.getByText("Home")).not.toBeNull();
    expect(screen.getByText("Profile")).not.toBeNull();
    expect(screen.getByText("Login")).not.toBeNull();
    expect(screen.getByText("Movie Detail")).not.toBeNull();
  });

  it("Does not actually navigate, but click works", async () => {
    renderWithRouter(<Navbar />);
    const profileLinks = screen.getAllByText("Profile");
    await userEvent.click(profileLinks[0]);

    // This won't change the URL in the test DOM, but proves the click doesn't crash
    expect(profileLinks).not.toBeNull();
  });
});
