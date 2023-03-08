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
    console.log(storeData);

    useEffect(() => {
        if (nightmode) {
            document.body.classList.add('nightmode');
        } else {
            document.body.classList.remove('nightmode');
        }
    }, [nightmode]);

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
                        onClick={() => navigate('/', storeData ? storeData ? { state: { userData: location.state.userData }} : {} : {})}
                    />
                </div>
                <div className='header-nav'>
                    <nav>
                        <ul>
                            <li 
                                onClick={() => navigate('/', storeData ? { state: { userData: location.state.userData }} : {})}
                                className={`header-nav__li active`}
                            >
                                Home
                            </li>
                            <li 
                                onClick={() => navigate('/tours', storeData ? { state: { userData: location.state.userData }} : {})}
                                className={`header-nav__li`}
                            >
                                Tours
                            </li>
                            <li 
                                onClick={() => navigate('/shop', storeData ? { state: { userData: location.state.userData }} : {})}
                                className={`header-nav__li`}
                            >
                                Shop
                            </li>
                            <li 
                                onClick={() => navigate('/support', storeData ? { state: { userData: location.state.userData }} : {})}
                                className={`header-nav__li`}
                            >
                                Support
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='header-auth'>
                    {
                        storeData?.success && storeData ?
                            <>
                                <MiniProfile
                                    image={location.state?.userData?.photo}
                                />
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