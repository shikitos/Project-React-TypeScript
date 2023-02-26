/**
 * Set localStorage
 */
export const setStore = (name: string, content: string | object) => {
	if (!name) return
	if (typeof content !== 'string') {
		content = JSON.stringify(content)
	}
	return window.localStorage.setItem(name, content)
}

/**
 * Get localStorage
 */
export const getStore = (name: string) => {
	if (!name) return;
	const item = window.localStorage.getItem(name);
	if (!item) return; // handle null or undefined
	return JSON.parse(item as string);
};

/**
 * Clear localStorage
 */
export const removeItem = (name: string) => {
	if (!name) return
	return window.localStorage.removeItem(name)
}
