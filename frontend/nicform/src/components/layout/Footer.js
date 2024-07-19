import React from 'react';
import style from './footer.module.css'; // Ensure correct path to footer.module.css

function Footer() {
    return (
        <div>
            <footer className={style.footer}>
                <p>&copy; 2024 Odisha Seed Certification Agency. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;
