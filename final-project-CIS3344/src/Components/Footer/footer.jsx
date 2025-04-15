import React from 'react';
import './footer.module.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Temple CIS 3344 Movie App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;