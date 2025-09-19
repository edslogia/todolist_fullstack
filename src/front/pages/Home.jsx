
import React, { useEffect } from "react"
import ImageUrl from "../assets/img/home.png";
import "./home.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getHomeMessage } from "../services/api.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const data = await getHomeMessage();
			dispatch({ type: "set_hello", payload: data.message });
			return data;
		} catch (error) {
			throw new Error(
				`Could not fetch the message from the backend.\nPlease check if the backend is running and the backend port is public.`
			);
		}
	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-2">
			<h1 className="display-4">Keep your task organized</h1>
			<p className="lead">
				<img src={ImageUrl} className="img-fluid  mb-3 home-img" />
			</p>
			<div className="alert alert-success">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
}; 