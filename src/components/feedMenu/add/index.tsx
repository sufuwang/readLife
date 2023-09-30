import { Button, Form, Input, Select, Upload, message } from "antd";
import type { SelectProps, UploadFile } from "antd";
import useI18n from "@hook/useI18n";
import _i18n_ from "./i18n.json";
import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { uploadImage } from "@api/resource";
import { createFeed, getAllTags } from "@api/feed";

interface FieldType {
	title: string;
	tags: string[];
	content: string;
	images: {
		fileList: UploadFile[];
	};
}

const options: SelectProps["options"] = [];
for (let i = 10; i < 36; i++) {
	options.push({
		value: i.toString(36) + i,
		label: i.toString(36) + i,
	});
}

const App: React.FC = () => {
	const i18n = useI18n(_i18n_);
	const [form] = Form.useForm();
	const [tags, setTags] = useState<Record<"label" | "value", string>[]>([]);

	useEffect(() => {
		getAllTags().then((tags) =>
			setTags(tags.map((tag) => ({ value: tag, label: tag })))
		);
	}, []);

	const onFinish = async (data: FieldType) => {
		const is = data.images.fileList.map(uploadImage);
		const paths: string[] = [];
		for (const res of is) {
			paths.push((await (await res).json()).path);
		}
		await createFeed({
			title: data.title,
			tags: data.tags,
			images: paths,
			content: data.content,
		});
		form.resetFields();
		message.success(i18n.submit_success);
	};

	return (
		<>
			<Form
				name="basic"
				form={form}
				labelCol={{ span: 2 }}
				wrapperCol={{ span: 24 }}
				onFinish={onFinish}
			>
				<Form.Item<FieldType>
					label={i18n.title}
					name="title"
					rules={[{ message: "" }]}
				>
					<Input placeholder={i18n.please_enter_name_of_image} />
				</Form.Item>

				<Form.Item<FieldType> label={i18n.tag} name="tags">
					<Select
						mode="tags"
						placeholder={i18n.please_select_tags_of_image}
						options={tags}
					/>
				</Form.Item>

				<Form.Item<FieldType>
					label={i18n.desc}
					name="content"
					rules={[{ message: "" }]}
				>
					<Input.TextArea
						rows={6}
						placeholder={i18n.please_enter_desc_of_image}
					/>
				</Form.Item>

				<Form.Item<FieldType>
					name="images"
					wrapperCol={{ offset: 2, span: 24 }}
				>
					<Upload.Dragger
						name="file"
						multiple
						action="http://localhost:3000/resource/upload"
						listType="picture-card"
						beforeUpload={() => false}
					>
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
