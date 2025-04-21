import { render, screen } from "@testing-library/react";
import Login from "./Login";
import {describe, it, expect} from "vitest";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login Component', () => {
    it("Renders a default login", () => {
        renderWithRouter(<Login />);
        expect(screen.getByPlaceholderText("Username")).to.exist;
        expect(screen.getByPlaceholderText("Password")).to.exist;
    })
});