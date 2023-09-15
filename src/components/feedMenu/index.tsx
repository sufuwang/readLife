import { Drawer, Divider, Segmented, Card } from "antd";
import type { SegmentedLabeledOption } from "antd/es/segmented";
import { FilterOutlined, FileAddOutlined } from "@ant-design/icons";
import Filter from "./filter";
import Detail from "./detail";
import Add from "./add";
import styles from "./index.module.scss";
import useI18n from "@hook/useI18n";
import _i18n_ from "./i18n.json";
import { useEffect, useState } from "react";

interface Props {
	isShow: boolean;
	onClose: () => void;
}
interface Reflect {
	option: SegmentedLabeledOption;
	element: JSX.Element;
}

const App = ({ isShow, onClose }: Props) => {
	const i18n = useI18n(_i18n_);
	const [curMode, setMode] = useState(_i18n_.filter);

	useEffect(() => {
		setMode(localStorage.getItem("feedOperationMode") || _i18n_.filter);
	}, []);
	useEffect(() => {
		localStorage.setItem("feedOperationMode", curMode);
	}, [curMode]);

	const reflect: Reflect[] = [
		{
			element: (
				<>
					<Detail />
					<Divider type="vertical" />
					<Filter />
				</>
			),
			option: {
				label: i18n.filter,
				value: _i18n_.filter,
				icon: <FilterOutlined />,
			},
		},
		{
			option: { label: i18n.new, value: _i18n_.new, icon: <FileAddOutlined /> },
			element: <Add />,
		},
	];

	return (
		<Drawer
			width="60%"
			placement="right"
			className={styles.container}
			closable={false}
			open={isShow}
			onClose={onClose}
		>
			<div className={styles.content}>
				<Segmented
					block
					value={curMode}
					className={styles.segmented}
					options={reflect.map((item) => item.option)}
					onChange={(item) => setMode(item.toString())}
				/>
				<Card className={styles.app}>
					{reflect.find((item) => item.option.value === curMode)?.element}
				</Card>
			</div>
		</Drawer>
	);
};

export default App;
