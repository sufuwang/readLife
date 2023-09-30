import { Statistic, Empty } from "antd";
import styles from "./index.module.scss";
import useFeedContext, { Value } from "@hook/useFeedContext";
import dayjs from "dayjs";

const Detail = () => {
	const { Context } = useFeedContext();

	const render = ({ feed }: Value) => {
		if (!feed.title) {
			return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
		}
		return (
			<div className={styles.detail}>
				<div className={styles.row}>
					<div className={styles.left}>
						<div className={styles.title}>{feed.title}</div>
						<div className={styles.desc}>
							<span>
								{dayjs(feed.createTime).format("YYYY-MM-DD HH:mm:ss")}
							</span>
							<span>{feed.tags.join(" / ")}</span>
						</div>
					</div>
					<Statistic title="Count of View" value={feed.viewCount} />
				</div>
				<div className={styles.content}>{feed.content}</div>
			</div>
		);
	};

	return <Context.Consumer>{render}</Context.Consumer>;
};

export default Detail;
