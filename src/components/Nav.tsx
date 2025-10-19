import SearchBar from "./SearchBar.tsx";
import { SearchResultItem } from "./SearchResultItem.tsx";
import { useLogin } from "../context/LoginContext.tsx";
import { useMemo, useState } from "react";
import { MovieApi } from "../api/MovieApi.ts";
import { useNavigate } from "react-router-dom";
import buildQuery from "odata-query";

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

interface Item {
    id: number;
    title: string;
    imageUrl: string;
}

export default function Nav() {
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const navigate = useNavigate();
    const { isLoggedIn } = useLogin();
    const movieApi = useMemo(() => new MovieApi(), []);

    const onSearch = async (keyword: string) => {
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }

        const query = buildQuery({
            filter: { Title: { contains: keyword } },
            select: ["id", "title", "posterSource"],
            top: 10
        });

        try {
            const data = await movieApi.get(query);
            setSearchResults(
                data.value.map(v => ({
                    id: v.id,
                    title: v.title,
                    imageUrl: v.posterSource
                        ? `${API_DOMAIN}/posters/${v.posterSource}`
                        : ""
                }))
            );
        } catch (err) {
            console.error("Search failed:", err);
        }
    };

    const handleClick = (id: number) => {
        navigate(`/movie/${id}`);
    };

    return (
        <nav className="w-100 bg-white shadow-sm px-3 py-2">
            <div className="row align-items-center">
                <div className="col-4 d-flex align-items-center gap-3">
                    <div className="fw-bold fs-4 text-primary">MyLogo</div>
                    <a href="/" className="text-dark text-decoration-none">
                        Home
                    </a>
                    <a href="/about" className="text-dark text-decoration-none">
                        About
                    </a>
                </div>

                <div className="col-4 d-flex justify-content-center">
                    <SearchBar
                        handleChange={onSearch}
                        results={searchResults}
                        renderResult={(item) => (
                            <SearchResultItem
                                imageUrl={item.imageUrl}
                                title={item.title}
                                onClick={() => handleClick(item.id)}
                            />
                        )}
                    />
                </div>

                <div className="col-4 d-flex justify-content-end">
                    {isLoggedIn ? (
                        <button
                            className="btn btn-outline-dark"
                            onClick={() => (window.location.href = "/dashboard")}
                        >
                            Admin
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
