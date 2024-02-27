import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        // setFormData({ ...formData, name: value });
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("user", JSON.stringify(data));

                message.success("Login is successful");

                if (data.role === "admin") {
                    window.location.href = "/admin";
                } else {
                    navigate("/");
                }
            } else {
                message.error("Login failed!");
            }
        } catch (error) {
            console.log("Login failed!: ", error);
        }
    }
    return (
        <div className="account-column">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        <span>
                            E-mail address <span className="required">*</span>
                        </span>
                        <input type="email" name="email" onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        <span>
                            Password <span className="required">*</span>
                        </span>
                        <input type="password" name="password" onChange={handleInputChange} required />
                    </label>
                </div>
                <p className="remember">
                    <label>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <button className="btn btn-sm">Login</button>
                </p>
                <a href="#" className="form-link">
                    Lost your password?
                </a>
            </form>
        </div>
    );
};

export default Login;
