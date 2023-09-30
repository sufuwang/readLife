import { SelectProps, Form, DatePicker, Select, List, Input } from "antd";
import useI18n from "@hook/useI18n";
import _i18n_ from "./i18n.json";
import styles from "./index.module.scss";
import useFeedContext, { Value } from "@hook/useFeedContext";
import { useEffect, useState } from "react";
import { getAllTags, getFeed } from "@api/feed";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface FieldType {
	keyword: string;
	date: Dayjs[];
	tags: string[];
}

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
	options.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
}

const Filter = () => {
	const i18n = useI18n(_i18n_);
	const { Context } = useFeedContext();
	const [list, setList] = useState<Feed[]>([]);
	const [filteredList, setFilteredList] = useState<Feed[]>([]);
	const [tags, setTags] = useState<Record<"label" | "value", string>[]>([]);

	useEffect(() => {
		getFeed().then((items) => {
			const d = items.map((item) => ({
				...item,
				createTime: dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
				updateTime: dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
			}));
			setList(d);
			setFilteredList(d);
		});
		getAllTags().then((_tags) =>
			setTags(_tags.map((tag) => ({ label: tag, value: tag })))
		);
	}, []);

	const render = ({ feed, setFeed }: Value) => {
		const onValuesChange = (_: unknown, { keyword, tags, date }: FieldType) => {
			if (!keyword && !tags && !date) {
				setFilteredList(list);
				return;
			}
			const _list = list.filter((data) => {
				if (
					keyword &&
					!data.title.includes(keyword) &&
					!data.content.includes(keyword)
				) {
					return false;
				}
				if (
					tags &&
					tags.length > 0 &&
					tags.find((tag) => !data.tags.includes(tag))
				) {
					return false;
				}
				if (date && date.length > 0) {
					const isBetween = dayjs(
						dayjs(data.createTime).format("YYYY-MM-DD")
					).isBetween(
						date[0].format("YYYY-MM-DD"),
						date[1].format("YYYY-MM-DD"),
						"day",
						"[]"
					);
					if (!isBetween) {
						return false;
					}
				}
				return true;
			});
			setFilteredList(_list);
		};

		const onClickListItem = async (id: Feed["id"]) => {
			if (feed.id === id) {
				return;
			}
			setFeed!(await getFeed(id));
		};

		return (
			<div className={styles.filter}>
				<Form
					name="basic"
					className={styles.form}
					labelCol={{ span: 4 }}
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
					<Form.Item<FieldType> label={i18n.tag} name="tags">
						<Select
							mode="multiple"
							allowClear
							options={tags}
							className={styles.item}
							placeholder={i18n.pleaseSelectTag}
						/>
					</Form.Item>
				</Form>
				<List
					bordered
					className={styles.list}
					dataSource={filteredList}
					renderItem={(item) => (
						<List.Item
							className={styles.item}
							onClick={() => onClickListItem(item.id)}
						>
							<List.Item.Meta
								title={<span className={styles.title}>{item.title}</span>}
								description={`${item.createTime}  ${item.tags.join(" / ")}`}
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
