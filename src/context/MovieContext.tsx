import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { Movie } from "../model/Movie.ts";
import { MovieApi } from "../api/MovieApi.ts";
import type { ODataResponse } from "../shared/ODataResponse.ts";

interface MovieContextType {
    movies: Movie[];
    loading: boolean;
    count: boolean;
    filter?: string[];
    select?: string[];
    expand?: string;
    order?: string[];
    currentPage: number;
    maxPage?: number;
    setCurrentPage: (value: number) => void;
    setCount: (value: boolean) => void;
    setFilterState: (value?: string[]) => void;
    setSelectState: (value?: string[]) => void;
    setExpand: (value?: string) => void;
    setOrderState: (value?: string[]) => void;
    refresh: () => void;
}

interface MovieProviderProps {
    children: ReactNode;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: MovieProviderProps) {
    const pageSize = 10;

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(false);
    const [filter, setFilterState] = useState<string[]>();
    const [select, setSelectState] = useState<string[]>();
    const [expand, setExpand] = useState<string>();
    const [order, setOrderState] = useState<string[]>();
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPage, setMaxPage] = useState<number>();

    const movieApi = useMemo(() => new MovieApi(), []);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response: ODataResponse<Movie> = await movieApi.get({
                authRequired: false,
                count: true,
                filter: filter ? filter.join(" and ") : undefined,
                select: select ? select.join(",") : undefined,
                expand,
                order: order ? order.join(",") : undefined,
                top: pageSize,
                skip: pageSize * currentPage
            });

            setMovies(response.value);

            if (response["@odata.count"] !== undefined) {
                setMaxPage(Math.ceil(response["@odata.count"] / pageSize));
            }
        } catch (err) {
            console.error("Failed to fetch movies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [count, filter, select, expand, order, currentPage]);

    return (
        <MovieContext.Provider
            value={{
                movies,
                loading,
                count,
                filter,
                select,
                expand,
                order,
                currentPage,
                maxPage,
                setCurrentPage,
                setCount,
                setFilterState,
                setSelectState,
                setExpand,
                setOrderState,
                refresh: fetchMovies
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export function useMovie(): MovieContextType {
    const context = useContext(MovieContext);
    if (!context) throw new Error("useMovie must be used within a MovieProvider");
    return context;
}
