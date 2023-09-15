import { SelectProps, Form, DatePicker, Select, List, Input } from "antd";
import useI18n from "@hook/useI18n";
import _i18n_ from "./i18n.json";
import styles from "./index.module.scss";
import xxx from "@page/feed/xxx.jpg";
import useFeed, { Value } from "@hook/useFeed";

interface FieldType {
	keyword: string;
	date: string;
	tag: string[];
}

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
	options.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
}
const data = new Array(50).fill(1).map((_, index) => ({
	title: `Ant Design Title ${index}`,
}));

const Filter = () => {
	const i18n = useI18n(_i18n_);
	const { Context } = useFeed();

	const render = ({ detail, setDetail, setIsShowMenu }: Value) => {
		const onValuesChange = (_: unknown, ds: Detail) => {
			console.info("dssd: ", ds);
		};

		const onClickListItem = () => {
			setDetail!({ ...detail, images: new Array(10).fill(xxx) });
			setIsShowMenu!(false);
		};

		return (
			<div className={styles.filter}>
				<Form
					name="basic"
					className={styles.form}
					labelCol={{ span: 2 }}
					onValuesChange={onValuesChange}
				>
					<Form.Item<FieldType> label={i18n.keyword} name="keyword">
						<Input
							className={styles.item}
							placeholder={i18n.pleaseEnterKeyWord}
						/>
					</Form.Item>
					<Form.Item<FieldType> label={i18n.time} name="date">
						<DatePicker.RangePicker className={styles.item} />
					</Form.Item>
					<Form.Item<FieldType> label={i18n.tag} name="tag">
						<Select
							mode="multiple"
							allowClear
							defaultValue={["a10", "c12"]}
							options={options}
							className={styles.item}
							placeholder={i18n.pleaseSelectTag}
						/>
					</Form.Item>
				</Form>
				<List
					bordered
					className={styles.list}
					dataSource={data}
					renderItem={(item) => (
						<List.Item className={styles.item} onClick={onClickListItem}>
							<List.Item.Meta
								title={<span className={styles.title}>{item.title}</span>}
								description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
						</List.Item>
					)}
				/>
			</div>
		);
	};

	return <Context.Consumer>{render}</Context.Consumer>;
};

export default Filter;
