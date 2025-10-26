import Nav from "../components/Nav.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import VideoPlayer from "../components/VideoPlayer.tsx";
import buildQuery from "odata-query";
import { EpisodeApi } from "../api/EpisodeApi.ts";
import type { Episode } from "../model/Episode.ts";
import type { Movie } from "../model/Movie.ts";
import type {Part} from "../model/Part.ts";

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

function Watch() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [episodes, setEpisodes] = useState<Episode[] | undefined>();
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>();
    const [movie, setMovie] = useState<Movie | undefined>();
    const [part, setPart] = useState<Part | undefined>();
    const episodeApi = useMemo(() => new EpisodeApi(), []);
    const query = buildQuery({
        expand: ["Part/Movie"],
        filter: [`partId eq ${id}`],
    });

    useEffect(() => {
        const partId = Number(id);
        if (!partId) {
            navigate("/error");
            return;
        }

        episodeApi.get(query).then((r) => {
            if (r.value.length === 0) {
                navigate("/error");
                return;
            }
            setPart(r.value[0].part);
            setMovie(r.value[0].part?.movie);
            setEpisodes(r.value.sort((a, b) => a.episodeNumber - b.episodeNumber));
        });
    }, []);

    useEffect(() => {
        if(episodes)setSelectedEpisode(episodes[0]);
    }, [episodes]);

    const handlePartClick = (episode: Episode) => setSelectedEpisode(episode);

    return (
        <>
            <Nav />

            <div
                className="min-vh-100 py-5"
                style={{
                    background: "linear-gradient(135deg, #f8fbff 0%, #e6f1f8 100%)",
                }}
            >
                <div className="container">
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol
                            className="breadcrumb p-3 rounded-4 shadow-sm"
                            style={{
                                background: "rgba(255, 255, 255, 0.85)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(180, 200, 220, 0.4)",
                            }}
                        >
                            <li className="breadcrumb-item">
                <span
                    role="button"
                    onClick={() => navigate("/")}
                    className="text-decoration-none fw-semibold"
                    style={{ color: "#2c6e91", cursor: "pointer" }}
                >
                  <i className="bi bi-house-door-fill me-1"></i> Home
                </span>
                            </li>

                            <li className="breadcrumb-item">
                <span
                    role="button"
                    onClick={() => navigate(`/detail/${movie?.id}`)}
                    className="text-decoration-none fw-semibold"
                    style={{ color: "#2c6e91", cursor: "pointer" }}
                >
                  {movie?.title}
                </span>
                            </li>

                            <li
                                className="breadcrumb-item active fw-medium"
                                aria-current="page"
                                style={{ color: "#607d8b" }}
                            >
                                {part?.partName}
                            </li>
                        </ol>
                    </nav>

                    <div
                        className="d-flex flex-column align-items-center justify-content-center py-5 px-4 rounded-4 shadow-sm"
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid rgba(200, 220, 235, 0.5)",
                            minHeight: "60vh",
                        }}
                    >
                        <div className="w-100" style={{ maxWidth: "900px" }}>
                            <VideoPlayer
                                src={`${API_DOMAIN}/api/episode/${selectedEpisode?.id}/video`}
                            />
                        </div>

                        <div
                            className="d-flex justify-content-center mt-4 gap-2 flex-wrap"
                            style={{
                                overflowX: "auto",
                                maxWidth: "100%",
                                scrollbarWidth: "thin",
                            }}
                        >
                            {episodes?.map((e) => (
                                <button
                                    key={e.id}
                                    className={`btn btn-sm px-3 border-2 flex-shrink-0 ${
                                        selectedEpisode === e
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                    }`}
                                    style={{ color: "#4fa3d1", borderColor: "#4fa3d1" }}
                                    onClick={() => handlePartClick(e)}
                                >
                                    {e.episodeNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Watch;
