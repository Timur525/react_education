import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h2>Страница для логина</h2>
            <form onSubmit = {login}>
                <MyInput
                    type='text'
                    placeholder='Логин'
                />
                <MyInput
                    type='password'
                    placeholder='Пароль'
                />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
};
export default Login