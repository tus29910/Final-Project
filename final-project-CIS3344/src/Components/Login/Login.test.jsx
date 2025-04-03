import {src/Components/Login/Login.test.jsx;
describe('Login Component', () => {
    it("Renders a default login", () => {
        render(<Login />);
        const loginElement = screen.getByText("Login");
        expect(loginElement).toBeInTheDocument();
    })
});