import { UploadFile, RcFile } from "antd/es/upload";

type UploadImage = (file: UploadFile) => Promise<Response>;
export const uploadImage: UploadImage = (file) => {
	const formData = new FormData();
	formData.append("file", file.originFileObj as RcFile);
	return fetch("http://localhost:3000/resource/upload", {
		method: "POST",
		body: formData,
	});
};
