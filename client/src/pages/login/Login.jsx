import React, { useContext, useState } from "react"
import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    })

    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = e => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const { login } = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(input);
            navigate("/");
        } catch (err) {
            setErr(err.response.data)
        }
    }
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p> This is the login page</p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>

                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>

                </div>

            </div>

        </div>
    )

}

export default Login