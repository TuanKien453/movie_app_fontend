import { useEffect, useMemo, useState } from "react";
import Nav from "../components/Nav.tsx";
import FilmItem from "../components/FilmItem.tsx";
import PaginationComponent from "../components/PaginationComponent.tsx";
import Loading from "../components/Loading.tsx";
import { MovieApi } from "../api/MovieApi.ts";
import { GenreApi } from "../api/GenreApi.ts";
import type { Movie } from "../model/Movie.ts";
import type { Genre } from "../model/Genre.ts";
import buildQuery from "odata-query";
import TusUpload from "../components/TusUpload.tsx";
import {useLocation, useSearchParams} from "react-router-dom";

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

function Home() {
    const pageSize = 10;
    const movieApi = useMemo(() => new MovieApi(), []);
    const genreApi = useMemo(() => new GenreApi(), []);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    //selected
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const buildFilter = (): string => {
        const filters: string[] = [];
        if (selectedGenre !== "All")
            filters.push(`MovieGenres/any(m: m/Genre/Name eq '${selectedGenre}')`);

        if (selectedYear !== "All") {
            if (selectedYear.startsWith("before"))
                filters.push(`year(ReleaseDate) lt ${selectedYear.split(" ")[1]}`);
            else
                filters.push(`year(ReleaseDate) eq ${selectedYear}`);
        }

        if (selectedType !== "All") {
            if (selectedType === "Movie")
                filters.push(`Parts/$count eq 1 and Parts/any(p: p/Episodes/$count eq 1)`);
            else if (selectedType === "Series")
                filters.push(`Parts/$count gt 1 or Parts/any(p: p/Episodes/$count gt 1)`);
        }

        return filters.join(" and ");
    };
    const [searchParams] = useSearchParams();
    const location = useLocation();
    //handle param genre
    useEffect(() => {
        const genreParam = searchParams.get("genre");
        if (genreParam) {
            const genreObj = genres.find(g => g.id.toString() === genreParam || g.name === genreParam);
            if (genreObj) {
                setSelectedGenre(genreObj.name);
            }
        }
    }, [location.search, genres]);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const filter = buildFilter();

            let query = buildQuery({
                expand: ["MovieGenres/Genre"],
                top: pageSize,
                skip: pageSize * (currentPage - 1),
                count: true
            });
            if (filter) query += `&$filter=${filter}`;

            const res = await movieApi.get(query);
            setMovies(res.value);
            if (res["@odata.count"] !== undefined)
                setMaxPage(Math.ceil(res["@odata.count"] / pageSize));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [currentPage, selectedGenre, selectedYear, selectedType]);

    useEffect(() => {
        genreApi.get().then((res) => setGenres(res.value));
    }, []);

    const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - i);

    return (
        <>
            <Nav />

            <TusUpload forEpisodeId={'4'}></TusUpload>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div></div>
                    <div className="d-flex gap-2 align-items-center">
                        <select
                            className="form-select shadow-sm border-0 rounded-pill py-2"

                            value={selectedGenre}
                            onChange={(e) => {
                                setSelectedGenre(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="All">All genres</option>
                            {genres.map((g) => (
                                <option key={g.id} value={g.name}>
                                    {g.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="form-select shadow-sm border-0 rounded-pill py-2"
                            value={selectedYear}
                            onChange={(e) => {
                                setSelectedYear(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="All">All years</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                            <option value={`before ${years[years.length - 1]}`}>
                                Before {years[years.length - 1]}
                            </option>
                        </select>

                        <select
                            className="form-select shadow-sm border-0 rounded-pill py-2"
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="All">All types</option>
                            <option value="Movie">Movie</option>
                            <option value="Series">Series</option>
                        </select>

                    </div>
                </div>

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
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
                                        `${API_DOMAIN}/posters/${movie.posterSource}`
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
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
