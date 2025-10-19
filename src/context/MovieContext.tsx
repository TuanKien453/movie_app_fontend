import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import buildQuery from "odata-query";
import type { Movie } from "../model/Movie.ts";
import { MovieApi } from "../api/MovieApi.ts";
import type { ODataResponse } from "../shared/ODataResponse.ts";

type FilterType = {
    [key: string]: string | number | boolean | { [op: string]: any };
};

interface MovieContextType {
    movies: Movie[];
    loading: boolean;
    currentPage: number;
    maxPage: number;
    filter?: FilterType;
    select?: string[];
    expand?: string[];
    orderBy?: { [key: string]: "asc" | "desc" }[];
    setCurrentPage: (v: number) => void;
    setFilter: (v?: any) => void;
    setSelect: (v?: string[]) => void;
    setExpand: (v?: string[]) => void;
    setOrderBy: (v?: { [key: string]: "asc" | "desc" }[]) => void;
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
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    //  state OData
    const [filter, setFilter] = useState<FilterType>();
    const [select, setSelect] = useState<string[]>();
    const [expand, setExpand] = useState<string[]>();
    const [orderBy, setOrderBy] = useState<{ [key: string]: "asc" | "desc" }[]>();

    const movieApi = useMemo(() => new MovieApi(), []);

    const fetchMovies = async () => {
        setLoading(true);
        const orderByString = orderBy
            ?.map(obj => {
                const [key, dir] = Object.entries(obj)[0];
                return `${key} ${dir}`;
            })
            .join(",");
        try {
            const query = buildQuery({
                filter,
                select,
                expand,
                orderBy: orderByString,
                top: pageSize,
                skip: pageSize * (currentPage - 1),
                count: true
            });

            const response: ODataResponse<Movie> = await movieApi.get(query);

            setMovies(response.value);
            if (response["@odata.count"] !== undefined)
                setMaxPage(Math.ceil(response["@odata.count"] / pageSize));
        } catch (err) {
            console.error("Failed to fetch movies:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, select, expand, orderBy]);

    useEffect(() => {
        fetchMovies();
    }, [currentPage, filter, select, expand, orderBy]);

    return (
        <MovieContext.Provider
            value={{
                movies,
                loading,
                currentPage,
                maxPage,
                filter,
                select,
                expand,
                orderBy,
                setCurrentPage,
                setFilter,
                setSelect,
                setExpand,
                setOrderBy,
                refresh: fetchMovies
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export function useMovie(): MovieContextType {
    const context = useContext(MovieContext);
    if (!context)
        throw new Error("useMovie must be used within a MovieProvider");
    return context;
}
