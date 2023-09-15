import { Drawer, Divider } from "antd";
import Filter from "./filter";
import Detail from "./detail";
import styles from "./index.module.scss";

interface Props {
	isShow: boolean;
	onClose: () => void;
}

const App = ({ isShow, onClose }: Props) => {
	return (
		<>
			<Drawer
				width="60%"
				placement="right"
				className={styles.container}
				closable={false}
				open={isShow}
				onClose={onClose}
			>
				<div className={styles.content}>
					<Detail />
					<Divider type="vertical" />
					<Filter />
				</div>
			</Drawer>
		</>
	);
};

export default App;
