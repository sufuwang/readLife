import { Button, Form, Input } from "antd";
import type { RuleObject } from "antd/es/form/index.d.ts";
import useI18n from "@hook/useI18n";
import _i18n_ from "./i18n.json";
import styles from "./index.module.scss";
import { useState } from "react";

const validatorCode: RuleObject["validator"] = (_, value) => {
	const t = +value;
	return t <= 999999 && t >= 100000 ? Promise.resolve() : Promise.reject();
};

type FieldType = {
	email?: string;
	verificationCode?: string;
	remember?: string;
};

export default function Login() {
	const i18n = useI18n(_i18n_);
	const [loading, setLoading] = useState(false);

	const onFinish = (values: FieldType) => {
		setLoading(true);
		console.log("Success:", values);
		setTimeout(() => {
			setLoading(false);
		}, 4000);
	};

	return (
		<div className={styles.container}>
			<Form
				name="basic"
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 18 }}
				style={{ width: 460 }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label={i18n.email}
					name="email"
					hasFeedback
					rules={[
						{
							required: true,
							type: "email",
							message: i18n.pleaseEnterRightEmail,
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label={i18n.verificationCode}
					name="verificationCode"
					hasFeedback
					rules={[
						{
							required: true,
							len: 6,
							validator: validatorCode,
							message: i18n.pleaseEnterRightVerificationCode,
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 5, span: 18 }}>
					<Button type="primary" htmlType="submit" loading={loading}>
						{i18n.submit}
					</Button>
					&nbsp;&nbsp;
					<Button>{i18n.register}</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
