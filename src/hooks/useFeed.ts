import { createContext, useState } from "react";

interface Props {
	setIsShowMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface Value extends Props {
	detail: Detail;
	setDetail: React.Dispatch<React.SetStateAction<Detail | undefined>>;
}

const Context = createContext<Value>({
	detail: {},
	setDetail: () => void 0,
});

function useFeed(): { Context: React.Context<Value> };
function useFeed(props: Props): {
	Context: React.Context<Value>;
	Value: Value;
};
function useFeed(props?: Props) {
	const [detail, setDetail] = useState<Detail>();

	if (!props) {
		return {
			Context,
		};
	}
	return {
		Context,
		Value: {
			...props,
			detail,
			setDetail,
		},
	};
}

export default useFeed;
