// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import routers from "./router.tsx";

const Router = createBrowserRouter(
	routers.map((router) => {
		// const Element = lazy(() => import(router.element));
		// return { ...router, element: <Element /> };
		return router;
	})
);

export default Router;
