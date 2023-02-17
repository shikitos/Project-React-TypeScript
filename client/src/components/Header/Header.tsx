import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../utils/svg/logo.svg';
import './Header.css';


type Props = {}

const Header = (props: Props) => {
    const location = useLocation();
    console.log(location);

    return (
        <header className='header'>
            <div className='container'>
                <div className='header-logo'>
                    <LogoSVG />
                </div>
                <div className='header-nav'>
                    <nav>
                        <ul>
                            <li className={`header-nav__li active`}>Home</li>
                            <li className={`header-nav__li`}>Tours</li>
                            <li className={`header-nav__li`}>Shop</li>
                            <li className={`header-nav__li`}>Support</li>
                        </ul>
                    </nav>
                </div>
                <div className='header-auth'>
                    <button>Sign In / Sign Up</button>
                </div>
            </div>
        </header>
    )
}

export default Header;