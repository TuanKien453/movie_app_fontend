import Nav from "../components/Nav.tsx";
import FilmItem from "../components/FilmItem.tsx";
import PaginationComponent from "../components/PaginationComponent.tsx";
import { useMovie } from "../context/MovieContext.tsx";
import Loading from "../components/Loading.tsx";
import {GenreApi} from "../api/GenreApi.ts";
import {useEffect, useMemo, useState} from "react";
import type {Genre} from "../model/Genre.ts";

function Home() {
    const { setCurrentPage, currentPage, maxPage, movies, loading,setOrderBy} = useMovie();
    const [genres,setGenres] = useState<Genre[]>([]);
    const genreApi: GenreApi = useMemo(()=> new GenreApi(),[]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= maxPage) {
            setCurrentPage(page);
        }
    };


    useEffect(() => {
        setOrderBy([{ title: "asc" }]);
       genreApi.get().then(result => {
           setGenres(result.value);
       })
    },[])

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        console.log(value)
    };


    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Loading size="lg" />
            </div>
        );
    }

    return (
        <>
            <Nav />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div></div>
                    <div className="d-flex gap-2 align-items-center">
                        <select className="form-select w-auto" onChange={handleGenreChange}>
                            <option value="">All genres</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        <select className="form-select w-auto">
                            <option value="">Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                            <option value={`before ${years[years.length - 1]}`}>
                                Before {years[years.length - 1]}
                            </option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "400px",
                        }}
                    >
                        <Loading size="lg" />
                    </div>
                ) : (
                    <div className="row">
                        {movies.map((movie) => (
                            <div className="col-md-3 mb-4 p-1" key={movie.id}>
                                <FilmItem
                                    id={movie.id}
                                    title={movie.title}
                                    imageUrl={
                                        movie.posterSource
                                            ? movie.posterSource
                                            : `https://picsum.photos/200/300?random=${movie.id}`
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}


                <div className="d-flex justify-content-center mt-4">
                    <PaginationComponent
                        currentPage={currentPage}
                        maxPage={maxPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
