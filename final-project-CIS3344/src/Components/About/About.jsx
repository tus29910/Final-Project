import React from 'react';
import styles from './About.module.css'; 
import Navbar from '../Navbar/Navbar';

const About = () => {
    return (
        <div className={styles.aboutPage}>
            <Navbar />
            <main className={styles.aboutContainer}>
                <h1>About Us</h1>
                <p>
                    Welcome to our website! We are dedicated to providing the best experience for our users.
                    Our team is passionate about delivering high-quality content and services that meet your needs.
                </p>
                <p>
                    Thank you for visiting our site. If you have any questions or feedback, feel free to reach out to us!
                </p>
            </main>
        </div>
    );
};

export default About;
