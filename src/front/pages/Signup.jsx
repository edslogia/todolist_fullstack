import React, { useState } from "react";
import "./signup.css";

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="login-bg">
            <div className="card shadow login-card">
                <div className="card-body d-flex flex-column align-items-center">
                    <h3 className="card-title mb-4">Create your account</h3>
                    <form style={{ width: "100%" }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Type your name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Type your email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Create your password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    tabIndex="-1"
                                    onClick={togglePassword}
                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                >
                                    <span className="icon-password-toggle">{showPassword ? "🙈" : "👁️"}</span>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repeat your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 btn-success"
                        >
                            ¡Crear mi cuenta ahora!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
