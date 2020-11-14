import React from "react";

const Login = ({history}) => {
    return (
        <div className="login">
            <div className="row">
                <h1>Log In</h1>
                <form >
                    <label>
                        Email
                        <input name="email" type="email" placeholder="Email"/>
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;