import { useEffect, useState } from "react";

const useColor = () => {
	const [color, setColor] = useState("#ccc");

	useEffect(() => {
		setColor(localStorage.getItem("feedBackgroundColor") || "#ccc");
	}, []);

	useEffect(() => {
		const [body] = document.getElementsByTagName("body");
		if (!color || !body) {
			return;
		}
		localStorage.setItem("feedBackgroundColor", color);
		body.style.backgroundColor = color;
		return () => {
			body.style.backgroundColor = "#fff";
		};
	}, [color]);

	return {
		color,
		setColor,
	};
};

export default useColor;
