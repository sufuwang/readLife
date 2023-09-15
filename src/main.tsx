import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ConfigProvider locale={zhCN}>
		<Suspense fallback={<Spin />}>
			<RouterProvider router={router} />
		</Suspense>
	</ConfigProvider>
);
