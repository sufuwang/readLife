import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/life/.*": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
			"/resource/.*": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
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
			{
				find: "@api",
				replacement: path.resolve(__dirname, "src/apis"),
			},
			{
				find: "@tool",
				replacement: path.resolve(__dirname, "src/tools"),
			},
		],
	},
	build: {
		target: "es2015",
		outDir: "dist", // 输出文件的目录
		assetsInlineLimit: 4096, // 在生成的包中压缩文件的大小限制（以字节为单位）
		cssCodeSplit: true, // 是否将CSS拆分为更小的块并独立加载
		sourcemap: true, // 是否生成sourcemap文件
	},
});
