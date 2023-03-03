import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../utils/svg/logo.svg';
import { ReactComponent as NightSVG } from '../../utils/svg/nightmode-night.svg';
import { ReactComponent as DaySVG } from '../../utils/svg/nightmode-day.svg';
import './Header.css';
import React, {useEffect, useState} from "react";
import {getStore, removeItem} from "../../utils/storage";
import { MiniProfile } from "../";


type Props = {};

const Header = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [nightmode, setNightMode] = useState<boolean>(true);
    let storeData = getStore('user');
    const [logout, setLogout] = useState<boolean>(false);

    useEffect(() => {
        if (nightmode) {
            document.body.classList.add('nightmode');
        } else {
            document.body.classList.remove('nightmode');
        }
    }, [nightmode]);

    useEffect(() => {
        const logoutReq = async() => {
            const res = await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            return await res.text();
        }

        if (logout && storeData.success) {
            logoutReq()
                .then(() => setLogout(prev => false))
                .finally(() => removeItem('user'));
        }


    }, [logout, storeData]);

    const toggleNightMode = (event: React.MouseEvent) => {
        console.log(`Toggle to ${nightmode ? 'Day mode' : 'Night mode'}`);
        setNightMode(prev => !prev);
    }

    return (
        <header 
            className={
                location.pathname !== '/' ? "header" : 'header home'
            }
            style={{ 
                position: location.pathname !== '/' ? "initial" : "fixed"
            }}
        >
            <div className='container'>
                <div className='header-logo'>
                    <LogoSVG 
                        onClick={() => navigate('/')}
                    />
                </div>
                <div className='header-nav'>
                    <nav>
                        <ul>
                            <li 
                                onClick={() => navigate('/')}
                                className={`header-nav__li active`}
                            >
                                Home
                            </li>
                            <li 
                                onClick={() => navigate('/tours')}
                                className={`header-nav__li`}
                            >
                                Tours
                            </li>
                            <li 
                                onClick={() => navigate('/shop')}
                                className={`header-nav__li`}
                            >
                                Shop
                            </li>
                            <li 
                                onClick={() => navigate('/support')}
                                className={`header-nav__li`}
                            >
                                Support
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='header-auth'>
                    {
                        storeData?.success ?
                            <>
                                <button
                                    onClick={() => {
                                        setLogout(prev => true);
                                        navigate('/');
                                        console.log("Logged out!", location.pathname)
                                    }}
                                >Logout</button>
                                <MiniProfile
                                    image={location.state?.userData?.photo}
                                />
                                <button
                                    onClick={() => {
                                        navigate('/profile', { state: {userData: location.state.userData}});
                                    }}
                                >Profile</button>
                            </>
                            :
                            <button
                                onClick={() => navigate('/sign-in')}
                            >
                                Sign In / Sign Up
                            </button>
                    }
                    <span
                        onClick={(event) => toggleNightMode(event)}
                        className={ nightmode ? 'nightmode' : 'daymode' }
                    >
                        {
                            nightmode ?
                            <DaySVG /> :
                            <NightSVG />
                        }
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header;