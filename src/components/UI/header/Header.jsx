import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Header = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <header className="header">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <Link to="/about" className="header__link">О сайте</Link>
            <Link to="/posts" className="header__link">Посты</Link>
        </header>
    )
};
export default Header