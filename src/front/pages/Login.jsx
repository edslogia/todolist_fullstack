

import React from "react";
import "./login.css";

export const Login = () => {
    return (
        <div className="login-bg">
            <div className="card shadow login-card">
                <div className="card-body d-flex flex-column align-items-center">
                    <h3 className="card-title mb-4 ">Login</h3>
                    <form style={{ width: "100%" }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn w-100"
                        >
                            Confirm identy
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
