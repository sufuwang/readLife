export const getResponse = async <T>(res: Promise<Response>): Promise<T> => {
	const r = await (await res).json();
	return r;
};
