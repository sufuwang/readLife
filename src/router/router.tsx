import Home from "@page/home";
import Login from "@page/login";
import Feed from "@page/feed";

export default [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/feed",
		element: <Feed />,
	},
];
