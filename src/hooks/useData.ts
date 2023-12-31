import {useEffect, useState} from "react";
import apiClient from "../services/api-client.ts";
import {CanceledError} from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

const useData = <T>(endpoint:string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setErrors] = useState("");
    const [isLoading, setLoading] = useState(false);

    // useEffect used to fetch games when the component mounts.
    useEffect(() => {
        // Used to abort the API request when needed.
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
            .then((res) => {
                setData(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                // If the error is caused by the AbortController, do nothing.
                if (err instanceof CanceledError) return;
                setErrors(err.message);
                setLoading(false);
            });

        // Clean up function: Abort the ongoing API request when the component unmounts.
        // The empty dependency array ensures that this effect runs only once when the component mounts.
        return () => controller.abort();
    }, []);

    return {
        data,
        error,
        isLoading,
    };
}

export default useData;