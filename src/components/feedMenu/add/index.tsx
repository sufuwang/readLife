import { Button, Form, Input, Select, Upload, message } from "antd";
import type { SelectProps } from "antd";
import useI18n from "@hook/useI18n";
import _i18n_ from "./i18n.json";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const onFinish = (values: unknown) => {
	console.log("Success:", values);
};

interface FieldType {
	title: string;
	tag: string;
	desc: string;
}

const options: SelectProps["options"] = [];
for (let i = 10; i < 36; i++) {
	options.push({
		value: i.toString(36) + i,
		label: i.toString(36) + i,
	});
}

const props: UploadProps = {
	name: "file",
	multiple: true,
	listType: "picture-card",
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	},
};

const App: React.FC = () => {
	const i18n = useI18n(_i18n_);

	return (
		<>
			<Form
				name="basic"
				labelCol={{ span: 2 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
			>
				<Form.Item<FieldType>
					label={i18n.title}
					name="title"
					rules={[{ message: "" }]}
				>
					<Input placeholder={i18n.please_enter_name_of_image} />
				</Form.Item>

				<Form.Item<FieldType>
					label={i18n.tag}
					name="tag"
					rules={[{ message: "" }]}
				>
					<Select
						mode="tags"
						placeholder={i18n.please_select_tags_of_image}
						options={options}
					/>
				</Form.Item>

				<Form.Item<FieldType>
					label={i18n.desc}
					name="desc"
					rules={[{ message: "" }]}
				>
					<Input.TextArea
						rows={6}
						placeholder={i18n.please_enter_desc_of_image}
					/>
				</Form.Item>

				<Form.Item name="images" wrapperCol={{ offset: 2, span: 16 }}>
					<Upload.Dragger {...props}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">{i18n.title_of_upload}</p>
						<p className="ant-upload-hint">{i18n.desc_of_upload}</p>
					</Upload.Dragger>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 2 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default App;
