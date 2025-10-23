import Nav from "../components/Nav.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {MovieApi} from "../api/MovieApi.ts";
import buildQuery from "odata-query";
import type {Movie} from "../model/Movie.ts";

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

function Detail() {
    const {id} = useParams<{ id: string }>();
    const movieApi = useMemo(() => new MovieApi(), []);
    const [movieData, setMovieData] = useState<Movie | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) return;

        const filter = `id eq ${id}`;
        let query = buildQuery({
            expand: ["MovieGenres/Genre", "Parts", "MovieCrews/Human"],
        });
        query += `&$filter=${filter}`;

        movieApi.get(query).then(result => {
            setMovieData(result.value[0]);
            console.log(result.value[0]);
        });
    }, [id, movieApi]);

    function handlePartClick(part:number) {
        console.log("Selected part:", part);

    }
    return (
        <>
            <Nav/>
            <div className="min-vh-100 py-5" style={{background: "linear-gradient(135deg, #f8fbff 0%, #e6f1f8 100%)"}}>
                <div className="container">
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb p-3 rounded-4 shadow-sm" style={{
                            background: "rgba(255, 255, 255, 0.85)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(180, 200, 220, 0.4)"
                        }}>
                            <li className="breadcrumb-item">
                                <a href="/" className="text-decoration-none fw-semibold" style={{color: "#2c6e91"}}>
                                    <i className="bi bi-house-door-fill me-1"></i> Home
                                </a>
                            </li>
                            <li className="breadcrumb-item active fw-medium" aria-current="page"
                                style={{color: "#607d8b"}}>
                                {movieData?.title || "Loading..."}
                            </li>
                        </ol>
                    </nav>

                    <div className="py-5 px-4 rounded-4 shadow-sm" style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid rgba(200, 220, 235, 0.5)"
                    }}>
                        <div className="row g-5 align-items-start">
                            <div className="col-md-3 text-center">
                                <img
                                    src={`${API_DOMAIN}/posters/${movieData?.posterSource}`}
                                    alt={movieData?.title}
                                    className="img-fluid rounded-4 shadow-sm"
                                    style={{border: "1px solid rgba(0,0,0,0.08)"}}
                                />

                                <div
                                    className="d-flex justify-content-center mt-3 gap-2 px-2"
                                    style={{overflowX: "auto", maxWidth: "100%", scrollbarWidth: "thin"}}
                                >
                                    {movieData?.parts
                                        ?.slice()
                                        .sort((a, b) => a.partNumber - b.partNumber)
                                        .map((part, index) => (
                                            <button
                                                key={index}
                                                className="btn btn-outline-primary btn-sm rounded-pill px-3 border-2 flex-shrink-0"
                                                style={{color: "#4fa3d1", borderColor: "#4fa3d1"}}
                                                onClick={() => handlePartClick(part.id)}
                                            >
                                                {` ${part.partName}`}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            <div className="col-md-9">
                                <h1 className="fw-bold mb-2" style={{fontSize: "2rem", color: "#1e5678"}}>
                                    {movieData?.title}
                                </h1>

                                <h5 className="fst-italic mb-3" style={{ color: "#607d8b" }}>
                                    {(() => {
                                        const text = movieData?.movieCrews
                                            ?.map(c => `${c.roleName}: ${c.human?.fullName}`)
                                            .join(", ") || "";
                                        return text.length > 100 ? text.slice(0, 100) + "..." : text;
                                    })()}
                                </h5>

                                <p className="lh-lg mt-3 border-start border-4 ps-3 shadow-sm" style={{
                                    borderColor: "#4fa3d1",
                                    background: "linear-gradient(180deg, #f4faff 0%, #ffffff 100%)",
                                    color: "#37474f",
                                    padding: "1.25rem",
                                    borderRadius: "0.5rem"
                                }}>
                                    {movieData?.description}
                                </p>
                                <div className="mb-3 d-flex flex-wrap gap-2">
                                    {movieData?.movieGenres?.map((mg, index) => (
                                        <button
                                            key={index}
                                            className="btn btn-sm rounded-pill px-3 py-2 border-0"
                                            style={{
                                                background: "rgba(79, 163, 209, 0.15)",
                                                color: "#2c6e91",
                                                border: "1px solid rgba(79,163,209,0.4)",
                                                fontSize: "0.9rem",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => navigate(`/home?genre=${mg.genre?.id}`)}
                                        >
                                            {mg.genre?.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="d-flex align-items-center mt-4 text-secondary flex-wrap gap-3">
                                    <span>
                                        <i className="bi bi-calendar3" style={{color: "#4fa3d1"}}></i>{" "}
                                        {movieData?.releaseDate ? new Date(movieData.releaseDate).toDateString() : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
