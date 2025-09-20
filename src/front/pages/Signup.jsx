import React, { useState } from "react";
import { signupUser } from "../services/api.jsx";
import "./signup.css";

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [apiError, setApiError] = useState("");


    // Validaciones seguras
    const validate = (field, value) => {
        let error = "";
        if (field === "name") {
            if (value.length == 16) error = "Name cannot be more than 16 characters.";
            else if (!/^[a-zA-Z0-9_\-áéíóúÁÉÍÓÚñÑ ]*$/.test(value)) error = "Invalid characters in name.";
        }
        if (field === "email") {
            if (!value) error = "Email is required.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        }
        if (field === "password") {
            if (value.length > 10) error = "Password cannot be more than 10 characters.";
            else if (/\s/.test(value)) error = "Password cannot contain spaces.";
        }
        if (field === "confirmPassword") {
            if (value !== form.password) error = "Passwords do not match.";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
        // Validar confirmPassword si cambia password
        if (name === "password" && form.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: validate("confirmPassword", form.confirmPassword) }));
        }
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setApiError("");
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
                await signupUser({
                    name: form.name,
                    email: form.email,
                    password: form.password
                });
                setSuccess("Registration successful! You can now log in.");
                setForm({ name: "", email: "", password: "", confirmPassword: "" });
            } catch (err) {
                setApiError(err.message || "Error al registrar usuario.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="login-bg">
            <div className="card shadow login-card">
                <div className="card-body d-flex flex-column align-items-center">
                    <h3 className="card-title mb-4">Create your account</h3>
                    {success && <div className="alert alert-success w-100 text-center">{success}</div>}
                    {apiError && <div className="alert alert-danger w-100 text-center">{apiError}</div>}
                    <form style={{ width: "100%" }} onSubmit={handleSubmit} autoComplete="off" spellCheck="false">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control${errors.name ? " is-invalid" : ""}`}
                                id="name"
                                name="name"
                                placeholder="Type your name"
                                value={form.name}
                                onChange={handleChange}
                                maxLength={16}
                                autoComplete="off"
                                required
                                disabled={loading}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control${errors.email ? " is-invalid" : ""}`}
                                id="email"
                                name="email"
                                placeholder="Type your email"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                disabled={loading}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`form-control${errors.password ? " is-invalid" : ""}`}
                                    id="password"
                                    name="password"
                                    placeholder="Create your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    maxLength={10}
                                    autoComplete="new-password"
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
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control${errors.confirmPassword ? " is-invalid" : ""}`}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repeat your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                maxLength={10}
                                autoComplete="new-password"
                                required
                                disabled={loading}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 btn-success"
                            disabled={loading}
                        >
                            {loading ? "Creando cuenta..." : "¡Create my account now!"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
