declare type Detail = Partial<{
	title: string;
	date: string;
	tags: string[];
	content: string;
	images: string[];
}>;

declare interface Feed {
	content: string;
	createTime: string;
	id: number;
	images: string[];
	tags: string[];
	title: string;
	updateTime: string;
	viewCount: number;
}
