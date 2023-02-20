import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../utils/svg/logo.svg';
import './Header.css';


type Props = {}

const Header = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    return (
        <header 
            className='header'
            style={{ 
                backgroundColor: location.pathname !== '/' ? "var(--color-sky-blue)" : 'transparent' 
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
                    <button
                        onClick={() => navigate('/sign-in')}
                    >Sign In / Sign Up</button>
                </div>
            </div>
        </header>
    )
}

export default Header;