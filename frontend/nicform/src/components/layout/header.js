import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
//import Sidebar from './Sidebar';

function Header() {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/assets/cover.png" alt="OSCA Logo" />
                </div>
                <h1>Odisha Seed Certification Agency</h1>\
                
            </header>

            <div className={styles.sidebar}>
            <nav>
                 <ul>
                     <li><Link to="/inputVerify">InputVerify</Link></li>
                     <li><Link to="/about">About Us</Link></li>
                     <li><Link to="/services">Services</Link></li>
                     <li><Link to="/contact">Contact Us</Link></li>
                     <li><Link to="/GrowergCertification">Grower Certification</Link></li>
                 </ul>
             </nav>
         </div>
            
               
            
        </div>
    );
}

export default Header;
