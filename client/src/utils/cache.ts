export default async function cacheImages(srcArray: string[]) {
	const promises = srcArray.map((src) => {
		return new Promise<void>((resolve, reject) => {
			const img = new Image();
			img.src = src;
			img.onload = () => resolve();
			img.onerror = () => reject();
		});
	});
	return await Promise.all(promises);
}