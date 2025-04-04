import { render, screen } from "@testing-library/react";
import Login from "./Login";
import {describe, it, expect} from "vitest";

describe('Login Component', () => {
    it("Renders a default login", () => {
        render(<Login />);
        const loginElement = screen.getByText("Verify Login");
        expect(loginElement).to.exist;
    })
});