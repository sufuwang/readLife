export default [
	{
		path: "/",
		element: "../pages/home",
	},
	{
		path: "/login",
	},
	{
		path: "/feed",
	},
].map((router) => {
	if (router.element) {
		return router;
	}
	return { ...router, element: `../pages${router.path}` };
});
