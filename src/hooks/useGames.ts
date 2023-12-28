import { useEffect, useState } from "react";
import apiClient from "../services/api-client.ts";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

export interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);

  // useEffect used to fetch games when the component mounts.
  useEffect(() => {
    // Used to abort the API request when needed.
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
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
    games,
    error,
    isLoading,
  };
};

export default useGames;
