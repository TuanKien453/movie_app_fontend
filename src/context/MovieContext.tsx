import {createContext, type ReactNode, useContext, useEffect, useMemo, useState} from "react";
import type {Movie} from "../model/Movie.ts";
import {MovieApi} from "../api/MovieApi.tsx";


interface MovieContextType {
    movies: Movie[];
    loading: boolean;

}
interface MovieProviderProps{
    readonly children: ReactNode;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);


export function MovieProvider({ children }: MovieProviderProps) {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const movieApi:MovieApi = useMemo(()=>new MovieApi(),[]);

    useEffect(() => {
        movieApi.get().then((response)=>{
            setLoading(true);
            console.log(response.value);
            setMovies(response.value);
        });


    },[]);

    const value = {
        movies,
        loading
    }

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;

}


export function useMovie(): MovieContextType {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovie must be used within a MovieProvider");
    }
    return context;
}