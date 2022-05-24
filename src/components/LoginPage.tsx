import { useRef } from "react";

import { UserStore } from "../stores/User";

import "../styles/login.css";

export default function LoginPage() {
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onLogin = () => {
        const login = loginRef.current?.value;
        const password = passwordRef.current?.value;
        if (login && password) {
            UserStore.login(login, password);
        }
    };

    const onInputKeyUp = (key: string) => {
        if (key === "Enter") {
            onLogin();
        }
    };

    return (
        <div className="login-page">
            <input
                type="text"
                placeholder="Логин"
                ref={loginRef}
                onKeyUp={(e) => onInputKeyUp(e.key)}
            />
            <input
                type="password"
                placeholder="Пароль"
                ref={passwordRef}
                onKeyUp={(e) => onInputKeyUp(e.key)}
            />
            <button
                onClick={onLogin}
            >
                Войти
            </button>
        </div>
    );
}
