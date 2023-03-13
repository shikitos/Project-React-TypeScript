import { useState, useEffect } from "react";

interface FetchState<T> {
	data?: T;
	error?: Error;
	status?: number;
}

interface FetchOptions {
	method?: string;
	headers?: any;
	body?: any;
	credentials?: RequestCredentials;
}

function useFetch<T>(url: string, options: FetchOptions = {}): FetchState<T> {
	const [state, setState] = useState<FetchState<T>>({
		data: undefined,
		status: undefined
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
					setState(prev => ({ data: data, status: response.status }));
				}
			} catch (error: unknown) {
				console.error(error);
				setState({ error: error as Error });
			}
		};
		fetchData().then(r => state);
	}, [url, options]);

	return state;
}

export default useFetch;
