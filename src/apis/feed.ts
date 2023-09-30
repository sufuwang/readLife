import { getResponse } from "./index";

export const createFeed = (data: Detail) => {
	return fetch("http://localhost:3000/life/feed", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export function getFeed(): Promise<Feed[]>;
export function getFeed(id: number): Promise<Feed>;
export function getFeed(id?: number) {
	if (id !== undefined) {
		return getResponse<Feed>(
			fetch(`http://localhost:3000/life/feed?id=${id}`, {
				method: "GET",
			})
		);
	}
	return getResponse<Feed[]>(
		fetch("http://localhost:3000/life/feed", {
			method: "GET",
		})
	);
}

export const getAllTags = () => {
	return getResponse<string[]>(
		fetch("http://localhost:3000/life/tags", { method: "GET" })
	);
};

export const addViewCount = (id: number) => {
	return getResponse<string[]>(
		fetch(`http://localhost:3000/life/viewCount?id=${id}`, { method: "PATCH" })
	);
};
