import { useNavigate } from "react-router-dom";
import { FloatButton, ColorPicker } from "antd";
import {
	MenuFoldOutlined,
	BgColorsOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import Menu from "@component/feedMenu";
import styles from "./index.module.scss";
import { useState } from "react";
import useFeed from "@hook/useFeed";
import useColor from "@hook/useColor";

const Feed = () => {
	const navigate = useNavigate();
	const [isShowMenu, setIsShowMenu] = useState(true);
	const { Context, Value } = useFeed({ setIsShowMenu });
	const { color, setColor } = useColor();

	const renderImageList = () => {
		return (Value.detail?.images ?? []).map((src, index) => (
			<img key={index} src={src} />
		));
	};

	const onCloseMenu = () => {
		setIsShowMenu(false);
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
			<Menu isShow={isShowMenu} onClose={onCloseMenu} />
		</Context.Provider>
	);
};

export default Feed;
