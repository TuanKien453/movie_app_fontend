import SearchBar from "./SearchBar.tsx";
import {SearchResultItem} from "./SearchResultItem.tsx";
import {useLogin} from "../context/LoginContext.tsx";
import {useMemo} from "react";
import {MovieApi} from "../api/MovieApi.tsx";


export default function Nav() {
    const searchResults = [
        { id: 1, name: "Avengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: EndgameAvengers: Endgame", imageUrl: "https://picsum.photos/id/1011/200/200" },
        { id: 2, name: "Inception", imageUrl: "https://picsum.photos/id/1012/200/200" },
        { id: 3, name: "Interstellar", imageUrl: "https://picsum.photos/id/1013/200/200" },
        { id: 3, name: "Interstellar", imageUrl: "https://picsum.photos/id/1013/200/200" },
        { id: 3, name: "Interstellar", imageUrl: "https://picsum.photos/id/1013/200/200" },
        { id: 3, name: "Interstellar", imageUrl: "https://picsum.photos/id/1013/200/200" },
        { id: 3, name: "Interstellar", imageUrl: "https://picsum.photos/id/1013/200/200" },
        { id: 3, name: "Interstellar", imageUrl: "https://picsum.photos/id/1013/200/200" },
    ];

    const {isLoggedIn} = useLogin();
    const movieApi = useMemo(()=>new MovieApi(),[]);
    const onSearch = (keyword:string)=>{
        movieApi.get(false,false,`contains(Title, '${keyword}')`,undefined,undefined,undefined,10)
            .then((data)=>{
            console.log(data)
        });
    }

    return (
        <nav className="w-100 bg-white shadow-sm px-3 py-2">
            <div className="row align-items-center">
                {/* Left */}
                <div className="col-4 d-flex align-items-center gap-3">
                    <div className="fw-bold fs-4 text-primary">MyLogo</div>
                    <a href="/" className="text-dark text-decoration-none">Home</a>
                    <a href="/about" className="text-dark text-decoration-none">About</a>
                </div>

                {/* Center */}
                <div className="col-4 d-flex justify-content-center">
                    <SearchBar
                        handleChange={onSearch}
                        results={searchResults}
                        renderResult={(item) => (
                            <SearchResultItem imageUrl={item.imageUrl} title={item.name} />
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

