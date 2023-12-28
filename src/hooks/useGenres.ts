import {useEffect, useState} from "react";
import apiClient from "../services/api-client.ts";
import {CanceledError} from "axios";

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface FetchGenresResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setErrors] = useState("");
    const [isLoading, setLoading] = useState(false);

    // useEffect used to fetch games when the component mounts.
    useEffect(() => {
        // Used to abort the API request when needed.
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<FetchGenresResponse>("/genres", { signal: controller.signal })
            .then((res) => {
                setGenres(res.data.results);
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
        genres,
        error,
        isLoading,
    };
}

export default useGenres;