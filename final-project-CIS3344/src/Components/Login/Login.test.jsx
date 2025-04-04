
import { render, screen } from "@testing-library/react";
import Login from "Components/Login/Login";



describe('Login Component', () => {
    it("Renders a default login", () => {
        render(<Login />);
        const loginElement = screen.getByText("Verify Username");
        expect(loginElement).toBeInTheDocument();
    })
});