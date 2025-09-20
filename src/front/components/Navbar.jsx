import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import LogoutButton from "./LogoutButton.jsx";
import "./navbar.css";

export const Navbar = () => {
	const { store } = useGlobalReducer();
	const { isAuthenticated, user } = store;

	return (
		<nav className="navbar navbar-light sticky-top">
			<div className="container">
				<Link to="/" className="navbar-link">
					<span className="navbar-brand mb-0 navbar-title">TaskFlow ✨</span>
				</Link>
				<div className="ml-auto d-flex gap-3 align-items-center">
					{isAuthenticated ? (
						// Mostrar cuando el usuario está autenticado
						<>
							<span className="navbar-user-greeting">
								<i className="fas fa-user-circle me-2"></i>
								Hi, {user?.username || 'User'}
							</span>
							<LogoutButton />
						</>
					) : (
						// Mostrar cuando el usuario NO está autenticado
						<>
							<Link to="/signup">
								<button className="btn btn-outline-success">Sign up</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-outline-primary">Login</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};