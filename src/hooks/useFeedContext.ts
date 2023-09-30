import { createContext, useState } from "react";

interface Props {
	setIsShowMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface Value extends Props {
	feed: Feed;
	setFeed: React.Dispatch<React.SetStateAction<Feed>>;
}

const defaultFeed = {
	content: "",
	createTime: "",
	id: 0,
	images: [],
	tags: [],
	title: "",
	updateTime: "",
	viewCount: 0,
};

const Context = createContext<Value>({
	feed: defaultFeed,
	setFeed: () => void 0,
});

function useFeedContext(): { Context: React.Context<Value> };
function useFeedContext(props: Props): {
	Context: React.Context<Value>;
	Value: Value;
};
function useFeedContext(props?: Props) {
	const [feed, setFeed] = useState<Feed>(defaultFeed);

	if (!props) {
		return {
			Context,
		};
	}
	return {
		Context,
		Value: {
			...props,
			feed,
			setFeed,
		},
	};
}

export default useFeedContext;
