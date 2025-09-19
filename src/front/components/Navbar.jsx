import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark sticky-top">
			<div className="container">
				<Link to="/" className="navbar-link">
					<span className="navbar-brand mb-0 navbar-title">Todo List</span>
				</Link>
				<div className="ml-auto d-flex gap-3 align-items-center">
					<Link to="/signup">
						<button className="btn btn-outline-success">Sing up</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-outline-primary">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};