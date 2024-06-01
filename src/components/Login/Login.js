import React, { useState } from 'react';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.css';
import App from '../../App';

const Login = ({ data, setIsAuth }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [uValidate, setUValidate] = useState(true);
    const [pValidate, setPValidate] = useState(true);

    const [filteredUser, setFilteredUser] = useState([]);

    const handleLogin = (event) => {
        event.preventDefault();

        filteredUser.map((user) => {
            if (user.username === username) {
                setUValidate(true);
                if (user.password === password) {
                    setPValidate(true);
                    setIsAuth(true);
                } else {
                    setPValidate(false);
                    setPassword("");
                }
            } else {
                setUValidate(false);
                setPValidate(false);
                setUsername("");
                setPassword("");
            }
        });
    }

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }


    return (
        <div className='wrapper bg-secondary d-flex align-items-center justify-content-center w-100'>
            <div className='login'>
                <h2 className='mb-3'>Giriş Yap</h2>
                <form className='need-validation' onSubmit={handleLogin}>
                    <div className="form-group mb-2 was-validated">
                        <label className='form-label'>Kullanıcı Adı</label>
                        <input type="text" alt='kullanıcı' className='form-control' required value={username} onChange={onUsernameChange}></input>
                        <div className='invalid-feedback'>{uValidate ? "Kullanıcı Adı Boş Bırakılamaz" : "Kullanıcı Adı Yanlış Girildi"}</div>
                    </div>
                    <div className="form-group mb-2 was-validated">
                        <label className='form-label'>Şifre</label>
                        <input type="password" className='form-control' required value={password} onChange={onPasswordChange}></input>
                        <div className='invalid-feedback'> {pValidate ? "Şifre Boş Bırakılamaz" : "Şifre Yanlış Girildi"}</div>
                    </div>
                    <button type='submit' className='btn btn-success w-100 mt-2' onClick={() => {
                        const filtered = data.filter((user) => user.username == username);
                        setFilteredUser(filtered);
                    }}>Giriş Yap</button>
                </form>
            </div>
        </div>
    )
}

export default Login;