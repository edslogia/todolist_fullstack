

import React, { useState } from "react";
import { loginUser } from "../services/api.jsx";
import "./login.css";

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState("");

    // Validaciones seguras
    const validate = (field, value) => {
        let error = "";
        if (field === "email") {
            if (!value) error = "Email is required.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        }
        if (field === "password") {
            if (value.length > 10) error = "Password cannot be more than 10 characters.";
            else if (/\s/.test(value)) error = "Password cannot contain spaces.";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");
        setSuccess("");
        // Validar todos los campos antes de enviar
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            const err = validate(key, form[key]);
            if (err) newErrors[key] = err;
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const res = await loginUser({
                    email: form.email,
                    password: form.password
                });
                setSuccess("¡Login exitoso!");
                // Aquí puedes guardar el token: res.access_token
            } catch (err) {
                setApiError(err.message || "Error al iniciar sesión.");
            } finally {
                setLoading(false);
            }
        }
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="login-bg">
            <div className="card shadow login-card">
                <div className="card-body d-flex flex-column align-items-center">
                    <h3 className="card-title mb-4">Login</h3>
                    {success && <div className="alert alert-success w-100 text-center">{success}</div>}
                    {apiError && <div className="alert alert-danger w-100 text-center">{apiError}</div>}
                    <form style={{ width: "100%" }} onSubmit={handleSubmit} autoComplete="off" spellCheck="false">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control${errors.email ? " is-invalid" : ""}`}
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                disabled={loading}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`form-control${errors.password ? " is-invalid" : ""}`}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    maxLength={10}
                                    autoComplete="current-password"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    tabIndex="-1"
                                    onClick={togglePassword}
                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    disabled={loading}
                                >
                                    <span className="icon-password-toggle">{showPassword ? "🙈" : "👁️"}</span>
                                </button>
                            </div>
                            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Verificando..." : "Confirm identity"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
