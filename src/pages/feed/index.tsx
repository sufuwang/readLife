import { useLocation, useNavigate } from "react-router-dom";
import { FloatButton, ColorPicker } from "antd";
import {
	MenuFoldOutlined,
	BgColorsOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import FeedMenu from "@component/feedMenu";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import useFeedContext from "@hook/useFeedContext";
import useColor from "@hook/useColor";
import { getFeed } from "@api/feed";

const Feed = () => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [isShowMenu, setIsShowMenu] = useState(false);
	const { Context, Value } = useFeedContext({ setIsShowMenu });
	const { color, setColor } = useColor();

	useEffect(() => {
		const id = new URLSearchParams(search).get("id");
		if (!id) {
			setIsShowMenu(true);
			return;
		}
		getFeed(+id).then((feed) => {
			if (feed.title) {
				Value.setFeed(feed);
			} else {
				setIsShowMenu(true);
			}
		});
	}, []);

	const onCloseMenu = () => {
		window.scrollTo(0, 0);
		setIsShowMenu(false);
	};
	const renderImageList = () => {
		return (Value.feed?.images ?? []).map((src, index) => (
			<img key={index} src={`http://localhost:3000/public/${src}`} />
		));
	};

	return (
		<Context.Provider value={Value}>
			<div className={styles.container}>
				{renderImageList()}
				<FloatButton.Group shape="square" style={{ right: 24 }}>
					<FloatButton icon={<HomeOutlined />} onClick={() => navigate("/")} />
					<FloatButton
						icon={<MenuFoldOutlined />}
						onClick={() => setIsShowMenu(true)}
					/>
					<ColorPicker value={color} onChange={(_, color) => setColor(color)}>
						<FloatButton icon={<BgColorsOutlined />} />
					</ColorPicker>
					<FloatButton.BackTop />
				</FloatButton.Group>
			</div>
			<FeedMenu isShow={isShowMenu} onClose={onCloseMenu} />
		</Context.Provider>
	);
};

export default Feed;
