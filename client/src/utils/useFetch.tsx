import { useState, useEffect } from "react";

interface FetchState<T> {
	data?: T;
	error?: Error;
	isLoading: boolean;
}

interface FetchOptions {
	method?: string;
	headers?: any;
	body?: any;
	credentials?: RequestCredentials;
}

function useFetch<T>(url: string, options: FetchOptions = {}): FetchState<T> {
	const [state, setState] = useState<FetchState<T>>({
		isLoading: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					method: options.method || "GET",
					headers: options.headers,
					body: options.body ? JSON.stringify(options.body) : undefined,
					credentials: options.credentials || "include",
				});
				if (!response.ok) {
					console.error(`HTTP error! Status: ${response.status}`);
				} else {
					const data = await response.json();
					setState({ isLoading: false, data });
				}
			} catch (error: unknown) {
				console.error(error);
				setState({ isLoading: false, error: error as Error });
			}
		};
		fetchData();
	}, [url, options]);

	return state;
}

export default useFetch;
