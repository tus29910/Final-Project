import React from 'react';
import styles from './footer.module.css'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                © 2025 Temple CIS 3342. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;