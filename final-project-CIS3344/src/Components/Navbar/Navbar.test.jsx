import { describe } from "vitest";
import Navbar from "./Navbar";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {it, expect} from "vitest";

describe("Navbar", () => {
    it("Text in component render without crashing", () => {
        render(<Navbar />);
        const homeElement = screen.getByText("Home");
        expect(homeElement).toBeInTheDocument();

        const profileElement = screen.getByText("Profile");
        expect(profileElement).toBeInTheDocument();
        
        const loginElement = screen.getByText("Login");
        expect(loginElement).toBeInTheDocument();
        
        const movieDetailElement = screen.getByText("Movie Detail");
        expect(movieDetailElement).toBeInTheDocument();
    })

    it("Check URL is changed when text is clicked", async () => {
        render(<Navbar />);
        const profileLink = screen.getByText("Profile");
        await userEvent.click(profileLink);
        expect(window.location.pathname).toBe("/profile");
    })
})