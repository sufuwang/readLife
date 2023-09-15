import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "@hook",
				replacement: path.resolve(__dirname, "src/hooks"),
			},
			{
				find: "@component",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@page",
				replacement: path.resolve(__dirname, "src/pages"),
			},
		],
	},
});
